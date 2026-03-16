import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type z } from "zod";
import { API_ENDPOINTS } from "./constants";
import { ApiErrorClass, normalizeApiError } from "./error";
import type { TAPIResponse } from "@api/types/api";
import { ROUTES } from "@components/routes";
import { API_BASE_URL, ENV } from "@/config/env";

// Module-level mutex — shared across all ApiClient instances on the server
let refreshPromise: Promise<string | null> | null = null;

export interface RequestOptions<T = unknown> extends Omit<RequestInit, "body" | "signal"> {
  /** Zod schema to validate the response against */
  schema?: z.ZodType<T>;
  /** Locale to set as the x-language request header (for RSC usage) */
  locale?: string;
  /** Body will be JSON-serialized automatically */
  body?: unknown;
  /**
   * Request timeout in milliseconds.
   * The fetch is aborted with a `DOMException (AbortError)` if it exceeds this limit.
   * Defaults to 15 000 ms.
   */
  timeout?: number;
  /** Whether to use the internal cache for this request. Only applies to GET requests. */
  useCache?: boolean;
  /** Time To Live for the cache entry in milliseconds. Defaults to 300,000 (5 minutes). */
  ttl?: number;
}

class ApiClient {
  private readonly baseUrl: string = API_BASE_URL;
  private readonly cache = new Map<string, { data: unknown; expiresAt: number }>();
  private readonly pendingRequests = new Map<string, Promise<unknown>>();

  // ─── Token Retrieval (Isomorphic) ─────────────────────────────────────────

  private async getTokens() {
    if (typeof window === "undefined") {
      const cookieStore = await cookies();
      return {
        accessToken: cookieStore.get(ENV.ACCESS_TOKEN_KEY as string)?.value,
        refreshToken: cookieStore.get(ENV.REFRESH_TOKEN_KEY as string)?.value,
      };
    }

    return {
      accessToken: this.readClientCookie(ENV.ACCESS_TOKEN_KEY as string),
      refreshToken: this.readClientCookie(ENV.REFRESH_TOKEN_KEY as string),
    };
  }

  private readClientCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
  }

  // ──Detect Locale (Isomorphic) ────────────────────────────────────────

  private async detectLocale(): Promise<string> {
    if (typeof window === "undefined") {
      const cookieStore = await cookies();
      return cookieStore.get("NEXT_LOCALE")?.value ?? "ar";
    }
    const segment = window.location.pathname.split("/")[1];
    return segment && segment.length === 2 ? segment : "ar";
  }

  // ──Refresh Token (Mutex) ─────────────────────────────────────────────────

  private async refreshToken(): Promise<string | null> {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
      try {
        const { refreshToken } = await this.getTokens();
        if (!refreshToken) throw new Error("No refresh token");

        const res = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.REFRESH}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${ENV.TOKEN_TYPE} ${refreshToken}`,
          },
        });

        if (!res.ok) throw new Error("Refresh failed");

        const data = (await res.json()) as { access_token: string };
        return data.access_token;
      } catch (_err) {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  }

  // ──Auth Failure Handler ──────────────────────────────────────────────────

  private handleAuthFailure(): never {
    if (typeof window !== "undefined") {
      window.location.href = ROUTES.AUTH.LOGIN;
      throw new ApiErrorClass({
        message: "Unauthorized. Redirecting to login.",
        status: 401,
      });
    }
    redirect(ROUTES.AUTH.LOGIN);
  }

  // ── Cache Key Generation ──────────────────────────────────────────────────

  private generateCacheKey(endpoint: string, method: string): string {
    const [path, query] = endpoint.split("?");
    if (!query) return `${method}:${path}`;

    const sortedQuery = new URLSearchParams(query);
    const keys = Array.from(sortedQuery.keys()).sort();
    const sortedParams = new URLSearchParams();
    keys.forEach((key) => {
      const values = sortedQuery.getAll(key).sort();
      values.forEach((value) => sortedParams.append(key, value));
    });

    return `${method}:${path}?${sortedParams.toString()}`;
  }

  // ──Core Request Method ──────────────────────────────────────────────────

  async request<T, R extends { data: unknown } = TAPIResponse<T>>(
    endpoint: string,
    options: RequestOptions<T> = {},
  ): Promise<R> {
    const {
      schema,
      locale,
      body,
      timeout = 15_000,
      useCache = false,
      ttl = 300_000,
      ...fetchOptions
    } = options;

    const method = fetchOptions.method ?? "GET";
    const cacheKey = this.generateCacheKey(endpoint, method);

    // ── Request Deduplication ────────────────────────────────────────────────
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey) as Promise<R>;
    }

    // ── Cache Lookup (Only for GET) ───────────────────────────────────────────
    if (useCache && method === "GET") {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() < cached.expiresAt) {
        return cached.data as R;
      }
    }

    const requestPromise = (async () => {
      const { accessToken } = await this.getTokens();
      const lang = locale ?? (await this.detectLocale());

      const headers = new Headers(fetchOptions.headers);
      const isFormData = body instanceof FormData;

      if (!isFormData) {
        headers.set("Content-Type", "application/json");
      }

      headers.set("x-language", lang);
      if (accessToken) headers.set("Authorization", `${ENV.TOKEN_TYPE} ${accessToken}`);

      // ── AbortController (timeout) ──────────────────────────────────────────
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const init: RequestInit = {
        ...fetchOptions,
        headers,
        signal: controller.signal,
        ...(body !== undefined
          ? { body: isFormData ? (body as FormData) : JSON.stringify(body) }
          : {}),
      };

      try {
        let response = await fetch(`${this.baseUrl}${endpoint}`, init);

        if (response.status === 401) {
          const newToken = await this.refreshToken();
          if (newToken) {
            headers.set("Authorization", `${ENV.TOKEN_TYPE} ${newToken}`);
            response = await fetch(`${this.baseUrl}${endpoint}`, { ...init, headers });
          } else {
            this.handleAuthFailure();
          }
        }

        // ── Handle non-OK responses ────────────────────────────────────────────
        if (!response.ok) {
          const errorData = (await response.json().catch(() => ({}))) as Record<string, unknown>;

          throw new ApiErrorClass({
            status: response.status,
            message: (errorData.message as string) || response.statusText,
            requestId: response.headers.get("x-request-id") || undefined,
            retryAfter: Number(response.headers.get("retry-after")) || undefined,
            details: errorData.errors as Record<string, string[]> | undefined,
            code: errorData.code as string | undefined,
          });
        }

        const json = (await response.json()) as R;

        // ── Zod validation ─────────────────────────────────────────────────────
        // We validate the payload inside 'data' if a schema is provided.
        // All standardized types (TAPIResponse, TAPIResponseItems, etc.) share this structure.
        const validatedData = schema ? schema.parse(json.data) : json.data;

        const finalResult = {
          ...json,
          data: validatedData,
        } as R;

        // ── Cache Storage ──────────────────────────────────────────────────────
        if (useCache && method === "GET") {
          this.cache.set(cacheKey, {
            data: finalResult,
            expiresAt: Date.now() + ttl,
          });
        }

        return finalResult;
      } catch (err) {
        // Transform the error into our consistent format
        const normalized = normalizeApiError(err);
        throw new ApiErrorClass(normalized);
      } finally {
        clearTimeout(timeoutId);
        this.pendingRequests.delete(cacheKey);
      }
    })();

    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise as Promise<R>;
  }

  // ── Cache Invalidation ────────────────────────────────────────────────────

  invalidateCache(endpoint?: string): void {
    if (endpoint) {
      // Invalidate both plain and potential query param versions
      for (const key of this.cache.keys()) {
        if (key.includes(`GET:${endpoint}`)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // ── Convenience Methods ────────────────────────────────────────────────────

  get<T, R extends { data: unknown } = TAPIResponse<T>>(
    endpoint: string,
    options?: RequestOptions<T>,
  ): Promise<R> {
    return this.request<T, R>(endpoint, { ...options, method: "GET" });
  }

  post<T, R extends { data: unknown } = TAPIResponse<T>>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions<T>,
  ): Promise<R> {
    return this.request<T, R>(endpoint, { ...options, method: "POST", body });
  }

  put<T, R extends { data: unknown } = TAPIResponse<T>>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions<T>,
  ): Promise<R> {
    return this.request<T, R>(endpoint, { ...options, method: "PUT", body });
  }

  delete<T, R extends { data: unknown } = TAPIResponse<T>>(
    endpoint: string,
    options?: RequestOptions<T>,
  ): Promise<R> {
    return this.request<T, R>(endpoint, { ...options, method: "DELETE" });
  }
}

// Unified singleton — one client for the whole app
export const apiClient = new ApiClient();

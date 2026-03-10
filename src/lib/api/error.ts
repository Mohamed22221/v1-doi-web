import type { z } from "zod";
// We use a dynamic approach to translation since apiClient is used in both Server and Client components.
// On the client, we can use the initialized i18next instance.
// On the server, we might need to pass the t function or handle it via a singleton if possible.
import i18n from "@/locales";

// ─── Types & Interfaces ───────────────────────────────────────────────────

/**
 * Consistent shape for any API-related error in the system.
 */
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, string[]>;
  requestId?: string;
  retryAfter?: number;
  isCanceled?: boolean;
}

/**
 * Robust Error class for the API layer.
 */
export class ApiErrorClass extends Error implements ApiError {
  status: number;
  code?: string;
  details?: Record<string, string[]>;
  requestId?: string;
  retryAfter?: number;
  isCanceled?: boolean;

  constructor(payload: ApiError) {
    super(payload.message);
    this.name = "ApiError";
    this.status = payload.status;
    this.code = payload.code;
    this.details = payload.details;
    this.requestId = payload.requestId;
    this.retryAfter = payload.retryAfter;
    this.isCanceled = payload.isCanceled;

    // Fix prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiErrorClass.prototype);
  }
}

/**
 * Special case for Zod validation errors (client or server side).
 */
export class ValidationError extends Error {
  errors: z.ZodIssue[];

  constructor(errors: z.ZodIssue[]) {
    super("Response Validation Failed");
    this.name = "ValidationError";
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

// ─── Type Guards ──────────────────────────────────────────────────────────

export const isRecord = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null && !Array.isArray(val);

export const isStringArray = (val: unknown): val is string[] =>
  Array.isArray(val) && val.every((v) => typeof v === "string");

// ─── Logic Utilities ──────────────────────────────────────────────────────

/**
 * Flattens a validation error object into a readable string or a simpler map.
 */
export function flattenFieldErrors(errors: Record<string, string[]> | undefined): string {
  if (!errors) return "";
  return Object.entries(errors)
    .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
    .join(" | ");
}

/**
 * Core function to transform any caught error into a consistent ApiError format.
 * Integrates with i18next for translated messages.
 */
export function normalizeApiError(
  error: unknown,
  response?: Response,
  t?: (key: string) => string,
): ApiError {
  const translate = t || ((key: string) => i18n.t(key));

  // 1. Handle Fetch AbortError (Timeout or Manual)
  if (
    error instanceof Error &&
    (error.name === "AbortError" || error.message.includes("aborted"))
  ) {
    return {
      status: 408,
      message: translate("api.errors.timeout") || "Request Timeout",
      isCanceled: true,
    };
  }

  // 2. Handle known ApiErrorClass instance
  if (error instanceof ApiErrorClass) {
    return error;
  }

  // 3. Handle Native Response (for cases where we just have the response object)
  if (response) {
    const status = response.status;
    const requestId = response.headers.get("x-request-id") || undefined;
    const retryAfter = Number(response.headers.get("retry-after")) || undefined;

    let message = translate(`api.errors.${status}`) || response.statusText;

    // Fallback logic for common status codes
    if (!message || message === response.statusText) {
      switch (status) {
        case 401:
          message = translate("api.errors.unauthorized") || "Unauthorized";
          break;
        case 403:
          message = translate("api.errors.forbidden") || "Forbidden";
          break;
        case 404:
          message = translate("api.errors.notFound") || "Not Found";
          break;
        case 422:
          message = translate("api.errors.validation") || "Validation Error";
          break;
        case 500:
          message = translate("api.errors.server") || "Server Error";
          break;
      }
    }

    return { status, message, requestId, retryAfter };
  }

  // 4. Handle generic Error object
  if (error instanceof Error) {
    return {
      status: 0,
      message: error.message || translate("api.errors.network") || "Network Error",
    };
  }

  // 5. Ultimate Fallback
  return {
    status: 0,
    message: translate("api.errors.unknown") || "An unknown error occurred",
  };
}

/**
 * Helper to safely extract a string message for UI components like Sonner (toasts).
 */
export function getApiErrorMessage(error: unknown, t?: (key: string) => string): string {
  const normalized = normalizeApiError(error, undefined, t);

  // If it's a validation error with details, append them.
  if (normalized.status === 422 && normalized.details) {
    return `${normalized.message}: ${flattenFieldErrors(normalized.details)}`;
  }

  return normalized.message;
}

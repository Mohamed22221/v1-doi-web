import { API_ENDPOINTS } from "./constants";
import { ENV } from "@/config/env";
import { type RefreshTokenResponse } from "./types/auth";

/**
 * performRefresh
 *
 * Low-level server-side refresh token logic using native fetch.
 * Isolated from ApiClient to avoid dependency cycles.
 */
export async function performRefresh(refreshToken: string): Promise<RefreshTokenResponse | null> {
  try {
    const baseUrl = `${ENV.API_URL}/${ENV.API_VERSION}`;
    const url = `${baseUrl}${API_ENDPOINTS.AUTH.REFRESH}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${ENV.TOKEN_TYPE} ${refreshToken}`,
      },
      body: JSON.stringify({}),
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    return result.data as RefreshTokenResponse;
  } catch (error) {
    console.error("[performRefresh] Unexpected error:", error);
    return null;
  }
}

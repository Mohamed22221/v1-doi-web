import { ENV } from "@/config/env";
import { API_ENDPOINTS } from "./constants/api-constant";
import type { RefreshTokenResponse } from "./types/auth";

/**
 * Performs a refresh token request to the backend.
 * This is a "pure" function that works in both Edge Runtime (Middleware) 
 * and Node.js environments.
 * 
 * @param refreshToken - The refresh token string
 * @returns The new tokens if successful, otherwise null
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

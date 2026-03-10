"use server";

import { cookies } from "next/headers";
import { apiClient } from "@api/api";
import { API_ENDPOINTS, TOKEN_KEYS } from "@api/constants";
import type { LoginRequest, LoginResponse } from "@api/types/auth";
import { type TAPIResponse } from "../types/api";

// ─── Cookie helpers ─────────────────────────────────────────────────────────

const IS_PROD = process.env.NODE_ENV === "production";
const ACCESS_MAX_AGE = 60 * 15; // 15 minutes
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  const shared = {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax" as const,
    path: "/",
  };

  cookieStore.set(TOKEN_KEYS.ACCESS, accessToken, {
    ...shared,
    maxAge: ACCESS_MAX_AGE,
  });
  cookieStore.set(TOKEN_KEYS.REFRESH, refreshToken, {
    ...shared,
    maxAge: REFRESH_MAX_AGE,
  });
}

// ─── Server Action ──────────────────────────────────────────────────────────

export async function loginAction(payload: LoginRequest): Promise<TAPIResponse<LoginResponse>> {
  const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
  if ("access_token" in response.data) {
    await setAuthCookies(response.data.access_token, response.data.refresh_token);
  }
  return response;
}

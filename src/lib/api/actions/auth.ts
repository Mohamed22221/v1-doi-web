"use server";

import { cookies } from "next/headers";
import { apiClient } from "@api/api";
import { API_ENDPOINTS } from "@api/constants";
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  LoginOtpResponse,
  RegisterRequest,
  RequestForgotPassword,
  ResponseForgotPassword,
  VerifyForgotOtpRequest,
  VerifyForgotOtpResponse,
  RequestNewPassword,
  RefreshTokenResponse,
  RefreshActionState,
} from "@api/types/auth";
import { ENV } from "@/config/env";
import { decodeUserToken } from "@/lib/utils/jwt";
import type { ActionState } from "../types/api";
import { serverActionWrapper } from "../action-utils";

// ─── Cookie helpers ─────────────────────────────────────────────────────────

const IS_PROD = process.env.NODE_ENV === "production";
const REFRESH_MAX_AGE_FALLBACK = 60 * 60 * 24 * 30; // 30 days

export async function setAuthCookies(accessToken: string, refreshToken: string, role: string) {
  const cookieStore = await cookies();

  // 1. Decode tokens to get real exp
  const accessPayload = decodeUserToken(accessToken);
  const refreshPayload = decodeUserToken(refreshToken);

  const now = Math.floor(Date.now() / 1000);

  // 2. Calculate MaxAge (seconds)
  // If decode fails, use sensible defaults (Access: 15m, Refresh: 30d)
  const accessMaxAge = accessPayload?.exp ? Math.max(accessPayload.exp - now, 0) : 60 * 15;
  const refreshMaxAge = refreshPayload?.exp
    ? Math.max(refreshPayload.exp - now, 0)
    : REFRESH_MAX_AGE_FALLBACK;

  const shared = {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax" as const,
    path: "/",
  };

  console.info(
    `[setAuthCookies] Setting cookies - Access MaxAge: ${accessMaxAge}s, Refresh MaxAge: ${refreshMaxAge}s`,
  );

  cookieStore.set(ENV.ACCESS_TOKEN_KEY, accessToken, {
    ...shared,
    maxAge: accessMaxAge,
  });
  cookieStore.set(ENV.REFRESH_TOKEN_KEY, refreshToken, {
    ...shared,
    maxAge: refreshMaxAge,
  });
  cookieStore.set("user_role", role, {
    ...shared,
    maxAge: refreshMaxAge,
  });
}

// ─── Server Actions ──────────────────────────────────────────────────────────

export async function loginAction(payload: LoginRequest): Promise<ActionState<LoginResponse>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    if ("access_token" in response.data) {
      await setAuthCookies(
        response.data.access_token,
        response.data.refresh_token,
        response.data.user.role,
      );
    }
    return response.data;
  });
}

export async function verifyOtpAction(
  payload: VerifyOtpRequest,
): Promise<ActionState<VerifyOtpResponse>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<VerifyOtpResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      payload,
    );

    if ("access_token" in response.data) {
      await setAuthCookies(
        response.data.access_token,
        response.data.refresh_token || "",
        response.data.user.role,
      );
    }
    return response.data;
  });
}

export async function resendOtpAction(
  payload: ResendOtpRequest,
): Promise<ActionState<LoginOtpResponse>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<LoginOtpResponse>(API_ENDPOINTS.AUTH.RESEND_OTP, payload);
    return response.data;
  });
}

export async function registerAction(
  payload: RegisterRequest,
): Promise<ActionState<LoginOtpResponse>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<LoginOtpResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
  });
}

export async function forgotPasswordAction(
  payload: RequestForgotPassword,
): Promise<ActionState<ResponseForgotPassword>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<ResponseForgotPassword>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      payload,
    );
    return response.data;
  });
}

export async function verifyForgotOtpAction(
  payload: VerifyForgotOtpRequest,
): Promise<ActionState<VerifyForgotOtpResponse>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<VerifyForgotOtpResponse>(
      API_ENDPOINTS.AUTH.VERIFY_FORGOT_OTP,
      payload,
    );
    return response.data;
  });
}

export async function resetPasswordAction(payload: RequestNewPassword): Promise<ActionState<void>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<void>(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
    return response.data;
  });
}

export async function refreshSessionAction(): Promise<RefreshActionState> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(ENV.REFRESH_TOKEN_KEY)?.value;
    if (!refreshToken) {
      await clearAuthCookies();
      return { type: "UNAUTHORIZED" };
    }

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

    if (res.ok) {
      const result = await res.json();
      const data = result.data as RefreshTokenResponse;

      if (data?.access_token) {
        const existingRole = cookieStore.get("user_role")?.value || "Buyer";

        await setAuthCookies(data.access_token, data.refresh_token, existingRole);

        return { type: "SUCCESS", accessToken: data.access_token };
      }
    }

    await clearAuthCookies();
    return { type: "UNAUTHORIZED" };
  } catch (error: unknown) {
    // Handling Next.js redirect internally if any (though fetch won't trigger it)
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string" &&
      (error as { digest: string }).digest.includes("NEXT_REDIRECT")
    ) {
      throw error; // Let Next.js redirects pass through
    }
    await clearAuthCookies();
    return { type: "ERROR", message: "Failed to refresh session" };
  }
}

async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ENV.ACCESS_TOKEN_KEY);
  cookieStore.delete(ENV.REFRESH_TOKEN_KEY);
  cookieStore.delete("user_role");
}

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
} from "@api/types/auth";
import { ENV } from "@/config/env";
import type { ActionState } from "../types/api";
import { serverActionWrapper } from "../action-utils";

// ─── Cookie helpers ─────────────────────────────────────────────────────────

const IS_PROD = process.env.NODE_ENV === "production";
const ACCESS_MAX_AGE = 60 * 15; // 15 minutes
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function setAuthCookies(accessToken: string, refreshToken: string, role: string) {
  const cookieStore = await cookies();
  const shared = {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax" as const,
    path: "/",
  };

  cookieStore.set(ENV.ACCESS_TOKEN_KEY, accessToken, {
    ...shared,
    maxAge: ACCESS_MAX_AGE,
  });
  cookieStore.set(ENV.REFRESH_TOKEN_KEY, refreshToken, {
    ...shared,
    maxAge: REFRESH_MAX_AGE,
  });
  cookieStore.set("user_role", role, {
    ...shared,
    maxAge: REFRESH_MAX_AGE,
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


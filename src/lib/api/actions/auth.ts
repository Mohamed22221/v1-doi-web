"use server";

import { cookies } from "next/headers";
import { apiClient } from "@api/api";
import { API_ENDPOINTS } from "@api/constants";
import { getSellerVerificationStatusAction } from "./seller";
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
  RefreshActionState,
} from "@api/types/auth";
import { ENV } from "@/config/env";
import { decodeUserToken } from "@/lib/utils/jwt";
import type { ActionState } from "../types/api";
import { serverActionWrapper } from "../action-utils";
import { revalidatePath } from "next/cache";
import { setAuthCookies, clearAuthCookies } from "../auth-cookies";
import { performRefresh } from "../auth-utils";

// ─── Server Actions ──────────────────────────────────────────────────────────

export async function loginAction(payload: LoginRequest): Promise<ActionState<LoginResponse>> {
  return serverActionWrapper(async () => {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);

    if ("access_token" in response.data) {
      const accessToken = response.data.access_token;
      const role = response.data.user.role;
      const accountStatus = await getAccountStatusForRole(accessToken, role);

      await setAuthCookies(accessToken, response.data.refresh_token, role, accountStatus);
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
      const accessToken = response.data.access_token;
      const role = response.data.user.role;
      const accountStatus = await getAccountStatusForRole(accessToken, role);

      await setAuthCookies(accessToken, response.data.refresh_token || "", role, accountStatus);
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

    const data = await performRefresh(refreshToken);

    if (data?.access_token) {
      const accessToken = data.access_token;
      const payload = decodeUserToken(accessToken);
      const role = payload?.role || "buyer";
      const accountStatus = await getAccountStatusForRole(accessToken, role);

      await setAuthCookies(accessToken, data.refresh_token, role, accountStatus);

      // Revalidate the entire app to reflect role changes in Server Components
      revalidatePath("/", "layout");

      return { type: "SUCCESS", accessToken };
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

/**
 * Helper to determine account status based on role and backend verification status.
 */
async function getAccountStatusForRole(accessToken: string, role: string): Promise<string> {
  const lowerRole = role.toLowerCase();
  if (!lowerRole.includes("seller")) {
    return "buyer-approved";
  }

  try {
    const sellerStatusRes = await apiClient.withAuthToken(accessToken, () =>
      getSellerVerificationStatusAction(),
    );
    if (sellerStatusRes.success) {
      return `seller-${sellerStatusRes.data.approvalStatus}`;
    }
    return "seller-pending";
  } catch (_error) {
    return "seller-pending";
  }
}

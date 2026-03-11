"use client";

// Next.js
import { useRouter, useParams } from "next/navigation";

// Third-party
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Internal logic
import {
  loginAction,
  verifyOtpAction,
  resendOtpAction,
  registerAction,
  forgotPasswordAction,
  verifyForgotOtpAction,
  resetPasswordAction,
} from "../actions/auth";
import { useAuthStore } from "@store/auth-store";
import { getApiErrorMessage } from "@api/error";
import { useTranslation } from "@/lib/i18n/client";
import API_ROUTES from "../constants/api-routes-constant";

// Types
import type { Locale } from "@lib/i18n/config";
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
  VerifyForgotOtpResponse,
} from "@api/types/auth";

/**
 * Hook to handle authentication flows (Login, OTP, etc.)
 */
export function useLogin() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const queryClient = useQueryClient();
  const { setAuth, setOtp, clearOtp } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginRequest): Promise<LoginResponse> => {
      const result = await loginAction(payload);
      return result.data;
    },

    onSuccess: (responseData: LoginResponse, payload: LoginRequest) => {
      queryClient.clear();
      //Case A: OTP flow
      if ("code" in responseData) {
        setOtp({
          otpCode: String(responseData.code),
          otpSessionId: responseData.otpSessionId,
          phone: payload.phone,
          authFlow: "login",
        });
        toast.info(t("hooks.otpSent"));
        router.push(`/${locale}${API_ROUTES.AUTH.VERIFY_OTP}`);
        return;
      }

      //  Case B: Token flow
      if ("access_token" in responseData) {
        clearOtp(); // Clear OTP data upon successful login with token
        setAuth(responseData.access_token, responseData.refresh_token, responseData.user);
        toast.success(t("hooks.loginSuccess"));
        router.refresh();
        router.replace(`/${locale}${API_ROUTES.BUYER.HOME}`);
      }
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      toast.error(message);
    },
  });

  return {
    login: (payload: LoginRequest) => loginMutation.mutate(payload),
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
    errorMessage: loginMutation.error ? getApiErrorMessage(loginMutation.error) : null,
  };
}

/**
 * Hook to handle OTP verification flow
 */
export function useVerifyOtp() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const queryClient = useQueryClient();
  const { setAuth, otpData, clearOtp, setResetToken } = useAuthStore();

  const verifyOtpMutation = useMutation({
    mutationFn: async (
      payload: VerifyOtpRequest,
    ): Promise<VerifyOtpResponse | VerifyForgotOtpResponse> => {
      if (otpData?.authFlow === "forgot-password") {
        const result = await verifyForgotOtpAction({
          phone: otpData.phone || "",
          otp: payload.code,
          sessionId: payload.otpSessionId,
        });
        return result.data;
      }
      const result = await verifyOtpAction(payload);
      return result.data;
    },

    onSuccess: (responseData: VerifyOtpResponse | VerifyForgotOtpResponse) => {
      // Clear TanStack Query cache
      queryClient.clear();

      // Case A: Forgot Password Flow
      if ("resetToken" in responseData) {
        setResetToken(responseData.resetToken);
        toast.success(t("hooks.verifySuccess"));
        router.push(`/${locale}${API_ROUTES.AUTH.RESET_PASSWORD}`);
        return;
      }

      // Case B: Normal Auth Flow (Login/Register)
      // Update Zustand store
      setAuth(responseData.access_token, responseData.refresh_token || "", responseData.user);
      toast.success(t("hooks.verifySuccess"));

      // Check for custom redirection
      const isRegistrationFlow = otpData?.authFlow === "registration";

      router.refresh();

      if (isRegistrationFlow) {
        router.push(`/${locale}${API_ROUTES.AUTH.REGISTER_SUCCESS}`);
      } else {
        router.push(`/${locale}${API_ROUTES.BUYER.HOME}`);
      }

      // Clear OTP data (including authFlow)
      clearOtp();
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      toast.error(message);
    },
  });

  return {
    verifyOtp: (code: string) => {
      if (!otpData?.otpSessionId) {
        toast.error(t("hooks.sessionIdMissing"));
        return;
      }
      verifyOtpMutation.mutate({
        code,
        otpSessionId: otpData.otpSessionId,
      });
    },
    isPending: verifyOtpMutation.isPending,
    isError: verifyOtpMutation.isError,
    errorMessage: verifyOtpMutation.error ? getApiErrorMessage(verifyOtpMutation.error) : null,
  };
}

/**
 * Hook to handle Resend OTP flow
 */
export function useResendOtp(options?: { onSuccess?: () => void }) {
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const { setOtp, otpData } = useAuthStore();

  const resendOtpMutation = useMutation({
    mutationFn: async (payload: ResendOtpRequest): Promise<LoginOtpResponse> => {
      const result = await resendOtpAction(payload);
      return result.data;
    },

    onSuccess: (responseData: LoginOtpResponse) => {
      setOtp({
        ...otpData,
        otpCode: responseData.code ? String(responseData.code) : otpData?.otpCode,
        otpSessionId: responseData.otpSessionId,
      });
      toast.success(t("hooks.otpResent"));
      options?.onSuccess?.();
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      toast.error(message);
    },
  });

  return {
    resendOtp: () => {
      if (!otpData?.otpSessionId) {
        toast.error(t("hooks.sessionIdMissing"));
        return;
      }
      resendOtpMutation.mutate({
        otpSessionId: otpData.otpSessionId,
      });
    },
    isPending: resendOtpMutation.isPending,
    isError: resendOtpMutation.isError,
    errorMessage: resendOtpMutation.error ? getApiErrorMessage(resendOtpMutation.error) : null,
  };
}

/**
 * Hook to handle Buyer Registration flow
 */
export function useRegister() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const { setOtp } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterRequest): Promise<LoginOtpResponse> => {
      const result = await registerAction(payload);
      return result.data;
    },

    onSuccess: (responseData: LoginOtpResponse, payload: RegisterRequest) => {
      setOtp({
        otpCode: responseData.code ? String(responseData.code) : "",
        otpSessionId: responseData.otpSessionId,
        phone: payload.phone,
        authFlow: "registration",
      });

      toast.info(t("hooks.otpSent"));
      router.push(`/${locale}${API_ROUTES.AUTH.VERIFY_OTP}`);
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      toast.error(message);
    },
  });

  return {
    register: (payload: RegisterRequest) => registerMutation.mutate(payload),
    isPending: registerMutation.isPending,
    isError: registerMutation.isError,
    errorMessage: registerMutation.error ? getApiErrorMessage(registerMutation.error) : null,
  };
}

/**
 * Hook to handle Forgot Password flow
 */
export function useForgotPassword() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const { setOtp } = useAuthStore();

  const forgotPasswordMutation = useMutation({
    mutationFn: async (payload: RequestForgotPassword): Promise<ResponseForgotPassword> => {
      const result = await forgotPasswordAction(payload);
      return result.data;
    },

    onSuccess: (responseData: ResponseForgotPassword, payload: RequestForgotPassword) => {
      setOtp({
        otpCode: String(responseData.code),
        otpSessionId: responseData.otpSessionId,
        phone: payload.phone,
        authFlow: "forgot-password",
      });

      toast.info(t("hooks.otpSent"));
      router.push(`/${locale}${API_ROUTES.AUTH.VERIFY_OTP}`);
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      toast.error(message);
    },
  });

  return {
    forgotPassword: (payload: RequestForgotPassword) => forgotPasswordMutation.mutate(payload),
    isPending: forgotPasswordMutation.isPending,
    isError: forgotPasswordMutation.isError,
    errorMessage: forgotPasswordMutation.error
      ? getApiErrorMessage(forgotPasswordMutation.error)
      : null,
  };
}

/**
 * Hook to handle Reset Password flow
 */
export function useResetPassword() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const { resetToken, clearAuth } = useAuthStore();

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: { newPassword: string }): Promise<void> => {
      if (!resetToken) throw new Error(t("hooks.resetTokenMissing"));
      const result = await resetPasswordAction({
        token: resetToken,
        newPassword: payload.newPassword,
      });
      return result.data;
    },

    onSuccess: () => {
      toast.success(t("hooks.resetSuccess"));
      clearAuth(); // Clear all auth data including resetToken
      router.push(`/${locale}${API_ROUTES.AUTH.RESET_PASSWORD_SUCCESS}`);
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      toast.error(message);
    },
  });

  return {
    resetPassword: (payload: { newPassword: string }) => resetPasswordMutation.mutate(payload),
    isPending: resetPasswordMutation.isPending,
    isError: resetPasswordMutation.isError,
    errorMessage: resetPasswordMutation.error
      ? getApiErrorMessage(resetPasswordMutation.error)
      : null,
  };
}

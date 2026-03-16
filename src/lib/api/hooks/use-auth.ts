"use client";

// Next.js
import { useRouter, useParams } from "next/navigation";

// Third-party
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/components/ui/toast/show-toast";

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
import { ROUTES } from "@/components/routes";

// Types
import type { Locale } from "@lib/i18n/config";
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  LoginOtpResponse,
  RegisterRequest,
  RequestForgotPassword,
  ResponseForgotPassword,
  VerifyForgotOtpResponse,
} from "@api/types/auth";
import { useAppMutation } from "../action-utils";

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

  const loginMutation = useAppMutation(loginAction, {
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
        showSuccessToast(t("hooks.otpSentTitle"), {
          description: t("hooks.otpSentDescription"),
          positionSm: "bottom-center",
          className: "tablet:w-[545px] xl:w-[600px]",
        });
        router.push(`/${locale}${ROUTES.AUTH.VERIFY_OTP}`);
        return;
      }

      //  Case B: Token flow
      if ("access_token" in responseData) {
        clearOtp(); // Clear OTP data upon successful login with token
        setAuth(responseData.access_token, responseData.refresh_token, responseData.user);
        router.refresh();
        router.replace(`/${locale}${ROUTES.PUBLIC.HOME}`);
        router.refresh();
      }
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      showErrorToast(message, {
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
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

  const verifyOtpMutation = useAppMutation(
    async (payload: VerifyOtpRequest) => {
      if (otpData?.authFlow === "forgot-password") {
        return verifyForgotOtpAction({
          phone: otpData.phone || "",
          otp: payload.code,
          sessionId: payload.otpSessionId,
        });
      }
      return verifyOtpAction(payload);
    },
    {
      onSuccess: (responseData: VerifyOtpResponse | VerifyForgotOtpResponse) => {
        // Clear TanStack Query cache
        queryClient.clear();

        // Case A: Forgot Password Flow
        if ("resetToken" in responseData) {
          setResetToken(responseData.resetToken);
          router.push(`/${locale}${ROUTES.AUTH.RESET_PASSWORD}`);
          return;
        }

        // Case B: Normal Auth Flow (Login/Register)
        // Update Zustand store
        setAuth(responseData.access_token, responseData.refresh_token || "", responseData.user);
        // Check for custom redirection
        const isRegistrationFlow = otpData?.authFlow === "registration";

        if (isRegistrationFlow) {
          router.push(`/${locale}${ROUTES.AUTH.REGISTER_SUCCESS}`);
        } else {
          router.push(`/${locale}${ROUTES.PUBLIC.HOME}`);
        }
        router.refresh();
        // Clear OTP data (including authFlow)
        clearOtp();
      },

      onError: (error: Error) => {
        const message = getApiErrorMessage(error);
        showErrorToast(message, {
          positionSm: "bottom-center",
          className: "tablet:w-[545px] xl:w-[600px]",
        });
      },
    },
  );

  return {
    verifyOtp: (code: string) => {
      if (!otpData?.otpSessionId) {
        showErrorToast(t("hooks.sessionIdMissing"), {
          positionSm: "bottom-center",
          className: "tablet:w-[545px] xl:w-[600px]",
        });
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

  const resendOtpMutation = useAppMutation(resendOtpAction, {
    onSuccess: (responseData: LoginOtpResponse) => {
      setOtp({
        ...otpData,
        otpCode: responseData.code ? String(responseData.code) : otpData?.otpCode,
        otpSessionId: responseData.otpSessionId,
      });
      showSuccessToast(t("hooks.otpSentTitle"), {
        description: t("hooks.otpSentDescription"),
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
      options?.onSuccess?.();
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      showErrorToast(message, {
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
    },
  });

  return {
    resendOtp: () => {
      if (!otpData?.otpSessionId) {
        showErrorToast(t("hooks.sessionIdMissing"), {
          positionSm: "bottom-center",
          className: "tablet:w-[545px] xl:w-[600px]",
        });
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

  const registerMutation = useAppMutation(registerAction, {
    onSuccess: (responseData: LoginOtpResponse, payload: RegisterRequest) => {
      setOtp({
        otpCode: responseData.code ? String(responseData.code) : "",
        otpSessionId: responseData.otpSessionId,
        phone: payload.phone,
        authFlow: "registration",
      });

      showSuccessToast(t("hooks.otpSentTitle"), {
        description: t("hooks.otpSentDescription"),
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
      router.push(`/${locale}${ROUTES.AUTH.VERIFY_OTP}`);
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      showErrorToast(message, {
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
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

  const forgotPasswordMutation = useAppMutation(forgotPasswordAction, {
    onSuccess: (responseData: ResponseForgotPassword, payload: RequestForgotPassword) => {
      setOtp({
        otpCode: String(responseData.code),
        otpSessionId: responseData.otpSessionId,
        phone: payload.phone,
        authFlow: "forgot-password",
      });

      showSuccessToast(t("hooks.otpSentTitle"), {
        description: t("hooks.otpSentDescription"),
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
      router.push(`/${locale}${ROUTES.AUTH.VERIFY_OTP}`);
    },

    onError: (error: Error) => {
      const message = getApiErrorMessage(error);
      showErrorToast(message, {
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
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

  const resetPasswordMutation = useAppMutation(
    async (payload: { newPassword: string }) => {
      if (!resetToken) throw new Error(t("hooks.resetTokenMissing"));
      return resetPasswordAction({
        token: resetToken,
        newPassword: payload.newPassword,
      });
    },
    {
      onSuccess: () => {
        clearAuth(); // Clear all auth data including resetToken
        router.push(`/${locale}${ROUTES.AUTH.RESET_PASSWORD_SUCCESS}`);
      },

      onError: (error: Error) => {
        const message = getApiErrorMessage(error);
        showErrorToast(message, {
          positionSm: "bottom-center",
          className: "tablet:w-[545px] xl:w-[600px]",
        });
      },
    },
  );

  return {
    resetPassword: (payload: { newPassword: string }) => resetPasswordMutation.mutate(payload),
    isPending: resetPasswordMutation.isPending,
    isError: resetPasswordMutation.isError,
    errorMessage: resetPasswordMutation.error
      ? getApiErrorMessage(resetPasswordMutation.error)
      : null,
  };
}

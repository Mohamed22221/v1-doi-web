"use client";

// Next.js
import { useRouter, useParams } from "next/navigation";

// Third-party
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Internal logic
import { loginAction } from "../actions/auth";
import { useAuthStore } from "@store/auth-store";
import { getApiErrorMessage } from "@api/error";
import API_ROUTES from "../constants/api-routes-constant";

// Types
import type { Locale } from "@lib/i18n/config";
import type { LoginRequest, LoginResponse } from "@api/types/auth";

/**
 * Hook to handle authentication flows (Login, OTP, etc.)
 */
export function useLogin() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const queryClient = useQueryClient();
  const { setAuth, setOtp } = useAuthStore();

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
          otpCode: responseData.code ? String(responseData.code) : undefined,
          otpSessionId: responseData.otpSessionId,
          phone: payload.phone,
        });
        toast.info("تم إرسال رمز التحقق 🛡️");
        router.push(`/${locale}${API_ROUTES.AUTH.VERIFY_OTP}`);
        return;
      }

      //  Case B: Token flow
      if ("access_token" in responseData) {
        setAuth(responseData.access_token, responseData.refresh_token, responseData.user);
        toast.success("تم تسجيل الدخول بنجاح 🎉");
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

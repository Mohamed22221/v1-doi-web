"use client";

import { useRouter, useParams } from "next/navigation";
import { useAppMutation } from "../action-utils";
import { verifySellerAction, getSellerVerificationStatusAction } from "../actions/seller";
import { getApiErrorMessage } from "@api/error";
import { useTranslation } from "@/lib/i18n/client";
import { showSuccessToast, showErrorToast } from "@/components/ui/toast/show-toast";
import { ROUTES } from "@/components/routes";
import { cookiesClient } from "@/lib/utils/cookies-client";
import { useAuthStore } from "@store/auth-store";
import type { Locale } from "@/lib/i18n/config";
import type { TVerifySellerPayload } from "../types/seller";

const PENDING_ROLE_KEY = "pending_seller_role";

/**
 * Hook to handle seller-related operations (Verification, etc.)
 */
export function useSeller() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const { setAuth, user } = useAuthStore();

  const statusMutation = useAppMutation(getSellerVerificationStatusAction, {
    onSuccess: (response) => {
      const status = response.data.approvalStatus;

      if (status === "approved") {
        const targetRole = localStorage.getItem(PENDING_ROLE_KEY);
        if (targetRole) {
          // Update Cookie
          cookiesClient.set("user_role", targetRole);
          
          // Update Zustand Store
          if (user) {
            setAuth(useAuthStore.getState().accessToken || "", useAuthStore.getState().refreshToken || "", {
              ...user,
              role: targetRole,
            });
          }
          
          localStorage.removeItem(PENDING_ROLE_KEY);
          router.push(`/${locale}${ROUTES.AUTH.SELLER.SUCCESS}`);
        } else {
          // Fallback if role is lost but approved
          router.push(`/${locale}${ROUTES.DASHBOARD.SELLER.ROOT}`);
        }
      } else if (status === "rejected") {
        router.push(`/${locale}${ROUTES.AUTH.SELLER.REJECTED}`);
      } else {
        // Stay on pending or redirect to pending
        router.push(`/${locale}${ROUTES.AUTH.SELLER.PENDING}`);
      }
    },
    onError: (error: Error) => {
      showErrorToast(getApiErrorMessage(error));
    },
  });

  const verifyMutation = useAppMutation(verifySellerAction, {
    onSuccess: () => {
      showSuccessToast(t("seller-verify.form.success") || "Registration submitted successfully", {
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
      // Redirect to pending
      router.push(`/${locale}${ROUTES.AUTH.SELLER.PENDING}`);
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
    verifySeller: (payload: TVerifySellerPayload) => {
      // Store the intended role in a cookie for the middleware to read
      cookiesClient.set(PENDING_ROLE_KEY, payload.role);
      verifyMutation.mutate(payload);
    },
    checkVerificationStatus: () => {
      statusMutation.mutate(undefined as void);
    },
    isPending: verifyMutation.isPending || statusMutation.isPending,
    isError: verifyMutation.isError || statusMutation.isError,
    error: verifyMutation.error || statusMutation.error,
    isSuccess: verifyMutation.isSuccess,
    data: verifyMutation.data,
    errorMessage: verifyMutation.error ? getApiErrorMessage(verifyMutation.error) : null,
  };
}

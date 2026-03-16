"use client";

import { useRouter, useParams } from "next/navigation";
import { useAppMutation } from "../action-utils";
import { verifySellerAction } from "../actions/seller";
import { getApiErrorMessage } from "@api/error";
import { useTranslation } from "@/lib/i18n/client";
import { showSuccessToast, showErrorToast } from "@/components/ui/toast/show-toast";
import { ROUTES } from "@/components/routes";
import type { Locale } from "@/lib/i18n/config";
import type { TVerifySellerPayload } from "../types/seller";

/**
 * Hook to handle seller-related operations (Verification, etc.)
 */
export function useSeller() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");

  const verifyMutation = useAppMutation(verifySellerAction, {
    onSuccess: () => {
      showSuccessToast(t("seller-verify.form.success") || "Registration submitted successfully", {
        positionSm: "bottom-center",
        className: "tablet:w-[545px] xl:w-[600px]",
      });
      // Redirect to seller dashboard or success page after verification
      router.push(`/${locale}${ROUTES.DASHBOARD.SELLER.ROOT}`);
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
      verifyMutation.mutate(payload);
    },
    verifySellerAsync: (payload: TVerifySellerPayload) => {
      return verifyMutation.mutateAsync(payload);
    },
    isPending: verifyMutation.isPending,
    isError: verifyMutation.isError,
    error: verifyMutation.error,
    isSuccess: verifyMutation.isSuccess,
    data: verifyMutation.data,
    errorMessage: verifyMutation.error ? getApiErrorMessage(verifyMutation.error) : null,
  };
}

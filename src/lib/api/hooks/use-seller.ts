"use client";

import { useRouter, useParams } from "next/navigation";
import { useAppMutation } from "../action-utils";
import { useQuery } from "@tanstack/react-query";
import { verifySellerAction, getSellerVerificationStatusAction } from "../actions/seller";
import { getApiErrorMessage } from "@api/error";
import { useTranslation } from "@/lib/i18n/client";
import { showErrorToast } from "@/components/ui/toast/show-toast";
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

  const verifyMutation = useAppMutation(verifySellerAction, {
    onSuccess: () => {
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
      verifyMutation.mutate(payload);
    },

    isPending: verifyMutation.isPending,
    isError: verifyMutation.isError,
    error: verifyMutation.error,
    isSuccess: verifyMutation.isSuccess,
    data: verifyMutation.data,
    errorMessage: verifyMutation.error ? getApiErrorMessage(verifyMutation.error) : null,
  };
}

/**
 * Hook to periodically fetch and monitor seller verification status.
 *
 * @param enabled - Whether the polling should be active
 */
export function useSellerStatus(enabled: boolean = true) {
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");

  return useQuery({
    queryKey: ["seller-verification-status"],
    queryFn: async () => {
      const result = await getSellerVerificationStatusAction();
      if (!result.success) {
        throw new Error(result.error || t("hooks.fetchStatusFailed"));
      }
      return result.data;
    },
    enabled,
    refetchInterval: false, // Disable automatic polling
    refetchOnWindowFocus: true, // Check only when user returns to tab
    staleTime: 60000, // 1 minute stale time to prevent redundant calls
  });
}

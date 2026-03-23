"use client";

import { useEffect } from "react";
import { getApiErrorMessage } from "@/lib/api/error";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/client";
import { useParams } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";

/**
 * SellerProductsError
 *
 * Error boundary for the seller products route segment.
 * Displays localized error messages and provides a retry mechanism.
 */
export default function SellerProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params.locale as Locale) || "ar";
  const { t } = useTranslation(locale, "seller-dashboard");

  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("SellerProductsPage Error:", error);
  }, [error]);

  const errorMessage = getApiErrorMessage(error);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md rounded-lg border border-destructive/20 bg-destructive/10 p-6">
        <h2 className="text-h4 font-bold text-destructive mb-2">
          {t("products.error.title") || "Something went wrong"}
        </h2>
        <p className="text-body text-destructive/80 mb-6" role="alert">
          {errorMessage}
        </p>
        <Button
          onClick={() => reset()}
          variant="default"
          className="bg-destructive hover:bg-destructive/90 text-white"
          aria-label={t("products.error.retry") || "Retry"}
        >
          {t("products.error.retry") || "Retry"}
        </Button>
      </div>
    </div>
  );
}

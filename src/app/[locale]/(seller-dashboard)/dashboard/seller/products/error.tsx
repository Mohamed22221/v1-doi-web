"use client";

import { useParams } from "next/navigation";
import { type Locale } from "@/lib/i18n/config";
import ErrorProductsState from "@/features/seller-dashboard/products/error-products-state";

/**
 * SellerProductsError
 *
 * Error boundary for the seller products route segment.
 * Displays localized error messages and provides a retry mechanism using ErrorProductsState.
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

  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <ErrorProductsState locale={locale} message={error.message} onRetry={() => reset()} />
    </div>
  );
}

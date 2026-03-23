"use client";

import Image from "next/image";
import { type Locale } from "@lib/i18n/config";
import { useTranslation } from "@lib/i18n/client";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface EmptyProductsStateProps {
  locale: Locale;
  productSellType?: string;
  status?: string;
}

/**
 * EmptyProductsState
 *
 * Displayed when the seller has no products matching the current filter.
 * Client Component (for compatibility with client-rendered lists)
 */
export default function EmptyProductsState({
  locale,
  productSellType,
  status,
}: EmptyProductsStateProps) {
  const { t } = useTranslation(locale, "seller-dashboard");

  // Map filters to specific empty state titles
  const getTitleKey = () => {
    if (status) return `products.emptyTitle_${status}`;
    if (productSellType) return `products.emptyTitle_${productSellType}`;
    return "products.emptyTitle";
  };

  const titleKey = getTitleKey();
  const hasFilter = !!(status || productSellType);

  return (
    <section
      aria-label={t("products.emptyTitle")}
      className="rtl flex flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <Image
        src="/img/empty-products.png"
        alt={t("products.emptyTitle")}
        width={200}
        height={200}
        className="size-[150px] md:size-[200px]"
        priority
      />

      <h2 className="mt-4 text-h3 font-bold text-primary-500 md:text-h2 dark:text-primary-200">
        {t(titleKey)}
      </h2>

      {!hasFilter && (
        <p className="mt-2 max-w-sm text-body text-neutral-600 md:text-h5 dark:text-neutral-300">
          {t("products.emptyDescription")}
        </p>
      )}
    </section>
  );
}

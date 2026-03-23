"use client";

import Image from "next/image";
import { type Locale } from "@lib/i18n/config";
import { useTranslation } from "@lib/i18n/client";
import { Button } from "@components/ui/button";

interface ErrorProductsStateProps {
  locale: Locale;
  message?: string;
  onRetry: () => void;
}

/**
 * ErrorProductsState
 *
 * Displayed when there's an error fetching products.
 * Mirrors the design of EmptyProductsState but with error-specific content and a retry button.
 */
export default function ErrorProductsState({ locale, message, onRetry }: ErrorProductsStateProps) {
  const { t } = useTranslation(locale, "seller-dashboard");

  return (
    <section
      aria-label={t("products.errorTitle")}
      className="rtl flex flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <Image
        src="/img/empty-products.png"
        alt={t("products.errorTitle")}
        width={200}
        height={200}
        className="size-[150px] opacity-50 grayscale md:size-[200px]"
        priority
      />

      <h2 className="mt-4 text-h3 font-bold text-danger-500 md:text-h2 dark:text-danger-400">
        {t("products.errorTitle")}
      </h2>

      <p className="mt-2 max-w-sm text-body text-neutral-600 md:text-h5 dark:text-neutral-300">
        {message || t("products.errorDescription")}
      </p>

      <Button
        type="button"
        variant="outline"
        rounded="sm"
        onClick={onRetry}
        className="mt-4 min-w-[140px] border-danger-200 text-danger-500 hover:bg-danger-50 hover:text-danger-600 dark:border-danger-900 dark:hover:bg-danger-950"
      >
        {t("products.actions.retry")}
      </Button>
    </section>
  );
}

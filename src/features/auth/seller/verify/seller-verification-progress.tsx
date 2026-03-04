"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Progress } from "@components/ui/progress";
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import type { SellerVerificationValues } from "./schema";

interface SellerVerificationProgressProps {
  locale: Locale;
}

/**
 * SellerVerificationProgress
 *
 * A specialized progress component for the seller verification form.
 * Internally watches form fields to calculate completion percentage.
 */
export function SellerVerificationProgress({ locale }: SellerVerificationProgressProps) {
  const { t } = useTranslation(locale, "auth");
  const { watch, getFieldState, formState } = useFormContext<SellerVerificationValues>();

  // Watch necessary fields for progress calculation
  const values = watch();

  const progress = useMemo(() => {
    const isIndividual = values.accountType === "individual";
    const fields = isIndividual
      ? (["idNumber", "idImage", "terms"] as const)
      : ([
          "companyName",
          "contactNumber",
          "crNumber",
          "taxCertificate",
          "crDocument",
          "terms",
        ] as const);

    const totalFields = fields.length;

    let validCount = 0;
    fields.forEach((name) => {
      const { error } = getFieldState(name, formState);
      const value = values[name as keyof typeof values];
      if (value && !error) {
        validCount++;
      }
    });

    return (validCount / totalFields) * 100;
  }, [getFieldState, formState, values]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[13px] font-bold text-primary-900 dark:text-neutral-50">
        <span className="text-body md:text-h5">{t("seller-verify.form.progress")}</span>
        <div className="flex items-center gap-2">
          <span className="text-body tabular-nums md:text-h4">{progress.toFixed(1)}%</span>
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-900 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-400"></span>
          </div>
        </div>
      </div>
      <Progress
        value={progress}
        className="h-[8px] bg-neutral-100 md:h-[10px] dark:bg-neutral-700"
        indicatorClassName="bg-primary-400"
      />
    </div>
  );
}

"use client";

import { useFormContext } from "react-hook-form";
import { RHFInput } from "@components/forms/rhf-input";
import { RHFIdentityUpload } from "@components/forms/rhf-identity-upload";
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import type { SellerVerificationValues } from "./schema";

interface SellerIndividualFieldsProps {
  locale: Locale;
}

export function SellerIndividualFields({ locale }: SellerIndividualFieldsProps) {
  const { t } = useTranslation(locale, "auth");
  const { control } = useFormContext<SellerVerificationValues>();

  return (
    <>
      <RHFInput
        control={control}
        name="idNumber"
        label={t("seller-verify.form.idNumber")}
        required
        layout="floating"
      />

      <RHFIdentityUpload
        control={control}
        name="idImage"
        label={t("seller-verify.form.idImage")}
        required
        layout="floating"
        uploadProps={{
          uploadType: "seller_document",
          fileType: "image",
        }}
      />
    </>
  );
}

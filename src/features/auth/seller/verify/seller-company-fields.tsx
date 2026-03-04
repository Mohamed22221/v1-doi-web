"use client";

import { useFormContext } from "react-hook-form";
import { RHFInput } from "@components/forms/rhf-input";
import { RHFIdentityUpload } from "@components/forms/rhf-identity-upload";
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import type { SellerVerificationValues } from "./schema";
import { RHFPhoneInput } from "@/components/forms/rhf-phone-input";

interface SellerCompanyFieldsProps {
  locale: Locale;
}

export function SellerCompanyFields({ locale }: SellerCompanyFieldsProps) {
  const { t } = useTranslation(locale, "auth");
  const { control } = useFormContext<SellerVerificationValues>();

  return (
    <>
      <RHFInput
        control={control}
        name="companyName"
        label={t("seller-verify.form.companyName")}
        required
        layout="floating"
      />

      <RHFPhoneInput
        control={control}
        name="contactNumber"
        label={t("seller-verify.form.contactNumber")}
        required
        layout="floating"
      />

      <RHFInput
        control={control}
        name="crNumber"
        label={t("seller-verify.form.crNumber")}
        required
        layout="floating"
      />

      <RHFIdentityUpload
        control={control}
        name="taxCertificate"
        label={t("seller-verify.form.taxCertificate")}
        required
        layout="floating"
        uploadProps={{
          uploadType: "seller_document",
          fileType: "image",
        }}
      />

      <RHFIdentityUpload
        control={control}
        name="crDocument"
        label={t("seller-verify.form.crDocument")}
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

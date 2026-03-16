import { z } from "zod";
import { saPhoneSchema } from "@/lib/validation/sa-phone-schema";

export const getSellerVerificationSchema = (t: (key: string) => string) =>
  z.discriminatedUnion("accountType", [
    // Individual Schema
    z.object({
      accountType: z.literal("individual"),
      nationalIdNumber: z.string().min(1, t("seller-verify.form.validation.idRequired")),
      idImage: z.string().min(1, t("seller-verify.form.validation.imageRequired")),
      terms: z.boolean().refine((val) => val === true, {
        message: t("seller-verify.form.validation.termsRequired"),
      }),
    }),
    // Company Schema
    z.object({
      accountType: z.literal("company"),
      businessName: z.string().min(1, t("seller-verify.form.validation.companyRequired")),
      businessPhone: saPhoneSchema(t),
      commercialRegistrationNumber: z.string().min(1, t("seller-verify.form.validation.crRequired")),
      taxCertificate: z.string().min(1, t("seller-verify.form.validation.taxRequired")),
      crDocument: z.string().min(1, t("seller-verify.form.validation.crDocRequired")),
      terms: z.boolean().refine((val) => val === true, {
        message: t("seller-verify.form.validation.termsRequired"),
      }),
    }),
  ]);

export type SellerVerificationValues = z.infer<ReturnType<typeof getSellerVerificationSchema>>;

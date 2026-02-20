import * as z from "zod";

// User enters: 5XXXXXXXX (9 digits) without +966
export const saPhoneSchema = (t: (key: string) => string) =>
  z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, "").replace(/[-()]/g, "")) // basic cleaning
    .refine((v) => /^\d+$/.test(v), { message: t("buyer-login.form.validation.phoneNumbersOnly") })
    .refine((v) => /^5\d{8}$/.test(v), {
      message: t("buyer-login.form.validation.invalidSaudiPhone"),
    })
    .transform((v) => `966${v}`); // Final transformation for backend

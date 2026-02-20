import { saPhoneSchema } from "@/lib/validation/sa-phone-schema";
import * as z from "zod";

// User enters: 5XXXXXXXX (9 digits) without +966

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    phone: saPhoneSchema(t),
  });

export const getLoginPasswordSchema = (t: (key: string) => string) =>
  z.object({
    phone: saPhoneSchema(t),
    password: z.string().min(1, { message: t("buyer-login.form.validation.passwordRequired") }),
  });

export type LoginValues = z.infer<ReturnType<typeof getLoginSchema>>;
export type LoginPasswordValues = z.infer<ReturnType<typeof getLoginPasswordSchema>>;

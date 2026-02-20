import * as z from "zod";

export const getVerifyOtpSchema = (t: (key: string) => string) =>
  z.object({
    otp: z.string().length(4, { message: t("buyer-login.form.validation.invalidOtp") }),
  });

export type VerifyOtpValues = z.infer<ReturnType<typeof getVerifyOtpSchema>>;

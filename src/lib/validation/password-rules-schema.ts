import * as z from "zod"

export const getPasswordRulesSchema = (t: (key: string) => string) =>
    z
        .object({
            password: z
                .string()
                .min(8, t("buyer-reset-password.form.validation.rulesNotSatisfied"))
                .refine((p) => /[a-z]/.test(p), t("buyer-reset-password.form.validation.rulesNotSatisfied"))
                .refine((p) => /[A-Z]/.test(p), t("buyer-reset-password.form.validation.rulesNotSatisfied"))
                .refine((p) => /[0-9]/.test(p), t("buyer-reset-password.form.validation.rulesNotSatisfied"))
                .refine((p) => /[^A-Za-z0-9]/.test(p), t("buyer-reset-password.form.validation.rulesNotSatisfied")),
            confirmPassword: z.string().min(1, t("buyer-login.form.validation.passwordRequired")),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: t("buyer-reset-password.form.validation.passwordMismatch"),
                    path: ["confirmPassword"],
                })
            }
        })

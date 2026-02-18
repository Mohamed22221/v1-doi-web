import * as z from "zod"
import { saPhoneSchema } from "@/lib/validation/sa-phone-schema"
import { getPasswordRulesSchema } from "@/lib/validation/password-rules-schema"

export const getRegisterSchema = (t: (key: string) => string) => {
    return z.object({
        fullName: z.string().min(1, t("buyer-register.form.validation.fullNameRequired")),
        phone: saPhoneSchema(t),
        email: z.string().email(t("buyer-register.form.validation.invalidEmail")),
        password: getPasswordRulesSchema(t).shape.password,
        confirmPassword: z.string().min(1, t("buyer-login.form.validation.passwordRequired")),
        terms: z.boolean().refine((val) => val === true, {
            message: t("buyer-register.form.validation.termsRequired"),
        }),
    }).superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: t("buyer-reset-password.form.validation.passwordMismatch"),
                path: ["confirmPassword"],
            })
        }
    })
}

export type RegisterValues = z.infer<ReturnType<typeof getRegisterSchema>>

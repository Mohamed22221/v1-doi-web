import * as z from "zod"

// User enters: 5XXXXXXXX (9 digits) without +966
export const saPhoneSchema = (t: (key: string) => string) => z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, "").replace(/[-()]/g, "")) // basic cleaning
    .refine((v) => /^\d+$/.test(v), { message: t("buyer-login.form.validation.phoneNumbersOnly") })
    .refine((v) => /^5\d{8}$/.test(v), { message: t("buyer-login.form.validation.invalidSaudiPhone") })
    .transform((v) => `966${v}`) // Final transformation for backend

export const getLoginSchema = (t: (key: string) => string) => z.object({
    phone: saPhoneSchema(t),
})

export const getLoginPasswordSchema = (t: (key: string) => string) => z.object({
    phone: saPhoneSchema(t),
    password: z.string().min(1, { message: t("buyer-login.form.validation.passwordRequired") }),
})

export type LoginValues = z.infer<ReturnType<typeof getLoginSchema>>
export type LoginPasswordValues = z.infer<ReturnType<typeof getLoginPasswordSchema>>

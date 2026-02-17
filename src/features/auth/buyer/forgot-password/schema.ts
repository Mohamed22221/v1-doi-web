import * as z from "zod"
import { saPhoneSchema } from "@/lib/validation/sa-phone-schema"

export const getForgotPasswordSchema = (t: (key: string) => string) => z.object({
    phone: saPhoneSchema(t),
})

export type ForgotPasswordValues = z.infer<ReturnType<typeof getForgotPasswordSchema>>

import type * as z from "zod"
import { getPasswordRulesSchema } from "@/lib/validation/password-rules-schema"

export { getPasswordRulesSchema }

export type ResetPasswordValues = z.infer<ReturnType<typeof getPasswordRulesSchema>>

"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"

// Forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getPasswordRulesSchema, ResetPasswordValues } from "./schema"

// UI Components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { RHFPassword } from "@/components/forms/rhf-password"
import Icon from "@/components/shared/Icon"
import { ArrowIcon } from "@/components/shared/Icon/constant"

// Auth Components
import Logo from "@/components/template/nav/logo"
import HeaderSidebar from "../../components/header-sidebar"
import { PasswordRulesChecklist } from "../../components/PasswordRulesChecklist"

// i18n
import { useTranslation } from "@/lib/i18n/client"
import type { Locale } from "@/lib/i18n/config"

export default function BuyerResetPasswordForm() {
    const router = useRouter()
    const params = useParams()
    const locale = params.locale as string
    const { t } = useTranslation(locale as Locale, "auth")

    // Memoize schema
    const resetPasswordSchema = useMemo(() => getPasswordRulesSchema(t), [t])

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange", // Enable live validation feedback
    })

    const passwordValue = form.watch("password")

    function onSubmit(values: ResetPasswordValues) {
        console.log("Form submitted successfully:", values)
        // No API call or navigation for now as per instructions
    }

    return (
        <div className="flex flex-col tablet:gap-6 gap-4">
            {/* Main Form Card */}
            <Card className="p-6 w-full">
                {/* Back Navigation */}
                <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
                    <Icon icon={ArrowIcon} className="text-neutral-300 dark:text-neutral-50 ltr:rotate-180" />
                </Button>

                {/* Mobile Header (Logo + Sidebar content) */}
                <div className="tablet:hidden flex flex-col pt-4">
                    <Logo imgClass="w-[79px] h-[44px]" />
                    <HeaderSidebar
                        title={t(`buyer-reset-password.title`)}
                        subtitle=""
                        className="mt-2"
                    />
                </div>

                <HeaderSidebar
                    title={t(`buyer-reset-password.title`)}
                    subtitle=""
                    className="text-center hidden tablet:block"
                />

                <Form {...form}>
                    <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-2 md:mt-3">
                        <RHFPassword
                            control={form.control}
                            name="password"
                            label={t("buyer-reset-password.form.password")}
                            layout="floating"
                        />
                        <RHFPassword
                            control={form.control}
                            name="confirmPassword"
                            label={t("buyer-reset-password.form.confirmPassword")}
                            layout="floating"
                        />

                        <PasswordRulesChecklist
                            password={passwordValue}
                            title={t("buyer-reset-password.form.checklistTitle")}
                            rules={{
                                length: t("buyer-reset-password.form.ruleLength"),
                                lowercase: t("buyer-reset-password.form.ruleLowercase"),
                                uppercase: t("buyer-reset-password.form.ruleUppercase"),
                                number: t("buyer-reset-password.form.ruleNumber"),
                                special: t("buyer-reset-password.form.ruleSpecial"),
                            }}
                        />
                    </form>
                </Form>
            </Card>

            {/* Submit Button Card */}
            <Card className="p-4 w-full">
                <Button
                    form="reset-password-form"
                    type="submit"
                    className="w-full tablet:h-[50px] xl:h-[56px] h-[48px] tablet:text-body xl:text-lg text-label font-bold"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                >
                    {t("buyer-reset-password.form.submit")}
                </Button>
            </Card>
        </div>
    )
}

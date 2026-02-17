"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"

// Forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getForgotPasswordSchema, ForgotPasswordValues } from "./schema"

// UI Components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { RHFPhoneInput } from "@/components/forms/rhf-phone-input"
import Icon from "@/components/shared/Icon"
import { ArrowIcon } from "@/components/shared/Icon/constant"

// Auth Components
import Logo from "@/components/template/nav/logo"
import HeaderSidebar from "../../components/header-sidebar"

// i18n
import { useTranslation } from "@/lib/i18n/client"
import type { Locale } from "@/lib/i18n/config"

export default function BuyerForgotPasswordForm() {
    const router = useRouter()
    const params = useParams()
    const locale = params.locale as string
    const { t } = useTranslation(locale as Locale, "auth")

    // Memoize schema
    const forgotPasswordSchema = useMemo(() => getForgotPasswordSchema(t), [t])

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            phone: "",
        },
    })

    function onSubmit(values: ForgotPasswordValues) {
        console.log(values)
        // Redirect to verify-otp page (implementation path depends on business logic)
        router.push(`/${locale}/buyer/verify-otp`)
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
                <div className="tablet:hidden flex flex-col">
                    <Logo imgClass="w-[79px] h-[44px]" />
                    <HeaderSidebar
                        title={t(`buyer-forgot-password.title`)}
                        subtitle={t(`buyer-forgot-password.subtitle`)}
                    />
                </div>

                <HeaderSidebar
                    title={t(`buyer-forgot-password.title`)}
                    subtitle={t(`buyer-forgot-password.subtitle`)}
                    className="text-center hidden tablet:block"
                />

                <Form {...form}>
                    <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                        <RHFPhoneInput
                            control={form.control}
                            name="phone"
                            label={t("buyer-forgot-password.form.phone")}
                            layout="floating"
                        />
                    </form>
                </Form>
            </Card>

            {/* Submit Button Card (Separate as requested) */}
            <Card className="p-4 w-full">
                <Button
                    form="forgot-password-form"
                    type="submit"
                    className="w-full tablet:h-[50px] xl:h-[56px] h-[48px] tablet:text-body xl:text-lg text-label"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                >
                    {t("buyer-forgot-password.form.sendCode")}
                </Button>
            </Card>
        </div>
    )
}

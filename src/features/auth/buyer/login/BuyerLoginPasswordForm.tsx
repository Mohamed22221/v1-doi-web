"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getLoginPasswordSchema, LoginPasswordValues } from "./schema"

// UI Components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { RHFPhoneInput } from "@/components/forms/rhf-phone-input"
import { RHFPassword } from "@/components/forms/rhf-password"
import Icon from "@/components/shared/Icon"
import { ArrowIcon } from "@/components/shared/Icon/constant"

// Auth Components
import Logo from "@/components/template/nav/logo"
import HeaderSidebar from "../../components/header-sidebar"

import BuyerLoginSocial from "./BuyerLoginSocial"

// i18n
import { useTranslation } from "@/lib/i18n/client"
import type { Locale } from "@/lib/i18n/config"

export default function BuyerLoginPasswordForm() {
    const router = useRouter()
    const params = useParams()
    const locale = params.locale as string
    const { t } = useTranslation(locale as Locale, "auth")

    // Memoize schema
    const loginSchema = useMemo(() => getLoginPasswordSchema(t), [t])

    const form = useForm<LoginPasswordValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    })

    function onSubmit(values: LoginPasswordValues) {
        console.log(values)
        // TODO: Implement password login logic
    }

    return (
        <div className="flex flex-col tablet:gap-6 gap-4">
            <Card className="p-6 tablet:max-w-[550px] xl:max-w-[600px] w-full">
                {/* Back Navigation */}
                <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
                    <Icon icon={ArrowIcon} className="text-neutral-300 dark:text-neutral-50 ltr:rotate-180" />
                </Button>

                {/* Mobile Header */}
                <div className="tablet:hidden flex flex-col">
                    <Logo imgClass="w-[79px] h-[44px]" />
                    <HeaderSidebar
                        title={t("buyer-login.form.loginWithPassword")}
                        subtitle={t("buyer-login.subtitle")}
                    />
                </div>

                <h2 className="hidden tablet:block text-2xl font-bold text-center text-neutral-950 dark:text-neutral-50 mb-6">
                    {t("buyer-login.form.loginWithPassword")}
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                        <RHFPhoneInput
                            control={form.control}
                            name="phone"
                            label={t("buyer-login.form.phone")}
                            layout="floating"
                        />

                        <RHFPassword
                            control={form.control}
                            name="password"
                            label={t("buyer-login.form.password")}
                            layout="floating"
                        />

                        <Button
                            type="submit"
                            className="w-full tablet:h-[50px] xl:h-[56px] h-[48px] tablet:text-body xl:text-lg text-label"
                            size="lg"
                        >
                            {t("buyer-login.form.login")}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-1">
                    <Link
                        href={`/${locale}/buyer/forgot-password`}
                        className="text-primary-500 hover:text-primary-600 tablet:text-body xl:text-h5 text-label dark:text-primary-300"
                    >
                        {t("buyer-login.form.forgotPassword")}
                    </Link>
                </div>

            </Card>

            <BuyerLoginSocial />
        </div>
    )
}

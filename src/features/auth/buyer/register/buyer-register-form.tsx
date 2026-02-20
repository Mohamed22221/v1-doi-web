"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

// Forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getRegisterSchema, type RegisterValues } from "./schema"

// UI Components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"

import { RHFPhoneInput } from "@/components/forms/rhf-phone-input"
import { RHFPassword } from "@/components/forms/rhf-password"
import { RHFCheckbox } from "@/components/forms/rhf-checkbox"
import Icon from "@/components/shared/Icon"
import { ArrowIcon } from "@/components/shared/Icon/constant"

// Auth Components
import Logo from "@/components/template/nav/logo"
import HeaderSidebar from "../../components/header-sidebar"
import { PasswordRulesChecklist } from "../../components/password-rules-checklist"

// i18n
import { useTranslation } from "@/lib/i18n/client"
import type { Locale } from "@/lib/i18n/config"
import { RHFInput } from "@/components/forms/rhf-input"

export default function BuyerRegisterForm() {
    const router = useRouter()
    const params = useParams()
    const locale = params.locale as string
    const { t } = useTranslation(locale as Locale, "auth")

    // Memoize schema
    const registerSchema = useMemo(() => getRegisterSchema(t), [t])

    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
        mode: "onChange",
    })

    // eslint-disable-next-line react-hooks/incompatible-library
    const passwordValue = form.watch("password")

    function onSubmit(values: RegisterValues) {
        console.info("Registration submitted successfully:", values)
        // Redirection logic can be added here once API is ready
    }

    return (
        <div className="flex flex-col tablet:gap-6 gap-4">
            {/* Main Form Card */}
            <Card className="p-6 w-full">
                {/* Back Navigation */}
                <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
                    <Icon icon={ArrowIcon} className="text-neutral-300 dark:text-neutral-50 ltr:rotate-180" />
                </Button>

                {/* Mobile Header */}
                <div className="tablet:hidden flex flex-col pt-4">
                    <Logo imgClass="w-[79px] h-[44px]" />
                    <HeaderSidebar
                        title={t(`buyer-register.sidebar.title`)}
                        subtitle={t(`buyer-register.sidebar.subtitle`)}
                        className="mt-2"
                        classHeader="text-h3"
                    />
                </div>

                <HeaderSidebar
                    title={t(`buyer-register.title`)}
                    subtitle=""
                    className="text-center hidden tablet:block md:pt-1 pt-1"
                />

                <Form {...form}>
                    <form id="register-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2 md:mt-2">
                        <RHFInput
                            control={form.control}
                            name="fullName"
                            label={t("buyer-register.form.fullName")}
                            layout="floating"
                        />
                        <RHFPhoneInput
                            control={form.control}
                            name="phone"
                            label={t("buyer-register.form.phone")}
                            layout="floating"
                        />
                        <RHFInput
                            control={form.control}
                            name="email"
                            label={t("buyer-register.form.email")}
                            layout="floating"
                        />
                        <RHFPassword
                            control={form.control}
                            name="password"
                            label={t("buyer-register.form.password")}
                            layout="floating"
                        />
                        <RHFPassword
                            control={form.control}
                            name="confirmPassword"
                            label={t("buyer-register.form.confirmPassword")}
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

            {/* Terms and Submit Button Card */}
            <Card className="p-6 w-full flex flex-col gap-6">
                <Form {...form}>
                    <form className="space-y-6">
                        <RHFCheckbox
                            control={form.control}
                            name="terms"
                            size="lg"

                            checkboxLabel={
                                <span className="text-caption md:text-body">
                                    {t("buyer-register.form.terms").split(' ').slice(0, 2).join(' ')}
                                    {' '}
                                    <Link href="#" className="underline font-bold text-primary-500 dark:text-primary-400">
                                        {t("buyer-register.form.terms").split(' ').slice(2).join(' ')}
                                    </Link>
                                </span>
                            }
                        />
                    </form>
                </Form>

                <div className="flex flex-col gap-4 items-center">
                    <Button
                        form="register-form"
                        type="submit"
                        className="w-full tablet:h-[50px] xl:h-[56px] h-[48px] tablet:text-body xl:text-lg text-label font-bold"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                    >
                        {t("buyer-register.form.submit")}
                    </Button>

                    <div className="flex items-center gap-1 text-caption md:text-h5 text-neutral-400 font-medium">
                        <span>{t("buyer-register.form.haveAccount")}</span>
                        <Link href={`/${locale}/buyer/login`} className="text-primary-500 dark:text-primary-400 font-bold underline">
                            {t("buyer-register.form.loginNow")}
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}

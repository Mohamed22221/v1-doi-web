"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPasswordRulesSchema, type ResetPasswordValues } from "./schema";

// UI Components
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Form } from "@components/ui/form";
import { RHFPassword } from "@components/forms/rhf-password";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";

// Auth Components
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";
import { PasswordRulesChecklist } from "../../components/password-rules-checklist";

// i18n
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

export default function BuyerResetPasswordForm() {
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;
    const { t } = useTranslation(locale as Locale, "auth");

    // Memoize schema
    const resetPasswordSchema = useMemo(() => getPasswordRulesSchema(t), [t]);

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange", // Enable live validation feedback
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const passwordValue = form.watch("password");

    function onSubmit(values: ResetPasswordValues) {
        console.info("Form submitted successfully:", values);
        router.push(`/${locale}/buyer/reset-password-success`);
    }

    return (
        <div className="flex flex-col gap-4 tablet:gap-6">
            {/* Main Form Card */}
            <Card className="w-full p-6">
                {/* Back Navigation */}
                <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
                    <Icon icon={ArrowIcon} className="text-neutral-300 ltr:rotate-180 dark:text-neutral-50" />
                </Button>

                {/* Mobile Header (Logo + Sidebar content) */}
                <div className="flex flex-col pt-4 tablet:hidden">
                    <Logo imgClass="w-[79px] h-[44px]" />
                    <HeaderSidebar title={t(`buyer-reset-password.title`)} subtitle="" className="mt-2" />
                </div>

                <HeaderSidebar
                    title={t(`buyer-reset-password.title`)}
                    subtitle=""
                    className="hidden text-center tablet:block"
                />

                <Form {...form}>
                    <form
                        id="reset-password-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-2 space-y-6 md:mt-3"
                    >
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
            <Card className="w-full p-4">
                <Button
                    form="reset-password-form"
                    type="submit"
                    className="h-[48px] w-full text-label font-bold tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                >
                    {t("buyer-reset-password.form.submit")}
                </Button>
            </Card>
        </div>
    );
}

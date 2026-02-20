"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginPasswordSchema, type LoginPasswordValues } from "./schema";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { RHFPhoneInput } from "@/components/forms/rhf-phone-input";
import { RHFPassword } from "@/components/forms/rhf-password";
import Icon from "@/components/shared/Icon";
import { ArrowIcon } from "@/components/shared/Icon/constant";

// Auth Components
import Logo from "@/components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";
import BuyerLoginSocial from "./buyer-login-social";

// i18n
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import TitleForm from "../../components/title-form";

export default function BuyerLoginPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");

  // Memoize schema
  const loginSchema = useMemo(() => getLoginPasswordSchema(t), [t]);

  const form = useForm<LoginPasswordValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  function onSubmit(values: LoginPasswordValues) {
    console.info(values);
    // TODO: Implement password login logic
  }

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <Card className="w-full p-6 tablet:max-w-[550px] xl:max-w-[600px]">
        {/* Back Navigation */}
        <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
          <Icon icon={ArrowIcon} className="text-neutral-300 ltr:rotate-180 dark:text-neutral-50" />
        </Button>

        {/* Mobile Header */}
        <div className="flex flex-col tablet:hidden">
          <Logo imgClass="w-[79px] h-[44px]" />
          <HeaderSidebar
            title={t("buyer-login.form.loginWithPassword")}
            subtitle={t("buyer-login.subtitle")}
          />
        </div>

        <TitleForm title={t("buyer-login.form.loginWithPassword")} className="mb-6" />

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
              className="h-[48px] w-full text-label tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
              size="lg"
            >
              {t("buyer-login.form.login")}
            </Button>
          </form>
        </Form>
        <div className="mt-1 text-center">
          <Link
            href={`/${locale}/buyer/forgot-password`}
            className="text-label text-primary-500 hover:text-primary-600 tablet:text-body xl:text-h5 dark:text-primary-300"
          >
            {t("buyer-login.form.forgotPassword")}
          </Link>
        </div>
      </Card>

      <BuyerLoginSocial />
    </div>
  );
}

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginSchema, type LoginValues } from "./schema";
import { useLogin } from "@api/hooks/use-auth";

// UI Components
import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";
import { Card } from "@components/ui/card";
import { Form } from "@components/ui/form";
import { RHFPhoneInput } from "@components/forms/rhf-phone-input";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";

// Auth Components
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";

// i18n
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import TitleForm from "../../components/title-form";

export default function BuyerLoginForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslation(locale as Locale, "auth");

  const loginSchema = useMemo(() => getLoginSchema(t), [t]);

  const { login, isPending } = useLogin();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: LoginValues) {
    login({ phone: `+${values.phone}` });
  }

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      {/* Main Login Card */}
      <Card className="w-full p-6">
        {/* Back Navigation */}
        <Button
          variant="outline"
          rounded="sm"
          size="icon"
          onClick={() => router.back()}
          aria-label={t("common.back")}
        >
          <Icon icon={ArrowIcon} className="text-neutral-300 ltr:rotate-180 dark:text-neutral-50" />
        </Button>

        {/* Mobile Header (Logo + Sidebar content) */}
        <div className="flex flex-col tablet:hidden">
          <Logo imgClass="w-[79px] h-[44px]" />
          <HeaderSidebar title={t(`buyer-login.title`)} subtitle={t(`buyer-login.subtitle`)} />
        </div>

        <TitleForm title={t("buyer-login.form.title")} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <RHFPhoneInput
              control={form.control}
              name="phone"
              label={t("buyer-login.form.phone")}
              layout="floating"
            />
            <Button
              type="submit"
              className="h-[48px] w-full text-label tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
              size="lg"
              disabled={isPending}
              aria-busy={isPending}
            >
              {t("buyer-login.form.next")}
              {isPending && <Spinner data-icon="inline-start" />}
            </Button>
          </form>
        </Form>

        <div className="mt-1 text-center">
          <Link
            href={`/${locale}/buyer/login-password`}
            className="text-label text-primary-500 hover:text-primary-600 tablet:text-body xl:text-h5 dark:text-primary-300"
          >
            {t("buyer-login.form.loginWithPassword")}
          </Link>
        </div>
      </Card>
    </div>
  );
}

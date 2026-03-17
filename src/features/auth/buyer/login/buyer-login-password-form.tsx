"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginPasswordSchema, type LoginPasswordValues } from "./schema";

// API
import { useLogin } from "@api/hooks/use-auth";

// UI Components
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Form } from "@components/ui/form";
import { ROUTES } from "@components/routes";
import { RHFPhoneInput } from "@components/forms/rhf-phone-input";
import { RHFPassword } from "@components/forms/rhf-password";
import { Spinner } from "@components/ui/spinner";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";

// Auth Components
// Auth Components
// (Logo and HeaderSidebar are now passed as props from parent)
import TitleForm from "../../components/title-form";

// i18n
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

interface BuyerLoginPasswordFormProps {
  locale: Locale;
  staticHeader?: React.ReactNode;
}

export default function BuyerLoginPasswordForm({
  locale,
  staticHeader,
}: BuyerLoginPasswordFormProps) {
  const router = useRouter();
  const { t } = useTranslation(locale, "auth");

  // Auth logic
  const { login, isPending } = useLogin();

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
    login({
      phone: `+${values.phone}`,
      password: values.password,
    });
  }

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <Card className="w-full p-6 tablet:max-w-[550px] xl:max-w-[600px]">
        {/* Back Navigation */}
        <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
          <Icon icon={ArrowIcon} className="text-neutral-300 ltr:rotate-180 dark:text-neutral-50" />
        </Button>

        {/* Mobile Header (Rendered statically from parent) */}
        {staticHeader}

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
              disabled={isPending}
              aria-busy={isPending}
            >
              {isPending && <Spinner data-icon="inline-start" />}
              {t("buyer-login.form.login")}
            </Button>
          </form>
        </Form>
        <div className="mt-1 text-center">
          <Link
            href={`/${locale}${ROUTES.AUTH.FORGOT_PASSWORD}`}
            className="text-label text-primary-500 hover:text-primary-600 tablet:text-body xl:text-h5 dark:text-primary-300"
          >
            {t("buyer-login.form.forgotPassword")}
          </Link>
        </div>
      </Card>
    </div>
  );
}

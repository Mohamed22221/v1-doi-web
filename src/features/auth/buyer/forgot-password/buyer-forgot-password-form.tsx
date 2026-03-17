"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getForgotPasswordSchema, type ForgotPasswordValues } from "./schema";

// UI Components
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Form } from "@components/ui/form";
import { RHFPhoneInput } from "@components/forms/rhf-phone-input";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";

// Auth Components
// (Logo and HeaderSidebar (mobile) are now passed as props from the parent page)

// i18n
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import { useForgotPassword } from "@api/hooks/use-auth";
import { Spinner } from "@components/ui/spinner";
import HeaderSidebar from "../../components/header-sidebar";

interface BuyerForgotPasswordFormProps {
  locale: Locale;
  staticHeader?: React.ReactNode;
}

export default function BuyerForgotPasswordForm({
  locale,
  staticHeader,
}: BuyerForgotPasswordFormProps) {
  const router = useRouter();
  const { t } = useTranslation(locale, "auth");
  const { forgotPassword, isPending } = useForgotPassword();

  // Memoize schema
  const forgotPasswordSchema = useMemo(() => getForgotPasswordSchema(t), [t]);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: ForgotPasswordValues) {
    forgotPassword({
      phone: `+${values.phone}`,
    });
  }

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      {/* Main Form Card */}
      <Card className="w-full p-6">
        {/* Back Navigation */}
        <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
          <Icon icon={ArrowIcon} className="text-neutral-300 ltr:rotate-180 dark:text-neutral-50" />
        </Button>

        {/* Mobile Header (Rendered statically from Server Component) */}
        {staticHeader}

        <HeaderSidebar
          title={t(`buyer-forgot-password.title`)}
          subtitle={t(`buyer-forgot-password.subtitle`)}
          className="hidden text-center tablet:block"
        />

        <Form {...form}>
          <form
            id="forgot-password-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7"
          >
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
      <Card className="w-full p-4">
        <Button
          form="forgot-password-form"
          type="submit"
          className="h-[48px] w-full text-label tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
          size="lg"
          disabled={form.formState.isSubmitting || isPending}
        >
          {isPending && <Spinner data-icon="inline-start" />}
          {t("buyer-forgot-password.form.sendCode")}
        </Button>
      </Card>
    </div>
  );
}

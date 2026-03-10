"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getVerifyOtpSchema, type VerifyOtpValues } from "./schema";

// UI Components
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Form } from "@components/ui/form";
import { RHFInputOTP } from "@components/forms/rhf-otp";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";

// Auth Components
import { useAuthStore } from "@store/auth-store";
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";
import TitleForm from "../../components/title-form";

// i18n
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import BuyerVerifyOtpActions from "./buyer-verify-otp-actions";

export default function BuyerVerifyOtpForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "auth");
  const { otpData } = useAuthStore();

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60);

  // Memoize schema
  const verifyOtpSchema = useMemo(() => getVerifyOtpSchema(t), [t]);

  const form = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: otpData?.otpCode?.toString() || "",
    },
  });

  // Pre-fill OTP if available in store
  useEffect(() => {
    if (otpData?.otpCode) {
      form.reset({
        otp: otpData.otpCode.toString(),
      });
    }
  }, [otpData?.otpCode, form]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(60);
    // TODO: Implement resend OTP logic
  };

  function onSubmit(values: VerifyOtpValues) {
    console.info(values);
    // TODO: Implement verify OTP logic
  }

  const subtitle = otpData?.phone
    ? `${t("buyer-verify-otp.subtitle")} ${otpData.phone}`
    : t("buyer-verify-otp.subtitle");

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      {/* Main OTP Card */}
      <Card className="p-6">
        {/* Back Navigation */}
        <Button variant="outline" rounded="sm" size="icon" onClick={() => router.back()}>
          <Icon icon={ArrowIcon} className="text-neutral-300 ltr:rotate-180 dark:text-neutral-50" />
        </Button>

        {/* Mobile Header */}
        <div className="flex flex-col tablet:hidden">
          <Logo imgClass="w-[79px] h-[44px]" />
          <HeaderSidebar title={t("buyer-verify-otp.title")} subtitle={subtitle} />
        </div>

        <TitleForm title={t("buyer-verify-otp.title")} />

        <div className="mb-3 hidden text-center tablet:block">
          <p className="text-label text-neutral-400 tablet:text-body dark:text-neutral-300">
            {subtitle}
          </p>
        </div>

        <Form {...form}>
          <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <RHFInputOTP
                key={otpData?.otpCode ? "filled" : "empty"}
                className="flex w-full items-center justify-center"
                control={form.control}
                name="otp"
                maxLength={4}
                size="lg"
                layout="floating"
              />

              <span className="flex items-center gap-2 text-label font-medium text-primary-500 tablet:text-body dark:text-primary-300">
                {t("buyer-verify-otp.resendIn")}
                <span className="text-danger-500">{formatTime(timeLeft)}</span>
              </span>
            </div>
          </form>
        </Form>
      </Card>

      {/* Resend Actions Card */}
      <BuyerVerifyOtpActions timeLeft={timeLeft} onResend={handleResend} formId="otp-form" />
    </div>
  );
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

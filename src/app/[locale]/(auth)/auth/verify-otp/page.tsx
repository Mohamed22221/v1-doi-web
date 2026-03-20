import type { Metadata } from "next";
import { Suspense } from "react";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@config/routes";
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import { getTranslation } from "@/lib/i18n/server";
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "@/features/auth/components/header-sidebar";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerVerifyOtpForm from "@/features/auth/buyer/verify-otp/buyer-verify-otp-form";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-verify-otp",
    pathname: ROUTES.AUTH.VERIFY_OTP,
  });
}

/**
 * BuyerVerifyOtpPage
 *
 * The main entry point for the buyer OTP verification route.
 * Assembles the `AuthSplitLayout` with the `BuyerVerifyOtpForm` and `BuyerSidebar`.
 */
export default async function BuyerVerifyOtpPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  const staticHeader = (
    <div className="flex flex-col tablet:hidden">
      <Logo imgClass="w-[79px] h-[44px]" />
      <HeaderSidebar title={t("buyer-verify-otp.title")} subtitle="" />
    </div>
  );

  return (
    <AuthSplitLayout
      // Form Area: The main OTP verification form
      formContent={
        <Suspense>
          <BuyerVerifyOtpForm locale={locale as Locale} staticHeader={staticHeader} />
        </Suspense>
      }
      // Sidebar Area: Branding and context
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@components/routes";

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerForgotPasswordForm from "@/features/auth/buyer/forgot-password/buyer-forgot-password-form";
import { Suspense } from "react";
import HeaderSidebar from "@/features/auth/components/header-sidebar";
import { getTranslation } from "@/lib/i18n/server";
import { Logo } from "@components/template/nav/logo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-forgot-password",
    pathname: ROUTES.AUTH.FORGOT_PASSWORD,
  });
}


/**
 * BuyerForgotPasswordPage
 *
 * The entry point for the buyer forgot password route.
 * Assembles the `AuthSplitLayout` with `BuyerForgotPasswordForm` and `BuyerSidebar`.
 */
export default async function BuyerForgotPasswordPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  const staticHeader = (
    <div className="flex flex-col tablet:hidden">
      <Logo imgClass="w-[79px] h-[44px]" />
      <HeaderSidebar
        title={t(`buyer-forgot-password.title`)}
        subtitle={t(`buyer-forgot-password.subtitle`)}
      />
    </div>
  );

  return (
    <AuthSplitLayout
      // Form Area: The forgot password form
      formContent={
        <Suspense>
          <BuyerForgotPasswordForm locale={locale as Locale} staticHeader={staticHeader} />
        </Suspense>
      }
      // Sidebar Area: Using the same buyer-login variant for consistency
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@components/routes";
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import { getTranslation } from "@/lib/i18n/server";
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "@/features/auth/components/header-sidebar";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerResetPasswordForm from "@/features/auth/buyer/reset-password/buyer-reset-password-form";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-reset-password",
    pathname: ROUTES.AUTH.RESET_PASSWORD,
  });
}


/**
 * BuyerResetPasswordPage
 *
 * The entry point for the buyer reset password route.
 * Assembles the `AuthSplitLayout` with `BuyerResetPasswordForm` and `BuyerSidebar`.
 */
export default async function BuyerResetPasswordPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  const staticHeader = (
    <div className="flex flex-col pt-4 tablet:hidden">
      <Logo imgClass="w-[79px] h-[44px]" />
      <HeaderSidebar title={t(`buyer-reset-password.title`)} subtitle="" className="mt-2" />
    </div>
  );

  return (
    <AuthSplitLayout
      // Form Area: The reset password form
      formContent={
        <Suspense>
          <BuyerResetPasswordForm locale={locale as Locale} staticHeader={staticHeader} />
        </Suspense>
      }
      // Sidebar Area: Using the same buyer-login variant for consistency
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

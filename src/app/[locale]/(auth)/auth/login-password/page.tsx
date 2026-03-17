import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@components/routes";
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import { getTranslation } from "@/lib/i18n/server";
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "@/features/auth/components/header-sidebar";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerLoginPasswordForm from "@/features/auth/buyer/login/buyer-login-password-form";
import BuyerLoginSocial from "@/features/auth/buyer/login/buyer-login-social";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-login-password",
    pathname: ROUTES.AUTH.LOGIN_PASSWORD,
  });
}

/**
 * BuyerLoginPasswordPage
 *
 * Page for buyers to login using their phone number and password.
 * Uses the same split layout and sidebar as the main login page.
 */
export default async function BuyerLoginPasswordPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  const staticHeader = (
    <div className="flex flex-col tablet:hidden">
      <Logo imgClass="w-[79px] h-[44px]" />
      <HeaderSidebar
        title={t("buyer-login.form.loginWithPassword")}
        subtitle={t("buyer-login.subtitle")}
      />
    </div>
  );

  return (
    <AuthSplitLayout
      formContent={
        <div className="flex flex-col gap-4 tablet:gap-6">
          <BuyerLoginPasswordForm locale={locale as Locale} staticHeader={staticHeader} />
          <BuyerLoginSocial locale={locale as Locale} />
        </div>
      }
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

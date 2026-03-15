import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@components/routes";

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerLoginForm from "@/features/auth/buyer/login/buyer-login-form";
import BuyerLoginSocial from "@/features/auth/buyer/login/buyer-login-social";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-login",
    pathname: ROUTES.AUTH.LOGIN,
  });
}

/**
 * BuyerLoginPage
 *
 * The main entry point for the buyer login route.
 * Assembles the `AuthSplitLayout` with the `BuyerLoginForm` and `BuyerSidebar`.
 */
export default async function BuyerLoginPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <AuthSplitLayout
      // Form Area: The main login form + social login
      formContent={
        <div className="flex flex-col gap-4 tablet:gap-6">
          <Suspense>
            <BuyerLoginForm />
          </Suspense>

          <BuyerLoginSocial locale={locale as Locale} />
        </div>
      }
      // Sidebar Area: Branding and context (passed locale for translations)
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

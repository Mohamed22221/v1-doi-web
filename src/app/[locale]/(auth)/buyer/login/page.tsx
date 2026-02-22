import type { Locale } from "@/lib/i18n/config";
// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerLoginForm from "@/features/auth/buyer/login/buyer-login-form";
import BuyerLoginSocial from "@/features/auth/buyer/login/buyer-login-social";

interface PageProps {
  params: Promise<{ locale: string }>;
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
          <BuyerLoginForm />
          <BuyerLoginSocial locale={locale as Locale} />
        </div>
      }
      // Sidebar Area: Branding and context (passed locale for translations)
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

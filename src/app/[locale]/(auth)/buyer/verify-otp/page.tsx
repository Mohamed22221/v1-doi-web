import type { Locale } from "@/lib/i18n/config";

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerVerifyOtpForm from "@/features/auth/buyer/verify-otp/buyer-verify-otp-form";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * BuyerVerifyOtpPage
 *
 * The main entry point for the buyer OTP verification route.
 * Assembles the `AuthSplitLayout` with the `BuyerVerifyOtpForm` and `BuyerSidebar`.
 */
export default async function BuyerVerifyOtpPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <AuthSplitLayout
      // Form Area: The main OTP verification form
      formContent={<BuyerVerifyOtpForm />}
      // Sidebar Area: Branding and context
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

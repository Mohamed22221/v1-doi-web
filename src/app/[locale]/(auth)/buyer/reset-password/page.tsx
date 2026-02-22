import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
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
    pathname: "/buyer/reset-password",
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

  return (
    <AuthSplitLayout
      // Form Area: The reset password form
      formContent={<BuyerResetPasswordForm />}
      // Sidebar Area: Using the same buyer-login variant for consistency
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-login" />}
    />
  );
}

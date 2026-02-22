import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import ResetSuccessAction from "@/features/auth/buyer/reset-password-success/reset-success-action";
import ResetSuccessContent from "@/features/auth/buyer/reset-password-success/reset-success-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-reset-password-success",
    pathname: "/buyer/reset-password-success",
  });
}

/**
 * ResetPasswordSuccessPage
 *
 * The entry point for the password reset success route.
 * Uses AuthCenteredCardLayout for a focused, centered UI.
 */
export default async function ResetPasswordSuccessPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <AuthCenteredCardLayout
      // Form Area: Success illustration and text
      actionContent={<ResetSuccessAction locale={locale as Locale} />}
    >
      <ResetSuccessContent locale={locale as Locale} />
    </AuthCenteredCardLayout>
  );
}

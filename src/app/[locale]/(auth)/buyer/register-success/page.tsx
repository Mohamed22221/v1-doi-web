import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import RegisterSuccess from "@/features/auth/buyer/register-success/register-success";
import RegisterRedirectCard from "@/features/auth/buyer/register-success/register-redirect-card";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-register-success",
    pathname: "/buyer/register-success",
  });
}

/**
 * RegisterSuccessPage
 *
 * The entry point for the register success route.
 * Uses AuthCenteredCardLayout for a focused, centered UI.
 */
export default async function RegisterSuccessPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <AuthCenteredCardLayout
      // Redirect Message Card
      actionContent={<RegisterRedirectCard />}
    >
      {/* Main Success Content */}
      <RegisterSuccess locale={locale as Locale} />
    </AuthCenteredCardLayout>
  );
}

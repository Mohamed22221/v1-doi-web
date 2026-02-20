import type { Locale } from "@/lib/i18n/config";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import RegisterSuccess from "@/features/auth/buyer/register-success/register-success";
import RegisterRedirectCard from "@/features/auth/buyer/register-success/register-redirect-card";

interface PageProps {
  params: Promise<{ locale: string }>;
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

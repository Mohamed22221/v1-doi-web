import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerRegisterForm from "@/features/auth/buyer/register/buyer-register-form";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-register",
    pathname: "/buyer/register",
  });
}

/**
 * BuyerRegisterPage
 *
 * The entry point for the buyer registration route.
 * Utilizes AuthSplitLayout with a specialized sidebar and the registration form.
 */
export default async function BuyerRegisterPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <AuthSplitLayout
      // Form Area: Registration details and terms
      formContent={<BuyerRegisterForm />}
      // Sidebar Area: Brand identity and registration value props
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-register" />}
      classType={true}
    />
  );
}

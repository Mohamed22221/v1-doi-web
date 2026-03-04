import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

// Layout
import { AuthSplitLayout } from "@components/layout/auth/auth-split-layout";

// Components
import SellerVerificationSidebar from "@/features/auth/seller/verify/seller-verification-sidebar";
import SellerVerificationForm from "@/features/auth/seller/verify/seller-verification-form";
import SellerVerificationHeader from "@/features/auth/seller/verify/seller-verification-header";

interface SellerVerificationPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: SellerVerificationPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "seo");

  return {
    title: t("seller-verify.title"),
    description: t("seller-verify.description"),
  };
}

/**
 * Seller Verification Page
 *
 * Uses AuthSplitLayout to provide a split screen experience.
 * Sidebar contains marketing points and illustrations.
 * Form area handles the verification logic.
 */
export default async function SellerVerificationPage({ params }: SellerVerificationPageProps) {
  const { locale } = await params;

  return (
    <AuthSplitLayout
      sidebarContent={<SellerVerificationSidebar locale={locale} />}
      formContent={
        <div className="relative flex w-full flex-col gap-6">
          <SellerVerificationForm header={<SellerVerificationHeader locale={locale} />} />
        </div>
      }
    />
  );
}

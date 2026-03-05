import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

// Layout
import { AuthSplitLayout } from "@components/layout/auth/auth-split-layout";

// Components
import SellerVerificationSidebar from "@/features/auth/seller/verify/seller-verification-sidebar";
import SellerPaymentForm from "@/features/auth/seller/payment/seller-payment-form";
import SellerPaymentHeader from "@/features/auth/seller/payment/seller-payment-header";

interface SellerPaymentPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: SellerPaymentPageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "seo");

  return {
    title: t("seller-verify.title"), // Reusing same metadata title as it's part of the flow
    description: t("seller-verify.description"),
  };
}

/**
 * Seller Payment Page
 *
 * Fourth/Final step of seller onboarding.
 * Allows choosing a payout method.
 */
export default async function SellerPaymentPage({ params }: SellerPaymentPageProps) {
  const { locale } = await params;

  return (
    <AuthSplitLayout
      sidebarContent={<SellerVerificationSidebar locale={locale} />}
      formContent={
        <div className="relative flex w-full flex-col gap-6">
          <SellerPaymentForm header={<SellerPaymentHeader locale={locale} />} />
        </div>
      }
    />
  );
}

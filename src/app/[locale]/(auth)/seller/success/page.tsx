import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// i18n
import { getTranslation } from "@lib/i18n/server";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import SellerSuccessAction from "@/features/auth/seller/success/seller-success-action";
import SellerSuccessContent from "@/features/auth/seller/success/seller-success-content";
import { AuthCloseButton } from "@/features/auth/components/auth-close-button";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "seller-success",
    pathname: "/seller/success",
  });
}

/**
 * SellerSuccessPage
 *
 * The page displayed when a seller's account activation is successful.
 * Matches the design of seller/start and seller/pending.
 */
export default async function SellerSuccessPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  return (
    <main className="relative">
      <AuthCenteredCardLayout
        // Action Area: Add product and home buttons
        actionContent={<SellerSuccessAction locale={locale as Locale} />}
        className="relative"
      >
        {/* Close Button at top-left of the card - redirects to home */}
        <AuthCloseButton
          href={`/${locale}`}
          ariaLabel={t("seller-pending.closeLabel")}
          variant="close"
        />

        <SellerSuccessContent locale={locale as Locale} />
      </AuthCenteredCardLayout>
    </main>
  );
}

import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// i18n
import { getTranslation } from "@lib/i18n/server";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import SellerRejectedAction from "@/features/auth/seller/rejected/seller-rejected-action";
import SellerRejectedContent from "@/features/auth/seller/rejected/seller-rejected-content";
import { AuthCloseButton } from "@/features/auth/components/auth-close-button";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "seller-rejected",
    pathname: "/seller/rejected",
  });
}

/**
 * SellerRejectedPage
 *
 * The page displayed when a seller's verification is rejected.
 * Uses AuthCenteredCardLayout for a focused, centered UI.
 */
export default async function SellerRejectedPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  return (
    <main className="relative">
      <AuthCenteredCardLayout
        // Action Area: Retry and Support buttons
        actionContent={<SellerRejectedAction locale={locale as Locale} />}
        className="relative"
      >
        {/* Close Button at top-left of the card - redirects to home */}
        <AuthCloseButton
          href={`/${locale}/seller`}
          ariaLabel={t("seller-rejected.closeLabel")}
          variant="close"
        />

        <SellerRejectedContent locale={locale as Locale} />
      </AuthCenteredCardLayout>
    </main>
  );
}

import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// i18n
import { getTranslation } from "@lib/i18n/server";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import SellerStartAction from "@/features/auth/seller/start/seller-start-action";
import SellerStartContent from "@/features/auth/seller/start/seller-start-content";
import { AuthCloseButton } from "@/features/auth/components/auth-close-button";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "seller-start",
    pathname: "/seller/start",
  });
}

/**
 * SellerStartPage
 *
 * The entry point for the seller identity verification start route.
 * Uses AuthCenteredCardLayout for a focused, centered UI.
 */
export default async function SellerStartPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  return (
    <main className="relative">
      <AuthCenteredCardLayout
        // Action Area: Verify button and helper text
        actionContent={<SellerStartAction locale={locale as Locale} />}
        className="relative"
      >
        {/* Close Button at top-left of the card */}
        <AuthCloseButton
          href={`/${locale}/seller`}
          ariaLabel={t("seller-start.closeLabel")}
          variant="close"
        />

        <SellerStartContent locale={locale as Locale} />
      </AuthCenteredCardLayout>
    </main>
  );
}

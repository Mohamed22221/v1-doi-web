import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// i18n
import { getTranslation } from "@lib/i18n/server";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import { buttonVariants } from "@/components/ui/button";
import SellerStartAction from "@/features/auth/seller/start/seller-start-action";
import SellerStartContent from "@/features/auth/seller/start/seller-start-content";

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
      {/* Close Button UI - positioned relative to the card area via layout or absolute if needed */}
      <AuthCenteredCardLayout
        // Action Area: Verify button and helper text
        actionContent={<SellerStartAction locale={locale as Locale} />}
        className="relative"
      >
        {/* Close Button at top-left of the card */}
        <div className="absolute top-4 left-4 z-10 md:top-6 md:left-6">
          <Link
            href={`/${locale}/seller`}
            aria-label={t("seller-start.closeLabel")}
            className={buttonVariants({
              variant: "ghost",
              size: "icon-sm",
              className:
                "h-[40px] w-[40px] rounded-md border border-primary-50 dark:border-primary-400",
            })}
          >
            <X className="h-4 w-4 text-neutral-300" />
            <span className="sr-only">{t("seller-start.closeLabel")}</span>
          </Link>
        </div>

        <SellerStartContent locale={locale as Locale} />
      </AuthCenteredCardLayout>
    </main>
  );
}

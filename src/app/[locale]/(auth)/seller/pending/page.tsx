import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

// i18n
import { getTranslation } from "@lib/i18n/server";

// Layouts & Components
import { AuthCenteredCardLayout } from "@/components/layout/auth/auth-centered-card-layout";
import { buttonVariants } from "@/components/ui/button";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";
import SellerPendingAction from "@/features/auth/seller/pending/seller-pending-action";
import SellerPendingContent from "@/features/auth/seller/pending/seller-pending-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "seller-pending",
    pathname: "/seller/pending",
  });
}

/**
 * SellerPendingPage
 *
 * The page displayed when a seller's verification is pending.
 * Uses AuthCenteredCardLayout for a focused, centered UI.
 */
export default async function SellerPendingPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  return (
    <main className="relative">
      <AuthCenteredCardLayout
        // Action Area: Back to home button and helper text
        actionContent={<SellerPendingAction locale={locale as Locale} />}
        className="relative"
      >
        {/* Close Button at top-left of the card - redirects to home */}
        <div className="absolute start-4 top-4 z-10 md:start-6 md:top-6">
          <Link
            href={`/${locale}`}
            aria-label={t("seller-pending.closeLabel")}
            className={buttonVariants({
              variant: "ghost",
              size: "icon-sm",
              className:
                "h-[40px] w-[40px] rounded-md border border-primary-50 dark:border-primary-400",
            })}
          >
            <Icon
              icon={ArrowIcon}
              className="h-4 w-4 text-neutral-300 ltr:rotate-180 dark:text-neutral-50"
            />
            <span className="sr-only">{t("seller-pending.closeLabel")}</span>
          </Link>
        </div>

        <SellerPendingContent locale={locale as Locale} />
      </AuthCenteredCardLayout>
    </main>
  );
}

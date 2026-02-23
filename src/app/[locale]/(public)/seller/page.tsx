import type { Metadata } from "next";
import { SellerHeader } from "@/features/seller/home/seller-header";
import { SellerSteps } from "@/features/seller/home/seller-steps";
import type { Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { SellerFeatures } from "@/features/seller/home/seller-features";
import { SellerCta } from "@/features/seller/home/seller-cta";
import { SellerFooter } from "@/features/seller/home/seller-footer";
import { SellerMobileHeader } from "@/features/seller/home/seller-mobile-header";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "seller-landing",
    pathname: "/seller",
  });
}

/**
 * SellerLandingPage
 *
 * The main entry point for the seller landing route.
 */
export default async function SellerLandingPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  return (
    <>
      <SellerMobileHeader />
      <SellerHeader locale={locale} />
      <SellerSteps locale={locale} />
      <SellerFeatures locale={locale} />
      <SellerCta locale={locale} />
      <SellerFooter locale={locale} />
    </>
  );
}

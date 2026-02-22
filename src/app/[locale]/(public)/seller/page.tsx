import { SellerHeader } from "@/features/seller/home/seller-header";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
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
      <SellerHeader locale={locale} />
    </>
  );
}

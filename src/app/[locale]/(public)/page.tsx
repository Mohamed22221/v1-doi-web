import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
// import { getTranslation } from "@/lib/i18n/server";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { NavLinks } from "@/components/layout/nav/nav-links";
import { MobileNav } from "@/components/layout/nav/mobile-nav";
import { Header } from "@/components/layout/headers/header";
import { cookies } from "next/headers";
import type { HeaderActionRole } from "@config/header-actions-config";
import { ENV } from "@/config/env";
import HeroSection from "@/features/home/hero/hero-section";
import { CategoriesSection } from "@/features/home/categories/categories-section";
import { AuctionsSection } from "@/features/home/auctions-live/auctions-section";
import { FeaturedCategoriesSection } from "@/features/home/featured-categories/featured-categories-section";
import { FeaturedAuctionsSection } from "@/features/home/featured-auctions/featured-auctions-section";
import { BuyNowSection } from "@/features/home/buy-products/buy-now-section";
import { SellPromoSection } from "@/features/home/sell-promo/sell-promo-section";
import { AppDownloadSection } from "@/features/home/app-download/app-download-section";
import { FooterSection } from "@/features/home/footer/footer-section";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "home",
    pathname: "",
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  // const { t } = await getTranslation(locale as Locale, "common");

  // Detect user status from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ENV.ACCESS_TOKEN_KEY)?.value;
  const role: HeaderActionRole = accessToken ? "buyer-auth" : "guest";

  return (
    <div className="min-h-screen flex-col">
      <Header role={role} showDelivery={false} className="md:hidden" locale={locale as Locale} />
      <NavLinks config={role} locale={locale as Locale} />

      {/* Hero rendering with normal transparent background inheritance */}
      <div className="pt-18 md:pt-21">
        <HeroSection locale={locale as Locale} />
      </div>

      {/* The rest of the page gets the specific card background */}
      <main className="sm:pb-40px bg-card pb-[55px] dark:bg-primary-900">
        <CategoriesSection locale={locale as Locale} />
        <AuctionsSection locale={locale as Locale} />
        <BuyNowSection locale={locale as Locale} />
        <SellPromoSection locale={locale as Locale} />
        <FeaturedAuctionsSection locale={locale as Locale} />
        <FeaturedCategoriesSection locale={locale as Locale} />
        <AppDownloadSection locale={locale as Locale} />
      </main>
      <FooterSection locale={locale as Locale} />
      <MobileNav roles={[role]} locale={locale as Locale} />
    </div>
  );
}

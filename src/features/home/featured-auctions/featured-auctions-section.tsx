import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import { SectionTitle } from "@/features/home/components/section-title";
import { PageContainer } from "@/components/template/container/page-container";
import { FeaturedAuctionCard } from "./featured-auction-card";

/** ── Mock product images (replace with API data when ready) ── */
const img1 = "/img/fake/Container.png";
const img2 = "/img/fake/Container2.png";

/** ── Mock auctions (replace with API call when backend is ready) ── */
const MOCK_FEATURED_AUCTIONS = [
  {
    id: "fauc-01",
    images: [img1, img2, img1],
    titleAr: "iPhone 14 Pro  – استخدام شهرين",
    titleEn: "Samsung Galaxy Watch 6",
    price: "2,000",
    href: "/auctions/1",
  },
  {
    id: "fauc-02",
    images: [img2, img1, img2],
    titleAr: "سماعات Samsung Galaxy Buds 2",
    titleEn: "Samsung Galaxy Buds 2",
    price: "2,000",
    href: "/auctions/2",
  },
  {
    id: "fauc-03",
    images: [img1, img2, img1],
    titleAr: "iPhone 14 Pro – استخدام شهرين",
    titleEn: "iPhone 14 Pro – 2 Month Use",
    price: "2,000",
    href: "/auctions/3",
  },
];

interface FeaturedAuctionsGridProps {
  locale: Locale;
}

/**
 * FeaturedAuctionsSection — Server Component
 *
 * Figma node 713:8325 (desktop) / 1325-24752 (mobile)
 *
 * Includes:
 * - SectionTitle with live badge (مباشر الان) + "View All" link
 * - 2-column grid on mobile / 3-column grid on desktop
 */
export async function FeaturedAuctionsSection({ locale }: FeaturedAuctionsGridProps) {
  const { t } = await getTranslation(locale, "home");
  const isArabic = locale === "ar";

  const endsInLabel = t("auctions.featured.endsIn");
  const currentPriceLabel = t("auctions.featured.currentPrice");
  const bidNowLabel = t("auctions.featured.bidNow");
  const minutesLabel = t("auctions.featured.minutes");
  const secondsLabel = t("auctions.featured.seconds");

  return (
    <PageContainer aria-labelledby="featured-auctions-heading" className="py-3 md:py-8">
      {/* ── Section header: Live badge on start side, title on end side ── */}
      <SectionTitle
        id="featured-auctions-heading"
        title={t("auctions.featured.title")}
        // viewAllLabel={t("auctions.featured.viewAll")}
        // viewAllHref="/auctions"
        isLive
        liveLabel={t("auctions.featured.liveNow")}
      />

      {/* ── Auction cards grid ── */}
      <div aria-live="polite" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {MOCK_FEATURED_AUCTIONS.map((auction, index) => {
          const title = isArabic ? auction.titleAr : auction.titleEn;
          return (
            <FeaturedAuctionCard
              key={auction.id}
              id={auction.id}
              images={auction.images}
              title={title}
              price={auction.price}
              href={auction.href}
              locale={locale}
              endsInLabel={endsInLabel}
              currentPriceLabel={currentPriceLabel}
              bidNowLabel={bidNowLabel}
              minutesLabel={minutesLabel}
              secondsLabel={secondsLabel}
              className={index >= 2 ? "hidden lg:flex" : "flex"}
            />
          );
        })}
      </div>
    </PageContainer>
  );
}

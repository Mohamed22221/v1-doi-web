import Image from "next/image";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";
import { SearchContainer } from "@/features/home/hero/search-container";
import { SearchDropdown } from "@/features/home/hero/search-dropdown";
import { TrendingSearchesWrapper } from "@/features/home/hero/trending-searches-wrapper";
import {
  ShippingIcon,
  BuyerProtectionIcon,
  SecurePaymentIcon,
} from "@components/shared/icon-base/hero-icons";

interface HeroSectionProps {
  locale: Locale;
}

/**
 * HeroSection — top-level Server Component.
 *
 * Architecture:
 * - Static shell: background image, headline, trust badges.
 * - Dynamic holes: <SearchContainer /> (client), <TrendingSearchesWrapper /> (Suspense).
 * - All layout uses Tailwind logical properties (ps-, pe-, ms-, me-, text-start)
 *   so Arabic (RTL) and English (LTR) both render correctly.
 */
export default async function HeroSection({ locale }: HeroSectionProps) {
  const { t } = await getTranslation(locale, "home");

  const trustBadges = [
    {
      key: "secure_payment",
      label: t("hero.trust.secure_payment"),
      Icon: SecurePaymentIcon,
    },
    {
      key: "buyer_protection",
      label: t("hero.trust.buyer_protection"),
      Icon: BuyerProtectionIcon,
    },
    {
      key: "reliable_shipping",
      label: t("hero.trust.reliable_shipping"),
      Icon: ShippingIcon,
    },
  ] as const;

  const trendingTags = [
    { label: t("hero.trending.apple_watch"), href: "#" },
    { label: t("hero.trending.rolex"), href: "#" },
    { label: t("hero.trending.iphone_15_pro"), href: "#" },
    { label: t("hero.trending.airpods"), href: "#" },
  ];

  return (
    <section
      className="relative flex min-h-[400px] w-full flex-col items-center justify-center gap-6 overflow-hidden px-4 sm:min-h-[500px] sm:gap-8 md:min-h-[610px] md:gap-10 md:py-8 3xl:min-h-[800px] ltr:px-3 max-md:ltr:min-h-[450px]"
      aria-labelledby="hero-heading"
    >
      {/* ── Background Image (LCP-priority) ── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src="/img/home/hero.png" alt="" fill priority className="" sizes="100vw" />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-primary-800/90 to-primary-800/50" />
      </div>

      {/* ── Headlines ── */}
      <div className="flex flex-col items-center gap-2 text-center sm:gap-4">
        <h1
          id="hero-heading"
          className="max-w-6xl text-2xl font-bold tracking-wider text-primary-100 sm:text-3xl md:text-5xl lg:text-h1"
        >
          {t("hero.headline")}
        </h1>
        <p className="max-w-5xl text-sm font-bold tracking-wide text-primary-300 sm:text-base md:text-xl lg:text-2xl">
          {t("hero.subheadline")}
        </p>
      </div>

      {/* ── Trust Badges ── */}
      <div
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 md:gap-12"
        aria-label={t("hero.trust.aria_label")}
      >
        {trustBadges.map(({ key, label, Icon }) => (
          <div
            key={key}
            className="flex items-center gap-2 sm:gap-2 sm:rounded-2xl sm:bg-white/5 sm:px-4 sm:py-3 md:gap-4 md:px-6 md:py-4"
          >
            <Icon className="size-5 text-secondary-500 sm:size-8" />
            <span className="text-[10px] font-normal tracking-wide text-secondary-50 sm:text-xs md:text-lg rtl:mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Search Bar (Client Component) ── */}
      <SearchContainer
        searchPlaceholder={t("hero.search.placeholder")}
        locationLabel={t("hero.search.location_label")}
        searchLabel={t("hero.search.button_label")}
        dropdownContent={
          <SearchDropdown
            recentLabel={t("hero.search.recent_searches")}
            suggestionsLabel={t("hero.search.suggestions")}
          />
        }
      />

      {/* ── Trending Searches (Server + Suspense) ── */}
      <TrendingSearchesWrapper tags={trendingTags} mostSearchedLabel={t("hero.trending.label")} />
    </section>
  );
}

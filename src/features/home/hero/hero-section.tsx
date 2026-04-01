import Image from "next/image";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";
import { SearchContainer } from "@/features/home/hero/search-container";
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
    { label: t("hero.trending.iphone_15_pro"), href: "#" },
    { label: t("hero.trending.airpods"), href: "#" },
    { label: t("hero.trending.apple_watch"), href: "#" },
    { label: t("hero.trending.rolex"), href: "#" },
  ];

  return (
    <section
      className="relative flex min-h-[610px] w-full flex-col items-center justify-center gap-10 overflow-hidden px-4 py-8 3xl:min-h-[800px]"
      aria-labelledby="hero-heading"
    >
      {/* ── Background Image (LCP-priority) ── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src="/img/home/hero.png" alt="" fill priority className="" sizes="100vw" />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-primary-800/90 to-primary-800/50" />
      </div>

      {/* ── Headlines ── */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1
          id="hero-heading"
          className="max-w-6xl text-5xl font-bold tracking-wider text-primary-100 md:text-h1"
        >
          {t("hero.headline")}
        </h1>
        <p className="max-w-5xl text-2xl font-bold tracking-wide text-primary-300">
          {t("hero.subheadline")}
        </p>
      </div>

      {/* ── Trust Badges ── */}
      <div
        className="flex flex-wrap items-center justify-center gap-12"
        aria-label={t("hero.trust.aria_label")}
      >
        {trustBadges.map(({ key, label, Icon }) => (
          <div key={key} className="flex items-center gap-4 rounded-2xl bg-white/5 px-6 py-4">
            <Icon className="size-8 text-secondary-500" />
            <span className="text-lg font-normal tracking-wide text-secondary-50 rtl:mt-1">
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
      />

      {/* ── Trending Searches (Server + Suspense) ── */}
      <TrendingSearchesWrapper tags={trendingTags} mostSearchedLabel={t("hero.trending.label")} />
    </section>
  );
}

import * as React from "react";
import type { Locale } from "@/lib/i18n/config";
import { AuctionLiveHero } from "@/features/home/auctions-live/auction-live-hero";
import { AuctionPromos } from "@/features/home/auctions-live/auction-promos";

interface AuctionsSectionProps {
  locale: Locale;
}

/**
 * AuctionsSection — Server Component
 *
 * Figma node 706:7621 — outer wrapper, p-[56px] gap-[32px]
 * Contains:
 *   1. AuctionLiveHero  (node 1105:8136)
 *   2. AuctionPromos    (node 949:15341)
 */
export function AuctionsSection({ locale }: AuctionsSectionProps) {
  return (
    <section
      aria-labelledby="auctions-heading"
      className="flex w-full flex-col gap-4 py-10 md:py-14"
    >
      <AuctionLiveHero locale={locale} />
      <AuctionPromos locale={locale} />
    </section>
  );
}

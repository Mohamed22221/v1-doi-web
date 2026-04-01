import * as React from "react";
import type { Locale } from "@/lib/i18n/config";
import { AuctionInfo } from "@/features/home/auctions-live/auction-info";
import { AuctionCardsList } from "@/features/home/auctions-live/auction-cards-list";
import { PageContainer } from "@/components/template/container/page-container";

interface AuctionLiveHeroProps {
  locale: Locale;
}

/**
 * AuctionLiveHero - Server Component
 *
 * Figma node 1105:8136 — bg: #edf1f7, rounded-3xl, gap-8
 * Layout (RTL):  [Cards: flex-1] [Info: w-[450px]]
 * On mobile: stacked column, Info on top.
 */
export function AuctionLiveHero({ locale }: AuctionLiveHeroProps) {
  return (
    <PageContainer variant="dashboard" className="w-full overflow-hidden">
      <div className="flex flex-col gap-2 rounded-3xl bg-primary-50 px-6 py-6 lg:flex-row lg:items-center lg:py-8 dark:bg-primary-800">
        {/* INFO PANEL — right side on RTL (renders second in DOM = end of flex row LTR, start of flex row RTL) */}
        {/* On mobile: comes first visually */}
        <div className="w-full shrink-0 lg:w-[420px]">
          <AuctionInfo locale={locale} />
        </div>

        {/* CARDS / CAROUSEL — left side on RTL, bleeds off the edge */}
        {/* negative margin on the start side lets cards bleed outside the container */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="lg:ms-0 lg:w-full">
            <AuctionCardsList locale={locale} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

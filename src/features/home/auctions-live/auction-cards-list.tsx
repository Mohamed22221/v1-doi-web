import * as React from "react";

import type { Locale } from "@/lib/i18n/config";
import { getDirection } from "@/lib/i18n/config";
import { AuctionCarousel } from "@/features/home/auctions-live/auction-carousel";
import { AuctionCard } from "@/features/home/auctions-live/auction-card";
import { CarouselItem } from "@/components/ui/carousel";

interface AuctionCardsListProps {
  locale: Locale;
}

/**
 * AuctionCardsList - Server Component
 *
 * Fetches the upcoming live auctions data (mocked) and maps them cleanly into
 * `<AuctionCard>` Server Components, feeding them safely into the client carousel string.
 */
export async function AuctionCardsList({ locale }: AuctionCardsListProps) {
  // const { t } = await getTranslation(locale, "home");
  const dir = getDirection(locale);

  const mockAuctions = [
    {
      id: "auc-01",
      title: "لابتوب ماك بوك برو M3",
      timeLabel: "04:30 م",
      imageUrl: "/img/authentication-start.png", // Adjust to valid static asset later
      orderNumber: "01",
    },
    {
      id: "auc-02",
      title: "سماعات آبل إيربودز اللاسلكية",
      timeLabel: "05:00 م",
      imageUrl: "/img/grid-home-1.png",
      orderNumber: "02",
    },
    {
      id: "auc-03",
      title: "دراجة نارية هارلي ديفيدسون الرياضية",
      timeLabel: "06:15 م",
      imageUrl: "/img/auth_illustration.png",
      orderNumber: "03",
    },
    {
      id: "auc-04",
      title: "دراجة نارية هارلي ديفيدسون الرياضية",
      timeLabel: "06:15 م",
      imageUrl: "/img/home/fake-category-img.gif",
      orderNumber: "04",
    },
  ];

  return (
    <AuctionCarousel localeDir={dir}>
      {mockAuctions.map((auction) => (
        <CarouselItem key={auction.id} className="basis-auto">
          <AuctionCard {...auction} />
        </CarouselItem>
      ))}
    </AuctionCarousel>
  );
}

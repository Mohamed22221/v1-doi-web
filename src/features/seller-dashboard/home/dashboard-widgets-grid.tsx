import { AuctionCard } from "./auction-card";
import type { AuctionCardItem } from "./auction-card";
import { ActiveAuctionsWidget } from "./active-auctions-widget";
import { BuyerRatingsWidget } from "./buyer-ratings-widget";
import { WidgetHeader } from "../components/widget-header";

interface DashboardWidgetsGridProps {
  activeAuctions: {
    title: string;
    viewAllLabel: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  buyerRatings: {
    title: string;
    viewAllLabel: string;
    ratingCount: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
}

/**
 * Mock data — replace with a real fetch when the API is ready.
 * Set to [] to preview the empty state.
 */
const MOCK_AUCTIONS: AuctionCardItem[] = [
  {
    id: "1",
    title: "لابتوب MacBook Pro 2023",
    price: 1000,
    remainingSeconds: 2 * 3600 + 59 * 60 + 59,
    imageSrc: "/img/fake/fake-auction.jpg",
    imageAlt: "لابتوب MacBook Pro 2023",
    timerLabel: "الوقت المتبقي للمزاد الأول",
    viewHref: "#",
    viewLabel: "عرض سريع للابتوب",
  },
  {
    id: "2",
    title: "سماعات AirPods Pro",
    price: 2000,
    remainingSeconds: 2 * 3600 + 59 * 60 + 59,
    imageSrc: "/img/fake/fake-auction.jpg",
    imageAlt: "سماعات AirPods Pro",
    timerLabel: "الوقت المتبقي للمزاد الثاني",
    viewHref: "#",
    viewLabel: "عرض سريع للسماعات",
  },
];

/**
 * DashboardWidgetsGrid
 *
 * Lays out the seller dashboard secondary widgets side-by-side on desktop
 * and stacked on mobile.
 *
 * Active Auctions:
 *   – MOCK_AUCTIONS has items → renders the responsive cards grid.
 *   – MOCK_AUCTIONS is empty  → delegates to ActiveAuctionsWidget (empty state).
 */
export function DashboardWidgetsGrid({ activeAuctions, buyerRatings }: DashboardWidgetsGridProps) {
  return (
    <section aria-label="Dashboard Widgets" className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* ── Active Auctions ── */}
      <div>
        <WidgetHeader
          title={activeAuctions.title}
          viewAllLabel={activeAuctions.viewAllLabel}
          viewAllHref="#"
          showStatus={true}
        />

        {MOCK_AUCTIONS.length > 0 ? (
          <section
            aria-label="المزادات النشطة"
            className="max-md:card mt-2 grid grid-cols-1 gap-3 md:mt-[20px] md:grid-cols-2"
          >
            {MOCK_AUCTIONS.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <ActiveAuctionsWidget {...activeAuctions} />
        )}
      </div>

      {/* ── Buyer Ratings ── */}
      <div>
        <WidgetHeader
          title={buyerRatings.title}
          viewAllLabel={buyerRatings.viewAllLabel}
          viewAllHref="#"
          showStatus={false}
        />
        <BuyerRatingsWidget {...buyerRatings} />
      </div>
    </section>
  );
}

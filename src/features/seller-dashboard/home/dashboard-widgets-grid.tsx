import { WidgetHeader } from "../components/widget-header";
import { ActiveAuctionsWidget } from "./active-auctions-widget";
import { BuyerRatingsWidget } from "./buyer-ratings-widget";

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
 * DashboardWidgetsGrid
 * Lays out the seller dashboard secondary widgets side-by-side on desktop
 */
export function DashboardWidgetsGrid({ activeAuctions, buyerRatings }: DashboardWidgetsGridProps) {
  return (
    <section aria-label="Dashboard Widgets" className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <WidgetHeader
          title={activeAuctions.title}
          viewAllLabel={activeAuctions.viewAllLabel}
          viewAllHref={"#"}
          showStatus={true}
        />
        <ActiveAuctionsWidget {...activeAuctions} />
      </div>

      <div>
        <WidgetHeader
          title={buyerRatings.title}
          viewAllLabel={buyerRatings.viewAllLabel}
          viewAllHref={"#"}
          showStatus={false}
        />
        <BuyerRatingsWidget {...buyerRatings} />
      </div>
    </section>
  );
}

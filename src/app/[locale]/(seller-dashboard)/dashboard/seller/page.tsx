import { Suspense } from "react";
import type { Metadata } from "next";

import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { SellerGreeting } from "@/features/seller-dashboard/home/seller-greeting";
import { SellerGreetingSkeleton } from "@/features/seller-dashboard/components/skeleton/home/seller-greeting-skeleton";
import { StatsGrid } from "@/features/seller-dashboard/home/stats-grid";
import { ActionsBar } from "@/features/seller-dashboard/home/actions-bar";
import { DashboardWidgetsGrid } from "@/features/seller-dashboard/home/dashboard-widgets-grid";
import { SELLER_STATS, SELLER_ACTIONS } from "@/features/seller-dashboard/home/mock-data";
import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generates metadata for the seller dashboard.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale,
    pageKey: "seller-dashboard",
    pathname: "/dashboard/seller",
  });
}

/**
 * Fetches data for the seller greeting section.
 * Returns a promise to avoid blocking the initial PPR shell.
 */
async function getGreetingData(locale: Locale) {
  // Simulate API call delay on the server
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { t } = await getTranslation(locale, "home");

  const name = "أحمد";
  const location = "الرياض، حي النخيل، شارع التخصصي";

  return {
    greeting: t("seller_dashboard.greeting", { name }),
    location,
    changeLocationLabel: t("seller_dashboard.change_location", { location }),
  };
}

/**
 * SellerDashboardPage
 *
 * Orchestrates the seller home dashboard using optimized Cache Components.
 * Leverage Partial Prerendering (PPR) for static shells and streaming dynamic content.
 */
export default async function SellerDashboardPage({ params, searchParams: _searchParams }: PageProps) {
  const { locale } = await params;

  // Initiate data fetching without awaiting it here
  const greetingDataPromise = getGreetingData(locale);

  // Fetch translations for stats and actions
  const { t } = await getTranslation(locale, "home");

  // Map translations to stats and actions
  const translatedStats = SELLER_STATS.map((stat) => ({
    ...stat,
    title: t(`seller_dashboard.stats.${stat.id}.title`),
    subtitle: stat.subtitle
      ? typeof stat.subtitle === "string"
        ? t(`seller_dashboard.stats.${stat.id}.subtitle`)
        : stat.subtitle
      : undefined,
  }));

  const translatedActions = SELLER_ACTIONS.map((action) => ({
    ...action,
    label: t(`seller_dashboard.quick_actions.${action.id}`),
  }));

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <Suspense fallback={<SellerGreetingSkeleton />}>
        <SellerGreeting dataPromise={greetingDataPromise} />
      </Suspense>
      <StatsGrid stats={translatedStats} ariaLabel={t("seller_dashboard.stats.aria_label")} />
      <ActionsBar
        actions={translatedActions}
        ariaLabel={t("seller_dashboard.quick_actions.aria_label")}
      />
      <DashboardWidgetsGrid
        activeAuctions={{
          title: t("seller_dashboard.active_auctions.title"),
          viewAllLabel: t("seller_dashboard.active_auctions.view_all"),
          emptyTitle: t("seller_dashboard.active_auctions.empty_title"),
          emptySubtitle: t("seller_dashboard.active_auctions.empty_subtitle"),
        }}
        buyerRatings={{
          title: t("seller_dashboard.buyer_ratings.title"),
          viewAllLabel: t("seller_dashboard.buyer_ratings.view_all"),
          ratingCount: t("seller_dashboard.buyer_ratings.rating_count", { count: 0 }),
          emptyTitle: t("seller_dashboard.buyer_ratings.empty_title"),
          emptySubtitle: t("seller_dashboard.buyer_ratings.empty_subtitle"),
        }}
      />
    </div>
  );
}

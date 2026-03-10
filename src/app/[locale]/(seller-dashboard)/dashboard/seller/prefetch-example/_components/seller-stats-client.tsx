"use client";

import { useSellerDashboardStats } from "@/api/hooks/use-seller";

/**
 * Client Component — reads from the HydrationBoundary cache on first render.
 * Zero loading state on initial page load; background refetch after staleTime.
 */
export function SellerStatsClient() {
  const { data, isPending, isError } = useSellerDashboardStats();

  if (isPending) {
    return (
      <div aria-busy="true" aria-label="Loading seller statistics">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || !data) {
    return <p role="alert">Failed to load dashboard statistics.</p>;
  }

  return (
    <section aria-label="Seller Dashboard Statistics">
      <dl>
        <div>
          <dt>Active Auctions</dt>
          <dd>{data.active_auctions}</dd>
        </div>
        <div>
          <dt>Total Revenue</dt>
          <dd>{data.total_revenue}</dd>
        </div>
        <div>
          <dt>Avg Buyer Rating</dt>
          <dd>{data.buyer_ratings_avg}</dd>
        </div>
        <div>
          <dt>Completed Auctions</dt>
          <dd>{data.completed_auctions}</dd>
        </div>
      </dl>
    </section>
  );
}

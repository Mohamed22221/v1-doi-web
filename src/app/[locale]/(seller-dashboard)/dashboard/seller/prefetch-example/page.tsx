import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/api/query-client";
import { getSellerDashboardStats } from "@/api/services/seller-service";
import ReactQueryKeys from "@/api/constants/apikeys.constant";
import type { Locale } from "@/lib/i18n/config";
import { SellerStatsClient } from "./_components/seller-stats-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Server Component — runs at request time.
 * Prefetches seller stats so the Client Component gets instant data
 * via HydrationBoundary (no loading spinner on first paint).
 *
 * staleTime of 5 s in QueryClient prevents TanStack Query from
 * immediately refetching upon hydration.
 */
export default async function SellerDashboardPrefetchExample({ params }: PageProps) {
  const { locale } = await params;
  const queryClient = getQueryClient();

  // Prefetch on the server — data lands in the dehydrated cache
  await queryClient.prefetchQuery({
    queryKey: [ReactQueryKeys.GET_SELLER_DETAILS],
    queryFn: () => getSellerDashboardStats(locale as Locale),
  });

  return (
    // HydrationBoundary transfers the server cache to the client
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/*
       * SellerStatsClient is a Client Component that calls useSellerDashboardStats().
       * On first render it reads from the hydrated cache — zero network calls.
       * After staleTime expires it will silently refetch in the background.
       */}
      <SellerStatsClient />
    </HydrationBoundary>
  );
}

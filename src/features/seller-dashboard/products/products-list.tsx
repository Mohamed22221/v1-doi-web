"use client";

import { useQueryStates, parseAsString } from "nuqs";
import { type Locale } from "@lib/i18n/config";
import { useSellerProductsInfiniteQuery } from "@api/hooks/use-seller-products";
import type { ProductEffectiveStatus } from "@api/types/seller-product";
import ProductCard from "./product-card";
import ProductCardSkeleton, { ProductCardSkeletonGrid } from "./product-card-skeleton";
import EmptyProductsState from "./empty-products-state";
import ErrorProductsState from "./error-products-state";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProductsListProps {
  locale: Locale;
  searchParams?: Record<string, string | string[] | undefined>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ProductsList
 *
 * A client-side component that fetches and renders seller products with infinite scroll.
 * Uses nuqs for filter synchronization and react-intersection-observer for early fetching.
 */
export default function ProductsList({ locale, searchParams }: ProductsListProps) {
  // Sync with productSellType and status from URL using nuqs
  const [query] = useQueryStates({
    productSellType: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  // Use props during SSR to ensure consistency with RSC prefetch
  const isServer = typeof window === "undefined";
  const productSellType = isServer
    ? (searchParams?.productSellType as string) || ""
    : query.productSellType;

  const status = isServer
    ? (searchParams?.status as ProductEffectiveStatus) || ""
    : (query.status as ProductEffectiveStatus);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    refetch,
  } = useSellerProductsInfiniteQuery({
    productSellType: productSellType || undefined,
    status: status || undefined,
    limit: 10,
  });

  // Intersection Observer for Early Fetching (400px before bottom)
  const { ref: sentinelRef, inView } = useInView({
    rootMargin: "400px",
    threshold: 0,
  });

  // Trigger next page fetch when sentinel enters the trigger zone
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ─── Render States ───────────────────────────────────────────────────────

  // Show skeleton during first load
  if (isLoading) {
    return <ProductCardSkeletonGrid count={10} />;
  }

  // Handle Error state
  if (isError) {
    return (
      <ErrorProductsState
        locale={locale}
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => refetch()}
      />
    );
  }

  // Handle empty state (using data.pages[0] as the source for truth)
  const allProducts = data?.pages.flatMap((page) => page.items) || [];
  if (allProducts.length === 0) {
    return (
      <EmptyProductsState
        locale={locale}
        productSellType={productSellType || undefined}
        status={status || undefined}
      />
    );
  }

  // Calculate skeletons for the next page (capped at 10 or remaining items)
  const total = data?.pages[0]?.total || 0;
  const remaining = Math.min(10, total - allProducts.length);
  const skeletonsCount = Math.max(0, remaining);

  return (
    <div className="flex flex-col">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 md:gap-x-4 md:gap-y-7 md:px-0 lg:grid-cols-3 3xl:grid-cols-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}

        {/* Seamless Skeleton Loading (Appended inside the grid) */}
        {isFetchingNextPage &&
          Array.from({ length: skeletonsCount }).map((_, i) => (
            <ProductCardSkeleton key={`next-page-skeleton-${i}`} />
          ))}
      </div>

      {/* Loading Sentinel */}
      <div className="py-4">{hasNextPage && <div ref={sentinelRef} className="h-20 w-full" />}</div>
    </div>
  );
}

"use client";

import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { type Locale } from "@lib/i18n/config";
import { useSellerProductsQuery } from "@api/hooks/use-seller-products";
import ProductCard from "./product-card";
import { ProductCardSkeletonGrid } from "./product-card-skeleton";
import EmptyProductsState from "./empty-products-state";

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
 * A client-side component that fetches and renders seller products.
 * Uses nuqs for instant synchronization with filter parameters.
 */
export default function ProductsList({ locale, searchParams }: ProductsListProps) {
  // Sync with productSellType and page from URL using nuqs
  const [query] = useQueryStates({
    productSellType: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
  });

  // Use props during SSR to ensure consistency with RSC prefetch
  const isServer = typeof window === "undefined";
  const productSellType = isServer
    ? (searchParams?.productSellType as string) || ""
    : query.productSellType;
  const page = isServer ? Number(searchParams?.page) || 1 : query.page;

  const { data, isLoading, isFetching } = useSellerProductsQuery({
    productSellType: (productSellType as string) || undefined,
    page,
    limit: 10,
  });

  // ─── Render States ───────────────────────────────────────────────────────

  // Show skeleton during first load, when switching filters, or when fetching new data
  // With nuqs shallow updates, isFetching will trigger immediately
  if (isLoading || (isFetching && !data)) {
    return <ProductCardSkeletonGrid count={10} />;
  }

  // Handle empty state
  if (!data?.items || data.items.length === 0) {
    return <EmptyProductsState locale={locale} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 md:gap-x-4 md:gap-y-7 md:px-0 lg:grid-cols-3 3xl:grid-cols-4">
      {data.items.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
}

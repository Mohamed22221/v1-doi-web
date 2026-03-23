import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import { getQueryClient } from "@/lib/api/query-client";
import { getSellerProductsAction } from "@/lib/api/actions/products";
import ReactQueryKeys from "@/lib/api/constants/api-keys-constant";
import type { ProductEffectiveStatus, SellerProductsFilters } from "@/lib/api/types/seller-product";

import ProductsHeader from "@/features/seller-dashboard/products/products-header";
import ProductsFilter from "@/features/seller-dashboard/products/products-filter";
import ProductsList from "@/features/seller-dashboard/products/products-list";
import { ProductCardSkeletonGrid } from "@/features/seller-dashboard/products/product-card-skeleton";

interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generates metadata for the seller products page.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale,
    pageKey: "seller-products",
    pathname: "/dashboard/seller/products",
  });
}

/**
 * SellerProductsPage
 *
 * Orchestrates the seller products page using SSR prefetching and client-side hydration.
 */
export default async function SellerProductsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const sParams = await searchParams;

  // Fetch translation resources for client-side hydration
  const { t } = await getTranslation(locale, "seller-dashboard");

  const filterLabels = {
    all: t("products.filter.all"),
    fixed_price: t("products.filter.fixed_price"),
    period_auction: t("products.filter.period_auction"),
    auctions: t("products.filter.auctions"),
    draft: t("products.filter.draft"),
    pending_approval: t("products.filter.pending_approval"),
  };

  const productSellType = (sParams.productSellType as string) || undefined;
  const status = (sParams.status as ProductEffectiveStatus) || undefined;
  const page = Number(sParams.page) || 1;
  const filters: SellerProductsFilters = { productSellType, status, page, limit: 10 };

  // Prefetch data on the server
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ReactQueryKeys.SELLER_PRODUCTS.list(filters),
    queryFn: async () => {
      const result = await getSellerProductsAction(filters);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-3 rounded-xl bg-card py-4 md:gap-6 md:bg-transparent md:py-0">
        {/* Header & Filter Area - Transparent on desktop for background contrast */}
        <div className="flex flex-col gap-3 md:gap-6">
          <ProductsHeader locale={locale} searchParams={sParams} />
          <ProductsFilter locale={locale} labels={filterLabels} />
        </div>

        {/* Main Content Area - Continuous in mobile, Sectioned in desktop */}
        <div className="flex-1 md:rounded-xl md:bg-card md:p-4 lg:p-6">
          <Suspense fallback={<ProductCardSkeletonGrid count={10} />}>
            <ProductsList locale={locale} searchParams={sParams} />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
}

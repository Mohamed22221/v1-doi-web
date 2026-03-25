import { Suspense } from "react";

import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import ProductsHeader from "@/features/seller-dashboard/products/products-header";
import ProductsFilter from "@/features/seller-dashboard/products/products-filter";
import { ProductCardSkeletonGrid } from "@/features/seller-dashboard/products/product-card-skeleton";
import PrefetchedProductsList from "@/features/seller-dashboard/products/prefetched-products-list";

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

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card py-4 md:gap-6 md:bg-transparent md:py-0">
      {/* Header & Filter Area - Transparent on desktop for background contrast */}
      <div className="flex flex-col gap-3 md:gap-6">
        <ProductsHeader locale={locale} />
        <ProductsFilter locale={locale} labels={filterLabels} />
      </div>

      {/* Main Content Area - Continuous in mobile, Sectioned in desktop */}
      <div className="flex-1 text-card-foreground md:rounded-xl md:bg-card md:p-4 lg:p-6">
        <Suspense fallback={<ProductCardSkeletonGrid count={10} />}>
          <PrefetchedProductsList locale={locale} searchParamsPromise={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

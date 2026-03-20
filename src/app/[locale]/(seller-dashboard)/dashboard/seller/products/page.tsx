import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import ProductsHeader from "@/features/seller-dashboard/products/products-header";
import ProductsFilter from "@/features/seller-dashboard/products/products-filter";
import EmptyProductsState from "@/features/seller-dashboard/products/empty-products-state";

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
    pageKey: "seller-dashboard",
    pathname: "/dashboard/seller/products",
  });
}

/**
 * SellerProductsPage
 *
 * Orchestrates the seller products page using optimized Cache Components.
 * Leverage Partial Prerendering (PPR).
 */
export default async function SellerProductsPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "home");

  const filterLabels = {
    all: t("seller_dashboard.products_filter.all"),
    auction: t("seller_dashboard.products_filter.auction"),
    fixed: t("seller_dashboard.products_filter.fixed"),
    draft: t("seller_dashboard.products_filter.draft"),
    pending: t("seller_dashboard.products_filter.pending"),
    sold: t("seller_dashboard.products_filter.sold"),
  };

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <ProductsHeader locale={locale} />
      <ProductsFilter locale={locale} labels={filterLabels} />
      <EmptyProductsState />
      {/* Products list will go here */}
    </div>
  );
}

import { Suspense } from "react";

import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import ProductsHeader from "@/features/seller-dashboard/products/products-header";
import ProductsFilter from "@/features/seller-dashboard/products/products-filter";
import EmptyProductsState from "@/features/seller-dashboard/products/empty-products-state";
import ProductCard from "@/features/seller-dashboard/products/product-card";
import { ProductCardSkeletonGrid } from "@/features/seller-dashboard/products/product-card-skeleton";
import { type SellerProduct } from "@/lib/api/types/seller-product";

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

  // Mock data for Phase 1 UI demonstration
  const mockProducts: SellerProduct[] = [
    {
      id: "1",
      title: "Handmade Ceramic Vase",
      category: "Home Decor",
      price: 150,
      imageUrl: "/img/fake/fake-auction.jpg",
      status: "active",
    },
    {
      id: "2",
      title: "Leather Wallet - Minimalist",
      category: "Accessories",
      price: 85,
      imageUrl: null,
      status: "pending",
    },
    {
      id: "3",
      title: "Vintage Camera Strap",
      category: "Photography",
      price: 45,
      imageUrl: null,
      status: "rejected",
    },
    {
      id: "4",
      title: "MacBook Pro 2021",
      category: "Electronics",
      price: 4500,
      imageUrl: null,
      status: "sold",
    },
    {
      id: "5",
      title: "Samsung Galaxy S23",
      category: "Electronics",
      price: 1200,
      imageUrl: null,
      status: "inactive",
    },
  ];

  const isEmpty = mockProducts.length === 0;

  return (
    <div className="">
      <div className="flex flex-col gap-3 rounded-xl bg-card py-4 md:gap-6 md:bg-transparent md:py-0">
        {/* Header & Filter Area - Transparent on desktop for background contrast */}
        <div className="flex flex-col gap-3 md:gap-6">
          <ProductsHeader locale={locale} />
          <ProductsFilter locale={locale} labels={filterLabels} />
        </div>

        {/* Main Content Area - Continuous in mobile, Sectioned in desktop */}
        <div className="flex-1 md:rounded-xl md:bg-card md:p-4 lg:p-6">
          {isEmpty ? (
            <EmptyProductsState locale={locale} />
          ) : (
            <Suspense fallback={<ProductCardSkeletonGrid count={6} />}>
              <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 md:gap-x-4 md:gap-y-7 md:px-0 lg:grid-cols-3 3xl:grid-cols-4">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} />
                ))}
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

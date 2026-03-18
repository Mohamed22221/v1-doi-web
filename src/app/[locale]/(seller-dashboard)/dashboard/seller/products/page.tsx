import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/i18n/config";
import ProductsHeader from "@/features/seller-dashboard/products/products-header";

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

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <ProductsHeader locale={locale} />
      {/* Products list will go here */}
    </div>
  );
}

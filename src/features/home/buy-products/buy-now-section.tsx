import * as React from "react";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";
import { SectionTitle } from "@/features/home/components/section-title";
import { ProductList } from "@/features/home/buy-products/product-list";
import { BuyNowSkeleton } from "@/features/home/buy-products/product-skeleton";
import { PageContainer } from "@/components/template/container/page-container";

interface BuyNowSectionProps {
  locale: Locale;
}

/**
 * BuyNowSection — PPR Section (Partial Prerendering)
 *
 * Figma node 706:7936 — "لا تنتظر، اشترِ الآن!" section.
 *
 * Architecture:
 *   - STATIC: <SectionTitle> with "View All" link — rendered at build time.
 *   - DYNAMIC: <ProductList> wrapped in <Suspense> — streams in on request.
 *
 * PPR Strategy:
 *   - Section wrapper + SectionTitle = static shell (instant render).
 *   - ProductList = dynamic hole (Server fetch, streamed with Skeleton fallback).
 *
 * Spacing: py-10 md:py-14 — consistent with CategoriesSection + AuctionsSection.
 */
export async function BuyNowSection({ locale }: BuyNowSectionProps) {
  const { t } = await getTranslation(locale, "home");

  return (
    <PageContainer aria-labelledby="buy-now-heading" className="py-3 md:py-8">
      {/* ── STATIC: Section Header ──────────────────────────────────────── */}
      <SectionTitle
        id="buy-now-heading"
        title={t("buyNow.title")}
        viewAllLabel={t("buyNow.viewAll")}
        viewAllHref="/products"
      />

      {/* ── DYNAMIC: Product Grid (PPR streaming hole) ──────────────────── */}
      <React.Suspense fallback={<BuyNowSkeleton />}>
        <ProductList locale={locale} />
      </React.Suspense>
    </PageContainer>
  );
}

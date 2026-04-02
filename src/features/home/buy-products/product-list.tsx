import Link from "next/link";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";
import { Riyall } from "@/components/shared/icon-base/constant";
import { ProductCardCarousel } from "./components/product-card-carousel";

/** ── Figma image assets (node 706:7936) ─────────────────────────────── */
const imgWatch = "/img/fake/Container.png";
const imgSpeaker = "/img/fake/Container2.png";
const imgPhone = "/img/fake/Container.png";

/** ── Mock data (replace with apiClient/Server Action when API is ready) ── */
const MOCK_PRODUCTS = [
  {
    id: "1",
    images: [imgWatch, imgSpeaker, imgPhone],
    titleAr: "ساعة Apple Watch Series 9",
    titleEn: "Apple Watch Series 9",
    price: "2,000",
    href: "/products/1",
  },
  {
    id: "2",
    images: [imgSpeaker, imgPhone, imgWatch],
    titleAr: "سماعات Apple AirPods Pro",
    titleEn: "Apple AirPods Pro",
    price: "2,000",
    href: "/products/2",
  },
  {
    id: "3",
    images: [imgPhone, imgWatch, imgSpeaker],
    titleAr: "iPhone 15 Pro – 128GB – أزرق",
    titleEn: "iPhone 15 Pro – 128GB – Blue",
    price: "2,000",
    href: "/products/3",
  },
];

interface ProductListProps {
  locale: Locale;
}

/**
 * ProductList — Server Component (dynamic hole for PPR).
 *
 * Figma node 706:7940 — 3-column grid of product cards.
 * Each card: 300px image + title + price/CTA bar.
 *
 * Layout:
 *   - 1 col on mobile
 *   - 2 cols on sm
 *   - 3 cols on lg+
 */
export async function ProductList({ locale }: ProductListProps) {
  const { t } = await getTranslation(locale, "home");

  const isArabic = locale === "ar";
  const buyLabel = t("buyNow.buyButton");

  return (
    <div aria-live="polite" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {MOCK_PRODUCTS.map((product, index) => {
        const title = isArabic ? product.titleAr : product.titleEn;

        return (
          <article
            key={product.id}
            aria-labelledby={`buy-product-title-${product.id}`}
            className={`group flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow hover:shadow-md sm:gap-6 sm:p-4 ${
              index >= 2 ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* ── Product Image Carousel (Client Component) ── */}
            <ProductCardCarousel images={product.images} title={title} locale={locale} />

            {/* ── Product title ── */}
            <h3
              id={`buy-product-title-${product.id}`}
              className="text-xs font-bold tracking-wide text-foreground sm:text-xl"
            >
              <Link
                href={product.href}
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {title}
              </Link>
            </h3>

            {/* ── Price + CTA bar ── */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-2 sm:rounded-2xl sm:p-4">
              {/* CTA link */}
              <Link
                href={product.href}
                className="text-[10px] font-normal tracking-wide text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:text-lg"
              >
                {buyLabel}
              </Link>

              {/* Price with Riyal symbol */}
              <div className="flex items-center gap-1 sm:gap-2" dir="rtl">
                <span className="text-tag font-semibold text-foreground sm:text-2xl">
                  {product.price}
                </span>

                <span className="relative inline-block h-4 w-3.5 shrink-0 sm:h-8 sm:w-7">
                  <Riyall className="size-4 sm:size-6" />
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

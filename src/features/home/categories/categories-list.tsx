import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { getDirection } from "@/lib/i18n/config";
import { CategoriesCarousel } from "@/features/home/categories/categories-carousel";
import { CarouselItem } from "@/components/ui/carousel";

interface CategoriesListProps {
  locale: Locale;
}

/**
 * CategoriesList - Server Component (Dynamic)
 * 
 * Simulated fetch for categories data. Passes fully Server-Rendered 
 * `<Link>` items into the Client `<CategoriesCarousel>` wrapper.
 */
export async function CategoriesList({ locale }: CategoriesListProps) {
  // Simulate network delay for Suspense demonstration (remove in prod)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { t } = await getTranslation(locale, "home");
  const dir = getDirection(locale);

  // Derived from Figma nodes (node-id: 706-7588)
  const categories = [
    { id: "electronics", label: t("categories.items.electronics"), href: `/${locale}/category/electronics` },
    { id: "fashion", label: t("categories.items.fashion"), href: `/${locale}/category/fashion` },
    { id: "home", label: t("categories.items.home"), href: `/${locale}/category/home` },
    { id: "collectibles", label: t("categories.items.collectibles"), href: `/${locale}/category/collectibles` },
    { id: "sports", label: t("categories.items.sports"), href: `/${locale}/category/sports` },
    { id: "toys", label: t("categories.items.toys"), href: `/${locale}/category/toys` },
    { id: "motors", label: t("categories.items.motors"), href: `/${locale}/category/motors` },
    { id: "health", label: t("categories.items.health"), href: `/${locale}/category/health` },
  ];

  return (
    <CategoriesCarousel localeDir={dir}>
      {categories.map((category) => (
        <CarouselItem key={category.id} className="basis-auto ps-0">
          <Link
            href={category.href}
            className="flex flex-col items-center gap-4 rounded-2xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {/* The circular image container (160x160) */}
            <div className="flex size-[160px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100 dark:bg-card dark:group-hover:bg-card/70">
              <div className="relative size-[110px] shrink-0">
                <Image
                  src="/img/home/fake-category-img.gif"
                  alt={category.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="110px"
                />
              </div>
            </div>
            {/* Category text (20px) */}
            <span className="text-xl font-medium tracking-wide text-foreground">
              {category.label}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </CategoriesCarousel>
  );
}

import * as React from "react";
import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { getDirection } from "@/lib/i18n/config";
import { CategoriesCarousel } from "@/features/home/categories/categories-carousel";
import { CarouselItem } from "@/components/ui/carousel";
import { CategoryCard } from "./category-card";

interface CategoriesListProps {
  locale: Locale;
}

/**
 * CategoriesList - Server Component (Dynamic)
 *
 * Simulated fetch for categories data. Passes fully Server-Rendered
 * `<CategoryCard>` items into the Client `<CategoriesCarousel>` wrapper.
 */
export async function CategoriesList({ locale }: CategoriesListProps) {
  // Simulate network delay for Suspense demonstration (remove in prod)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { t } = await getTranslation(locale, "home");
  const dir = getDirection(locale);

  // Derived from Figma nodes (node-id: 706-7588)
  // Animation paths point to the public/animations directory
  const categories = [
    {
      id: "electronics",
      label: t("categories.items.electronics"),
      href: `/${locale}/category/electronics`,
      animationPath: "/animations/wired-flat-1736-smart-tv-layout-interface-hover-pinch.json",
    },
    {
      id: "fashion",
      label: t("categories.items.fashion"),
      href: `/${locale}/category/fashion`,
      animationPath: "/animations/wired-flat-243-glasses-eye-blink-hover-searching.json",
    },
    {
      id: "home",
      label: t("categories.items.home"),
      href: `/${locale}/category/home`,
      animationPath: "/animations/wired-flat-1608-sofa-hover-pinch.json",
    },
    {
      id: "collectibles",
      label: t("categories.items.collectibles"),
      href: `/${locale}/category/collectibles`,
      animationPath: "/animations/wired-flat-1650-chandelier-hover-pinch.json",
    },
    {
      id: "sports",
      label: t("categories.items.sports"),
      href: `/${locale}/category/sports`,
      animationPath: "/animations/wired-flat-430-rugby-ball-hover-pinch.json",
    },
    {
      id: "toys",
      label: t("categories.items.toys"),
      href: `/${locale}/category/toys`,
      animationPath: "/animations/wired-flat-1531-rocking-horse-hover-pinch.json",
    },
    {
      id: "motors",
      label: t("categories.items.motors"),
      href: `/${locale}/category/motors`,
      animationPath: "/animations/wired-flat-497-truck-delivery-hover-pinch.json",
    },
    {
      id: "health",
      label: t("categories.items.health"),
      href: `/${locale}/category/health`,
      animationPath: "/animations/wired-flat-1574-spa-flower-hover-pinch.json",
    },
  ];

  return (
    <CategoriesCarousel localeDir={dir}>
      {categories.map((category) => (
        <CarouselItem key={category.id} className="basis-auto ps-0">
          <CategoryCard
            id={category.id}
            label={category.label}
            href={category.href}
            animationPath={category.animationPath}
          />
        </CarouselItem>
      ))}
    </CategoriesCarousel>
  );
}

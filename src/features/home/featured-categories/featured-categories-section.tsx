import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import { PageContainer } from "@/components/template/container/page-container";
import { SectionTitle } from "@/features/home/components/section-title";
import { FeaturedCategoryCard } from "./category-card";

interface FeaturedCategoriesSectionProps {
  locale: Locale;
}

/**
 * FeaturedCategoriesSection — Server Component
 *
 * Figma node 1109:8829 (Desktop) / 1325:24821 (Mobile)
 * Responsive grid: 4 columns desktop, 2x2 grid mobile.
 */
export async function FeaturedCategoriesSection({ locale }: FeaturedCategoriesSectionProps) {
  const { t } = await getTranslation(locale, "home");

  const categories = [
    {
      id: "cat-games",
      title: t("featuredCategories.games"),
      image: "/img/fake/Container.png", // Replace with real category assets
      href: "/categories/games",
    },
    {
      id: "cat-watches",
      title: t("featuredCategories.watches"),
      image: "/img/fake/Container2.png",
      href: "/categories/watches",
    },
    {
      id: "cat-laptops",
      title: t("featuredCategories.laptops"),
      image: "/img/fake/Container.png",
      href: "/categories/laptops",
    },
    {
      id: "cat-mobiles",
      title: t("featuredCategories.mobiles"),
      image: "/img/fake/Container2.png",
      href: "/categories/mobiles",
    },
  ];

  return (
    <PageContainer aria-labelledby="featured-categories-heading" className="py-6 md:py-10">
      {/* Section Header with Live Badge */}
      <SectionTitle id="featured-categories-heading" title={t("featuredCategories.title")} />

      {/* Grid: 2 columns mobile, 4 columns desktop */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <FeaturedCategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            href={category.href}
          />
        ))}
      </div>
    </PageContainer>
  );
}

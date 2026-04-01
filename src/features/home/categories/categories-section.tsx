import { Suspense } from "react";
import type { Locale } from "@/lib/i18n/config";
import { CategoriesList } from "@/features/home/categories/categories-list";
import { CategoriesSkeleton } from "@/features/home/categories/categories-skeleton";

interface CategoriesSectionProps {
  locale: Locale;
}

/**
 * CategoriesSection - Server Component
 *
 * Top-level entry point orchestrating the heading text and the Suspense
 * boundary for the streaming categories list below it.
 */
export async function CategoriesSection({ locale }: CategoriesSectionProps) {
  return (
    <section
      aria-labelledby="categories-heading"
      className="container mx-auto flex w-full flex-col gap-8 pt-12 pb-8"
    >
      {/* PPR constraint: Stream dynamic fetchers behind a Suspense boundary */}
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesList locale={locale} />
      </Suspense>
    </section>
  );
}

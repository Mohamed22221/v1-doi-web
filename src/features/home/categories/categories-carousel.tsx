"use client";

import * as React from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

interface CategoriesCarouselProps {
  children: React.ReactNode;
  localeDir: "rtl" | "ltr";
}

/**
 * CategoriesCarousel
 *
 * Strict "use client" wrapper around the bare Embla Carousel logic.
 * By keeping this small and accepting children, we can strictly pass
 * fully Server-Rendered `<Link>` tags from `CategoriesList` into the
 * `CarouselContent` without sacrificing SEO.
 *
 * Note: Side arrows are explicitly omitted per the Figma design.
 */
export function CategoriesCarousel({ children, localeDir }: CategoriesCarouselProps) {
  // We use dragFree to allow buttery smooth scrolling without snapping violently
  return (
    <div className="w-full">
      <Carousel
        dir={localeDir}
        opts={{
          direction: localeDir,
          dragFree: true,
          // Removed containScroll: "trimSnaps" to ensure the items natively bleed at the edges without snapping awkwardly
        }}
        // Negative margins pull the carousel beyond the parent's padding, allowing native edge cutoff
        className="w-full"
      >
        <CarouselContent className="gap-4 ps-2 pe-0 sm:gap-6 md:gap-8 md:ps-4 lg:gap-8">
          {children}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

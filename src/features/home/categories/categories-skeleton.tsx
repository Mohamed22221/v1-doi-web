import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

/**
 * CategoriesSkeleton - Server Component
 *
 * Shown as the fallback UI during PPR streaming. Mimics the gap and
 * structure of the exact items from the Figma specs without logic.
 */
export function CategoriesSkeleton() {
  return (
    <div className="w-full pb-1 md:pb-8" aria-hidden="true">
      <Carousel
        opts={{
          dragFree: true,
          watchDrag: false,
        }}
        className="-mx-4 sm:-mx-1 lg:-mx-6"
      >
        <CarouselContent className="gap-4 px-4 sm:gap-6 sm:px-1 md:gap-10 lg:px-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CarouselItem key={i} className="basis-auto ps-0">
              <div className="flex w-[75px] flex-col items-center gap-2 md:w-[160px] md:gap-4">
                {/* Skeleton Circle (Match real sizes) */}
                <div className="size-[75px] animate-pulse rounded-full bg-primary-50 md:size-[160px] dark:bg-card/50" />
                {/* Skeleton Text */}
                <div className="h-5 w-16 animate-pulse rounded-md bg-primary-50 md:h-6 md:w-24 dark:bg-card/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

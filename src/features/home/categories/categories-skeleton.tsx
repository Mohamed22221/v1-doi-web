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
    <div className="w-full overflow-hidden pb-8" aria-hidden="true">
      <Carousel
        opts={{
          dragFree: true,
          watchDrag: false, 
        }}
        className="w-full"
      >
        <CarouselContent className="ms-0 gap-14 ps-4 md:ps-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <CarouselItem key={i} className="basis-auto ps-0">
              <div className="flex flex-col items-center gap-4">
                {/* Skeleton Circle (160x160) */}
                <div className="size-[160px] animate-pulse rounded-full bg-primary-50 dark:bg-card/50" />
                {/* Skeleton Text */}
                <div className="h-6 w-24 animate-pulse rounded-md bg-primary-50 dark:bg-card/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

"use client";

import * as React from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

interface AuctionCarouselProps {
  children: React.ReactNode;
  localeDir: "rtl" | "ltr";
}

/**
 * AuctionCarousel
 *
 * Strict "use client" wrapper around native Embla layout logic for the
 * auction cards block.
 */
export function AuctionCarousel({ children, localeDir }: AuctionCarouselProps) {
  return (
    <div className="w-full">
      <Carousel
        dir={localeDir}
        opts={{
          direction: localeDir,
          dragFree: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="ms-0 gap-4 pe-1 md:gap-1">{children}</CarouselContent>
      </Carousel>
    </div>
  );
}

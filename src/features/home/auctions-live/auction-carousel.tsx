"use client";

import * as React from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  const plugin = React.useRef(
    Autoplay({
      delay: 10000,
      stopOnInteraction: false, // لضمان استمرار التشغيل بعد تفاعل المستخدم (الضغط على النقط)
      stopOnMouseEnter: true, // خاصية مدمجة توقف التشغيل عند مرور الماوس وتستأنفه تلقائياً
    }),
  );
  return (
    <div className="w-full">
      <Carousel
        dir={localeDir}
        opts={{
          direction: localeDir,
          dragFree: true,
          align: "start",
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
      >
        <CarouselContent className="ms-0 gap-1 pe-1 md:gap-3 md:pe-10">{children}</CarouselContent>
      </Carousel>
    </div>
  );
}

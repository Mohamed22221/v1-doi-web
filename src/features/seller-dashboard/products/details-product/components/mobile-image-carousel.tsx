"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@components/ui/carousel";
import Image from "next/image";
import { PencilIcon } from "@/components/shared/icon-base/constant";

export function MobileImageCarousel({
  images,
  title,
  noImageLabel,
}: {
  images: Array<{ url: string }>;
  title: string;
  noImageLabel: string;
}) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (images.length === 0) {
    return (
      <div className="flex h-[225px] w-full items-center justify-center rounded-2xl bg-neutral-50 dark:bg-secondary/10">
        <p className="text-caption text-neutral-400 dark:text-muted-foreground">
          {noImageLabel}
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[225px] w-full overflow-hidden rounded-2xl">
      <Carousel
        dir={dir}
        opts={{
          direction: dir,
        }}
        setApi={setApi}
        className="h-full w-full"
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative h-[225px] w-full">
              <Image
                src={image.url ?? "/img/product-placeholder.png"}
                alt={`${title} - image ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Carousel dots */}
      {images.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-1"
          aria-label="Image navigation"
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-pressed={activeIndex === i}
              className={`size-[10px] rounded-full transition-opacity focus-visible:ring-1 focus-visible:ring-white focus-visible:outline-none ${
                activeIndex === i ? "bg-primary-400" : "bg-primary-400 opacity-50"
              }`}
            />
          ))}
        </div>
      )}
      <div className="absolute top-2 left-2 rounded-full bg-white p-1 shadow-sm dark:bg-secondary">
        <PencilIcon
          className="size-5 p-0.5 text-neutral-400 dark:text-neutral-100"
          aria-hidden="true"
          focusable="false"
          role="presentation"
        />
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@components/ui/carousel";
import { MarkIcon, ShareIcon } from "@/components/shared/icon-base/constant";
import { cn } from "@utils/cn";

interface AuctionCardCarouselProps {
  images: string[];
  title: string;
  locale: string;
}

/**
 * AuctionCardCarousel — Client Component
 *
 * Adapted from ProductCardCarousel for the featured auctions section.
 * Desktop image height: 285px | Mobile image height: 120px
 * Includes Share & Bookmark action buttons and carousel dot indicators.
 */
export function AuctionCardCarousel({ images, title, locale }: AuctionCardCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";

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

  return (
    <div className="relative flex h-[120px] flex-col items-center justify-between overflow-hidden rounded-2xl bg-muted p-2 sm:h-[285px] sm:p-3">
      {/* ── Carousel ── */}
      <Carousel
        dir={dir}
        opts={{ direction: dir, loop: true }}
        setApi={setApi}
        className="absolute inset-0 h-full w-full"
      >
        <CarouselContent className="h-full">
          {images.map((imgUrl, index) => (
            <CarouselItem
              key={index}
              className="relative h-[120px] min-w-0 shrink-0 grow-0 basis-full sm:h-[285px]"
            >
              <Image
                src={imgUrl}
                alt={`${title} - image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* ── Top action buttons ── */}
      <div className="pointer-events-none relative z-10 flex w-full items-center justify-between">
        {/* Share button */}
        <button
          type="button"
          aria-label={isArabic ? `مشاركة ${title}` : `Share ${title}`}
          className="pointer-events-auto flex size-6 items-center justify-center rounded-full bg-card shadow-sm transition-colors hover:bg-card/90 sm:size-14"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ShareIcon
            aria-hidden="true"
            focusable="false"
            role="presentation"
            className="size-3 text-primary-400 sm:size-7"
          />
        </button>

        {/* Bookmark button */}
        <button
          type="button"
          aria-label={isArabic ? `حفظ ${title}` : `Save ${title}`}
          className="pointer-events-auto flex size-6 items-center justify-center rounded-full bg-card shadow-sm transition-colors hover:bg-card/90 sm:size-14"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MarkIcon
            aria-hidden="true"
            focusable="false"
            role="presentation"
            className="size-3 text-primary-400 sm:size-7"
          />
        </button>
      </div>

      {/* ── Carousel dots ── */}
      {images.length > 1 && (
        <div className="relative z-10 flex w-full items-center justify-center gap-1 px-1 pb-0.5 sm:gap-1.5 sm:pb-1">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                api?.scrollTo(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              aria-pressed={activeIndex === i}
              className={cn(
                "size-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:size-2.5",
                activeIndex === i ? "scale-110 bg-white" : "bg-white/70 hover:bg-white/90",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

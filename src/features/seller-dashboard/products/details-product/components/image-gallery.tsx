import * as React from "react";
import Image from "next/image";

export function DesktopImageGallery({
  images,
  title,
  noImageLabel,
}: {
  images: Array<{ url: string }>;
  title: string;
  noImageLabel: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const mainImage = images[activeIndex]?.url;

  if (images.length === 0) {
    return (
      <div className="flex h-[210px] w-full items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50 dark:border-border dark:bg-secondary/10">
        <p className="text-caption text-neutral-400 dark:text-muted-foreground">
          {noImageLabel}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Main image */}
      <div className="relative h-[210px] w-full overflow-hidden rounded-2xl bg-neutral-50 dark:bg-secondary/10">
        <Image
          src={mainImage ?? "/img/product-placeholder.png"}
          alt={title}
          fill
          className="object-cover"
          sizes="400px"
          priority
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`${title} - image ${i + 1}`}
              aria-pressed={activeIndex === i}
              className={`relative size-[85px] shrink-0 overflow-hidden rounded-2xl transition-all focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none dark:focus-visible:ring-primary ${
                activeIndex === i
                  ? "ring-3 ring-primary-500 dark:ring-primary"
                  : "opacity-80 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="85px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

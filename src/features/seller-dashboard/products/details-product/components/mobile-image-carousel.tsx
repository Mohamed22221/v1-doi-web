import * as React from "react";
import Image from "next/image";

export function MobileImageCarousel({
  images,
  title,
  noImageLabel,
}: {
  images: Array<{ url: string }>;
  title: string;
  noImageLabel: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-[225px] w-full items-center justify-center rounded-2xl bg-neutral-50">
        <p className="text-caption text-neutral-400">{noImageLabel}</p>
      </div>
    );
  }

  return (
    <div className="relative h-[225px] w-full overflow-hidden rounded-2xl">
      <Image
        src={images[activeIndex]?.url ?? "/img/product-placeholder.png"}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* Carousel dots */}
      {images.length > 1 && (
        <div
          className="absolute bottom-2 flex gap-1 justify-end ltr:right-2 rtl:left-2"
          aria-label="Image navigation"
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-pressed={activeIndex === i}
              className={`size-[10px] rounded-full transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                activeIndex === i
                  ? "bg-primary-400"
                  : "bg-primary-400 opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

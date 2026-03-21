"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState, useTransition } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@components/ui/carousel";
import type { Locale } from "@lib/i18n/config";
import { getDirection } from "@lib/i18n/config";
import { cn } from "@utils/cn";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FilterOption {
  label: string;
  value: string | null;
}

interface ProductsFilterProps {
  locale: Locale;
  labels: {
    all: string;
    auction: string;
    fixed: string;
    draft: string;
    pending: string;
    sold: string;
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ProductsFilter
 * A drag-scroll carousel of filter buttons that update the `productSellType`
 * query parameter in the URL.
 *
 * Render Architecture: This is a Client Component because it needs:
 *  - useSearchParams / useRouter / usePathname (navigation)
 *  - Embla carousel interaction (drag detection)
 */
export default function ProductsFilter({ locale, labels }: ProductsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const localeDir = getDirection(locale);
  const [_isPending, startTransition] = useTransition();

  const currentFilter = searchParams.get("productSellType");

  // Track Embla API to detect dragging
  const [_api, setApi] = useState<CarouselApi>();
  const isDragging = useRef(false);

  const FILTER_OPTIONS: FilterOption[] = [
    { label: labels.all, value: null },
    { label: labels.auction, value: "auction" },
    { label: labels.fixed, value: "fixed" },
    { label: labels.draft, value: "draft" },
    { label: labels.pending, value: "pending" },
    { label: labels.sold, value: "sold" },
  ];

  // Track drag state via Embla events
  const handleSetApi = useCallback((carouselApi: CarouselApi) => {
    setApi(carouselApi);
    if (!carouselApi) return;

    carouselApi.on("pointerDown", () => {
      isDragging.current = false;
    });
    carouselApi.on("scroll", () => {
      isDragging.current = true;
    });
  }, []);

  // Prevent click fire after a drag gesture
  const handleFilterClick = useCallback(
    (value: string | null) => {
      if (isDragging.current) {
        isDragging.current = false;
        return;
      }

      // If already on the same filter, skip to avoid redundant navigation
      if (value === currentFilter) return;

      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete("productSellType");
      } else {
        params.set("productSellType", value);
      }

      // Trigger URL update in the background
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [isDragging, currentFilter, pathname, router, searchParams],
  );

  return (
    <nav aria-label="فلترة المنتجات" className="w-full overflow-hidden">
      <Carousel
        dir={localeDir}
        opts={{
          direction: localeDir,
          dragFree: true,
          containScroll: "trimSnaps",
          breakpoints: {
            "(min-width: 768px)": { active: false },
          },
        }}
        setApi={handleSetApi}
        className="w-full"
      >
        <CarouselContent className="ms-0 gap-2 ps-4 md:ps-0">
          {FILTER_OPTIONS.map((option) => {
            const isActive = option.value === currentFilter;
            return (
              <CarouselItem
                key={option.value ?? "all"}
                className="basis-auto ps-0"
                aria-roledescription="item"
              >
                <Button
                  type="button"
                  rounded="sm"
                  variant={isActive ? "default" : "outline"}
                  onClick={() => handleFilterClick(option.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "px-5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors select-none",
                    !isActive &&
                      "bg-primary-50 bg-none font-thin text-primary-800 hover:border-primary-300 hover:bg-primary-50 md:bg-white dark:bg-primary-900 dark:text-neutral-200 dark:hover:bg-primary-800",
                  )}
                >
                  {option.label}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </nav>
  );
}

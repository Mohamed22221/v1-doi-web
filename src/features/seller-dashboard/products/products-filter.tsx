"use client";
import { useCallback, useRef, useState } from "react";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
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
    fixed_price: string;
    live_auction: string;
    period_auction: string;
    draft: string;
    pending: string;
    sold: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
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
 *  - nuqs (for shallow URL management)
 *  - Embla carousel interaction (drag detection)
 */
export default function ProductsFilter({ locale, labels, searchParams }: ProductsFilterProps) {
  const localeDir = getDirection(locale);

  // Manage productSellType and page parameters using nuqs
  const [query, setQuery] = useQueryStates(
    {
      productSellType: parseAsString.withDefault(""),
      page: parseAsInteger,
    },
    {
      shallow: true,
      history: "replace",
    },
  );

  // Use props during SSR to ensure consistency with URL
  const isServer = typeof window === "undefined";
  const productSellType = isServer
    ? (searchParams?.productSellType as string) || ""
    : query.productSellType;

  const currentFilter = productSellType || null;

  // Track Embla API to detect dragging
  const [_api, setApi] = useState<CarouselApi>();
  const isDragging = useRef(false);

  const FILTER_OPTIONS: FilterOption[] = [
    { label: labels.all, value: null },
    { label: labels.fixed_price, value: "fixed_price" },
    { label: labels.live_auction, value: "live_auction" },
    { label: labels.period_auction, value: "period_auction" },
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

      const activeValue = value || "";
      if (activeValue === query.productSellType) return;

      // Update URL instantly using nuqs
      // Reset page to null/1 when filter changes
      setQuery({
        productSellType: value,
        page: null,
      });

      // Dispatch event to show loading skeleton in ProductsList instantly
      window.dispatchEvent(new CustomEvent("navigation-start"));
    },
    [isDragging, query.productSellType, setQuery],
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

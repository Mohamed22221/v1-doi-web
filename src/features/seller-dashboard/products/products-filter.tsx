"use client";
import { useCallback, useRef, useState, useMemo, memo } from "react";
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
  type: "all" | "sellType" | "status";
}

interface ProductsFilterProps {
  locale: Locale;
  labels: {
    all: string;
    fixed_price: string;
    period_auction: string;
    auctions: string;
    draft: string;
    pending_approval: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

// ---------------------------------------------------------------------------
// FilterItem Component (Memoized for Static Caching)
// ---------------------------------------------------------------------------

const FilterItem = memo(({
  option,
  isActive,
  onClick,
}: {
  option: FilterOption;
  isActive: boolean;
  onClick: (option: FilterOption) => void;
}) => {
  return (
    <CarouselItem
      className="basis-auto ps-0"
      aria-roledescription="item"
    >
      <Button
        type="button"
        rounded="sm"
        variant={isActive ? "default" : "outline"}
        onClick={() => onClick(option)}
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
});
FilterItem.displayName = "FilterItem";

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
export default function ProductsFilter({ locale, labels }: ProductsFilterProps) {
  const localeDir = getDirection(locale);

  // Manage productSellType, status and page parameters using nuqs
  const [query, setQuery] = useQueryStates(
    {
      productSellType: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
      page: parseAsInteger,
    },
    {
      shallow: true,
      history: "replace",
    },
  );

  // Track Embla API to detect dragging
  const [_api, setApi] = useState<CarouselApi>();
  const isDragging = useRef(false);

  // Memoize Filter Options (Static Cache)
  const FILTER_OPTIONS = useMemo<FilterOption[]>(() => [
    { label: labels.all, value: null, type: "all" },
    { label: labels.auctions, value: "live_auction", type: "sellType" },
    { label: labels.period_auction, value: "period_auction", type: "sellType" },
    { label: labels.fixed_price, value: "fixed_price", type: "sellType" },
    { label: labels.draft, value: "draft", type: "status" },
    { label: labels.pending_approval, value: "pending_approval", type: "status" },
  ], [labels]);

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
    (option: (typeof FILTER_OPTIONS)[number]) => {
      if (isDragging.current) {
        isDragging.current = false;
        return;
      }

      // Mutual exclusion logic: Reset one param when the other is set
      const nextQuery = {
        page: null,
        productSellType: option.type === "sellType" ? (option.value as string) : null,
        status: option.type === "status" ? (option.value as string) : null,
      };

      setQuery(nextQuery);

      // Dispatch event to show loading skeleton in ProductsList instantly
      window.dispatchEvent(new CustomEvent("navigation-start"));
    },
    [isDragging, setQuery],
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
            const isActive =
              option.type === "all"
                ? !query.productSellType && !query.status
                : option.type === "sellType"
                  ? query.productSellType === option.value
                  : query.status === option.value;

            return (
              <FilterItem
                key={option.value ?? "all"}
                option={option}
                isActive={isActive}
                onClick={handleFilterClick}
              />
            );
          })}
        </CarouselContent>
      </Carousel>
    </nav>
  );
}

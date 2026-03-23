import { Skeleton } from "@components/ui/skeleton";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ProductCardSkeleton
 *
 * Loading placeholder for the ProductCard.
 * Matches 1:1 with the responsive layout and styles of ProductCard.
 *
 * Server Component
 */
export default function ProductCardSkeleton() {
  return (
    <div className="group relative overflow-hidden border-b border-neutral-50 p-4 transition-all last:border-b-0 md:rounded-md md:border md:bg-white md:p-3 md:last:border-b md:hover:shadow-md dark:border-primary-500 md:dark:bg-primary-900">
      <article className="flex h-full flex-col md:block">
        <div className="flex gap-3 md:block md:gap-4">
          {/* Image Section - aspect-402/175 on desktop, dummy div for size-20 on mobile */}
          <div className="relative shrink-0 overflow-hidden rounded-lg bg-neutral-100 md:aspect-402/175 md:w-full dark:bg-primary-900 md:dark:bg-primary-800">
            <Skeleton className="absolute inset-0 size-full" />
            <div className="size-20 md:hidden" aria-hidden="true" />
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-between overflow-hidden md:mt-4 md:block">
            {/* Header: Title + Badge */}
            <div>
              <div className="flex items-start justify-between gap-2">
                {/* Title (text-body/h4) */}
                <Skeleton className="h-4 w-[60%] md:h-6 md:w-[70%]" />
                {/* StatusBadge (rounded-sm px-3/4 py-2) */}
                <Skeleton className="h-[32px] w-[60px] shrink-0 rounded-sm md:h-[40px] md:w-[84px]" />
              </div>

              {/* Description (text-xs/h5) */}
              <Skeleton className="mt-2 h-3 w-[40%] md:mt-1 md:h-5 md:w-[50%]" />
            </div>

            {/* Price & Riyall Icon Grouping */}
            <div className="mt-auto flex items-center gap-1 md:mt-2 md:gap-1.5">
              {/* Price text (text-body/h3) */}
              <Skeleton className="h-4 w-12 md:h-8 md:w-20" />
              {/* Riyall icon (h-27/34) */}
              <Skeleton className="h-[27px] w-[25px] md:h-[34px] md:w-[32px]" />
            </div>
          </div>
        </div>

        {/* Action Group */}
        <div className="mt-2 flex items-center justify-end gap-2 md:mt-1">
          {/* Main Action Button */}
          <Skeleton className="h-9 w-28 shrink-0 rounded-sm md:h-10 md:w-32" />
          {/* Secondary Action Icons (Eye, Delete) */}
          <Skeleton className="size-9 shrink-0 rounded-sm md:size-10" />
          <Skeleton className="size-9 shrink-0 rounded-sm md:size-10" />
        </div>
      </article>
    </div>
  );
}

/**
 * ProductCardSkeletonGrid
 *
 * A grid of skeleton cards matching the ProductsList grid configuration.
 */
export function ProductCardSkeletonGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 md:gap-x-4 md:gap-y-7 md:px-0 lg:grid-cols-3 3xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

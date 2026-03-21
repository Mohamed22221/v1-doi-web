import { Skeleton } from "@components/ui/skeleton";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ProductCardSkeleton
 *
 * Loading placeholder for the ProductCard.
 * Matches the responsive layout (Desktop vertical, Mobile horizontal).
 *
 * Server Component
 */
export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 border-b border-neutral-100 bg-transparent py-4 last:border-0 md:block md:rounded-2xl md:border md:border-neutral-200 md:bg-white md:p-4 dark:border-primary-800 dark:bg-primary-900/50 md:dark:bg-primary-900">
      <div className="flex gap-4 md:block">
        {/* Image Skeleton */}
        <Skeleton className="relative size-20 shrink-0 rounded-lg md:aspect-402/175 md:size-auto md:w-full" />

        {/* Content Skeleton */}
        <div className="flex-1 space-y-3 md:mt-4 md:space-y-4">
          <div className="flex items-start justify-between">
            <Skeleton className="h-5 w-2/3 md:h-6" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-1/3" />

          <div className="flex items-center justify-between md:pt-2">
            <Skeleton className="h-6 w-20 md:h-7" />
            <div className="flex gap-2">
              <Skeleton className="size-7 rounded-md" />
              <Skeleton className="size-7 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ProductCardSkeletonGrid
 *
 * A grid of skeleton cards for the initial loading state.
 */
export function ProductCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

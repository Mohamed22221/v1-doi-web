import { Skeleton } from "@components/ui/skeleton";

/**
 * ProductCardSkeleton — matches the exact layout of ProductCard (Figma node 706:7936).
 *
 * Structure:
 *   - 300px image block (same height as the real image container)
 *   - Title (2 lines)
 *   - Price + CTA row inside a border box
 *
 * Used as the Suspense fallback in BuyNowSection to prevent CLS.
 */
function ProductCardSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="جاري التحميل…"
      className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-2 sm:gap-6 sm:p-4"
    >
      {/* Image area */}
      <Skeleton className="h-[120px] w-full rounded-2xl sm:h-[300px]" />

      {/* Title block — 2 lines */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4 rounded-md sm:h-5" />
        <Skeleton className="h-4 w-1/2 rounded-md sm:h-5" />
      </div>

      {/* Price + CTA row */}
      <div className="flex items-center justify-between rounded-xl border border-border p-2 sm:rounded-2xl sm:p-4">
        <Skeleton className="h-4 w-16 rounded-md sm:h-8 sm:w-24" />
        <Skeleton className="h-4 w-12 rounded-md sm:h-8 sm:w-20" />
      </div>
    </article>
  );
}

/**
 * BuyNowSkeleton — renders product card skeletons in the same grid
 * used by ProductList, ensuring zero layout shift during streaming.
 */
export function BuyNowSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}

/**
 * TagsSkeleton — Loading fallback for <TrendingSearches />.
 * Shown during PPR streaming while the dynamic tags are being fetched.
 */
export function TagsSkeleton() {
  return (
    <div
      className="flex w-full max-w-[1000px] items-center justify-end gap-8"
      aria-busy="true"
      aria-label="Loading trending searches"
    >
      <div className="flex flex-wrap items-center justify-end gap-[18px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-11 w-32 animate-pulse rounded-2xl bg-white/10" />
        ))}
      </div>
      <div className="h-5 w-24 animate-pulse rounded bg-white/10" />
    </div>
  );
}

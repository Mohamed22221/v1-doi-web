import { Skeleton } from "@components/ui/skeleton";

/**
 * RecentSearchesSkeleton — Client Component (implied by use of Skeleton).
 * Fallback UI for Recent Searches while they are being fetched.
 */
export function RecentSearchesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-24" />
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
             <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

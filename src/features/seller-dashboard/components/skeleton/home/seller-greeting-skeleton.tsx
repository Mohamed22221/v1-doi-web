import { Skeleton } from "@/components/ui/skeleton";

/**
 * SellerGreetingSkeleton
 *
 * A skeleton component that matches the layout of SellerGreeting.
 * Provides a loading state to minimize layout shift.
 */
export function SellerGreetingSkeleton() {
  return (
    <div className="card flex flex-col gap-3 rounded-md p-4 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none">
      {/* Greeting Title Placeholder */}
      <Skeleton className="h-7 w-48 md:h-10 md:w-56" />

      {/* Location Selector Placeholder */}
      <div className="flex items-center gap-1">
        {/* Location Icon */}
        <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
        {/* Location Text */}
        <Skeleton className="h-4 w-40 md:h-5 md:w-64" />
        {/* Arrow Icon */}
        <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
      </div>
    </div>
  );
}

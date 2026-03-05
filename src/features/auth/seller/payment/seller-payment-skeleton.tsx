import { Skeleton } from "@components/ui/skeleton";

export function SellerPaymentMethodSkeleton() {
  return (
    <div className="flex w-full items-center justify-between rounded-md border-2 border-neutral-100 p-4 dark:border-neutral-800">
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-10 shrink-0 rounded-sm" />
        <Skeleton className="h-5 w-32 md:h-6" />
      </div>
    </div>
  );
}

export function SellerPaymentFormSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4].map((i) => (
        <SellerPaymentMethodSkeleton key={i} />
      ))}
    </div>
  );
}

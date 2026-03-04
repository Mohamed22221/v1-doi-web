import { Skeleton } from "@components/ui/skeleton";

/**
 * IndividualFieldsSkeleton
 * Matches the layout of SellerIndividualFields:
 * - 1x RHFInput (h-14)
 * - 1x RHFIdentityUpload (h-14)
 * - Gap-4
 */
export function IndividualFieldsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}

/**
 * CompanyFieldsSkeleton
 * Matches the layout of SellerCompanyFields:
 * - 3x RHFInput/RHFPhoneInput (h-14)
 * - 2x RHFIdentityUpload (h-14)
 * - Gap-4
 */
export function CompanyFieldsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}

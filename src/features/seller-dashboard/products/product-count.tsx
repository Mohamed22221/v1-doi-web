"use client";

import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useSellerProductsQuery } from "@api/hooks/use-seller-products";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCountProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ProductCount({ searchParams }: ProductCountProps) {
  // Sync with filters
  const [query] = useQueryStates({
    productSellType: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
  });

  // Use props during SSR to ensure consistency with RSC prefetch
  const isServer = typeof window === "undefined";
  const productSellType = isServer
    ? (searchParams?.productSellType as string) || ""
    : query.productSellType;
  const page = isServer ? Number(searchParams?.page) || 1 : query.page;

  const { data, isPending } = useSellerProductsQuery({
    productSellType: (productSellType as string) || undefined,
    page,
    limit: 10,
  });

  if (isPending) {
    return (
      <span className="flex items-center gap-1" aria-hidden="true">
        (<Skeleton className="mb-2 h-3 w-2 animate-pulse rounded-md bg-neutral-100 md:h-7 md:w-5" />
        )
      </span>
    );
  }

  const count = data?.total || 0;

  return (
    <span className="text-body font-medium whitespace-nowrap text-neutral-800 md:text-h2 md:text-primary-800 dark:text-neutral-200 md:dark:text-primary-100">
      ({count})
    </span>
  );
}

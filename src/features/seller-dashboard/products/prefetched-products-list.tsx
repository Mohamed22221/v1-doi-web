import { getSellerProductsAction } from "@/lib/api/actions/products";
import ReactQueryKeys from "@/lib/api/constants/api-keys-constant";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductsList from "./products-list";
import { getQueryClient } from "@/lib/api/query-client";

import type { ProductEffectiveStatus, SellerProductsFilters } from "@/lib/api/types/seller-product";
import type { Locale } from "@/lib/i18n/config";
/**
 * PrefetchedProductsList
 *
 * Async Server Component that handles prefetching and provides the HydrationBoundary.
 */
export default async function PrefetchedProductsList({
  locale,
  searchParamsPromise,
}: {
  locale: Locale;
  searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sParams = await searchParamsPromise;

  const productSellType = (sParams.productSellType as string) || undefined;
  const status = (sParams.status as ProductEffectiveStatus) || undefined;
  const page = Number(sParams.page) || 1;
  const filters: SellerProductsFilters = { productSellType, status, page, limit: 10 };

  const queryClient = getQueryClient();
  const { page: _page, ...baseFilters } = filters;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ReactQueryKeys.SELLER_PRODUCTS.list(baseFilters),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getSellerProductsAction({
        ...baseFilters,
        page: pageParam as number,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    getNextPageParam: (lastPage: { page: number; totalPages: number }) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    pages: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList locale={locale} searchParams={sParams} />
    </HydrationBoundary>
  );
}

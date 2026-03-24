import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getSellerProductsAction, deleteSellerProductAction } from "../actions/products";
import ReactQueryKeys from "../constants/api-keys-constant";
import type { SellerProductsFilters } from "../types/seller-product";
import { useAppMutation } from "../action-utils";
import { showErrorToast, showSuccessToast } from "@/components/ui/toast/show-toast";
import { getApiErrorMessage } from "@api/error";
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@lib/i18n/config";

/**
 * useSellerProductsQuery
 *
 * Custom hook to fetch seller products using TanStack Query.
 * Wraps the getSellerProductsAction Server Action.
 *
 * @param filters - Parameters for filtering and pagination
 */
export function useSellerProductsQuery(filters: SellerProductsFilters) {
  return useQuery({
    queryKey: ReactQueryKeys.SELLER_PRODUCTS.list(filters),
    queryFn: async () => {
      const result = await getSellerProductsAction(filters);
      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    // staleTime is handled by the global default in query-client.ts (5s),
    // but these queries are specific to the seller's session.
  });
}

/**
 * useSellerProductsInfiniteQuery
 *
 * Custom hook to fetch seller products with infinite scrolling using TanStack Query.
 * Wraps the getSellerProductsAction Server Action.
 *
 * @param filters - Parameters for filtering
 */
export function useSellerProductsInfiniteQuery(filters: SellerProductsFilters) {
  return useInfiniteQuery({
    queryKey: ReactQueryKeys.SELLER_PRODUCTS.list(filters),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getSellerProductsAction({
        ...filters,
        page: pageParam as number,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}

/**
 * useDeleteProductMutation
 *
 * Custom hook to delete a seller product.
 * Uses query invalidation to refetch data after server-side revalidation.
 */
export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const { t } = useTranslation(locale, "common");

  return useAppMutation<void, string | number>(deleteSellerProductAction, {
    onSuccess: () => {
      // Show translated success toast globally as requested by user
      showSuccessToast(t("product-actions.delete-success"), {
        positionSm: "top-center",
        className: "toast-inline-full",
      });
    },

    onError: (error: Error) => {
      // Show error toast as requested by user
      const message = getApiErrorMessage(error);
      showErrorToast(message, {
        positionSm: "top-center",
        className: "toast-inline-full md:w-[550px]",
      });
    },

    onSettled: () => {
      // Always refetch after error or success to ensure we are in sync with the server
      queryClient.invalidateQueries({ queryKey: ReactQueryKeys.SELLER_PRODUCTS.all() });
    },
  });
}

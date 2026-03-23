"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerProductsAction } from "../actions/products";
import ReactQueryKeys from "../constants/api-keys-constant";
import type { SellerProductsFilters } from "../types/seller-product";

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

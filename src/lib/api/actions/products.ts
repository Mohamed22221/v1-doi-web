"use server";

import { apiClient } from "@api/api";
import { API_ENDPOINTS } from "@api/constants";
import { serverActionWrapper } from "../action-utils";
import type { SellerProduct, SellerProductsFilters } from "../types/seller-product";
import type { ActionState, TAPIResponseItems } from "../types/api";

/**
 * getSellerProductsAction
 *
 * Server Action to fetch seller products with optional filtering and pagination.
 *
 * @param filters - Parameters for filtering (productSellType, page, limit)
 */
export async function getSellerProductsAction(
  filters: SellerProductsFilters,
): Promise<ActionState<TAPIResponseItems<SellerProduct[]>["data"]>> {
  return serverActionWrapper(async () => {
    // Construct query parameters, omitting undefined values
    const queryParams: Record<string, string> = {};

    if (filters.productSellType) {
      queryParams.productSellType = filters.productSellType;
    }

    if (filters.page) {
      queryParams.page = filters.page.toString();
    }

    if (filters.limit) {
      queryParams.limit = filters.limit.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const endpoint = `${API_ENDPOINTS.SELLER.PRODUCTS.LIST}${queryString ? `?${queryString}` : ""}`;

    const response = await apiClient.get<TAPIResponseItems<SellerProduct[]>["data"]>(endpoint);
    return response.data;
  });
}

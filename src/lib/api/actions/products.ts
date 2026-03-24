"use server";

import { revalidatePath, updateTag } from "next/cache";
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

    const response = await apiClient.get<TAPIResponseItems<SellerProduct[]>["data"]>(endpoint, {
      next: { tags: ["seller-products"] },
    });
    return response.data;
  });
}

/**
 * deleteSellerProductAction
 *
 * Server Action to delete a seller product by ID.
 *
 * @param id - The ID of the product to delete
 */
export async function deleteSellerProductAction({
  id,
  locale,
}: {
  id: string | number;
  locale: string;
}): Promise<ActionState<void>> {
  return serverActionWrapper(async () => {
    const endpoint = `${API_ENDPOINTS.SELLER.PRODUCTS.LIST}/${id}`;
    await apiClient.delete(endpoint);
    updateTag("seller-products");
    revalidatePath(`/${locale}/dashboard/seller/products`, "page");
  });
}

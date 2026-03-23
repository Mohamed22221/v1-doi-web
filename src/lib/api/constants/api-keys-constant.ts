import type { SellerProductsFilters } from "../types/seller-product";

const ReactQueryKeys = {
  SELLER_PRODUCTS: {
    all: () => ["seller-products"] as const,
    list: (filters: SellerProductsFilters) => ["seller-products", "list", filters] as const,
  },
} as const;

export default ReactQueryKeys;

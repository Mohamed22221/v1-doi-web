/**
 * ProductEffectiveStatus
 *
 * Defines the possible states of a product in the inventory.
 */
export type ProductEffectiveStatus =
  | "draft"
  | "pending_approval"
  | "rejected"
  | "active"
  | "inactive"
  | "auction_scheduled"
  | "auction_live"
  | "auction_ended"
  | "sold"
  | "hidden";

/**
 * ProductImage
 *
 * Represents a single image associated with a product.
 */
export interface ProductImage {
  url: string;
}

/**
 * SellerProductsFilters
 *
 * Parameters for filtering and paginating seller products.
 */
export interface SellerProductsFilters {
  productSellType?: string;
  status?: ProductEffectiveStatus;
  page?: number;
  limit?: number;
}

/**
 * SellerProduct
 *
 * Represents a single product in the seller's inventory.
 */
export interface SellerProduct {
  id: string;
  title: string;
  description?: string;
  price?: number;
  effectiveStatus: ProductEffectiveStatus;
  images: ProductImage[];
}

/**
 * ProductStatus
 *
 * Defines the possible states of a product in the inventory.
 */
export type ProductStatus = 'active' | 'pending' | 'rejected' | 'inactive' | 'sold' | (string & {});

/**
 * SellerProduct
 *
 * Represents a single product in the seller's inventory.
 */
export interface SellerProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string | null;
  status: ProductStatus;
}

# Data Model: Seller Products (Infinite Scroll)

## Entities

### `SellerProduct`
Represents a single item in the seller's inventory.
- **id**: `string` (UUID)
- **title**: `string`
- **price**: `number`
- **effectiveStatus**: `Enum` (active, pending, rejected, inactive, sold)
- **images**: `ProductImage[]`

### `InfiniteProductsResponse`
The shape of each page returned by the API during infinite scroll.
- **items**: `SellerProduct[]`
- **page**: `number` (Current page index)
- **limit**: `number` (Items per page)
- **total**: `number` (Total item count)
- **totalPages**: `number` (Total pages available)

## State Transitions
1. **Initial Load**: `status: "pending"` -> Returns page 1.
2. **Scrolling (Margin reached)**: `isFetchingNextPage: true` -> Fetches page `n + 1`.
3. **Appended**: New items added to `data.pages`.
4. **End of Data**: `hasNextPage: false` -> sentinel disabled.

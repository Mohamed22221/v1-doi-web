# Data Model: Seller Products Integration

**Branch**: `002-seller-products-integration` | **Date**: 2026-03-23  
**Location**: `src/lib/api/types/seller-product.ts`

---

## Entities

### ProductEffectiveStatus

A string union representing the lifecycle state of a seller product.

```ts
export type ProductEffectiveStatus =
  | 'active'
  | 'pending'
  | 'rejected'
  | 'inactive'
  | 'sold'
  | (string & {});
```

> The open-ended `(string & {})` variant preserves future-proofing while maintaining autocomplete for known values.

---

### ProductImage

A single image entry in the product's `images` array.

```ts
export interface ProductImage {
  url: string;
}
```

---

### SellerProduct

The core entity representing a single product in the seller's inventory — mapped directly from the API response fields needed for the product card UI.

```ts
export interface SellerProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  effectiveStatus: ProductEffectiveStatus;
  images: ProductImage[];
}
```

**Field Notes**:
- `images[0].url` is the primary display image; components must handle `images.length === 0` with a fallback.
- `price` is in SAR (﷼); no conversion is needed.
- `effectiveStatus` drives the status badge rendered on the product card.
- `description` replaces the mock-era `category` field.
- `id` is used as React list key and for action routing.

---

### SellerProductsFilters

Filter parameters passed to the API and used as the React Query cache key discriminator.

```ts
export interface SellerProductsFilters {
  productSellType?: string;
  page?: number;
}
```

---

## API Response Shape

The seller products list endpoint returns a `TAPIResponseItems<SellerProduct[]>` response:

```ts
type TAPIResponseItems<SellerProduct[]> = {
  status: true;
  message: string;
  data: {
    items: SellerProduct[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

The Server Action returns the inner `data` object (`items` + pagination fields).

---

## State Transitions

The `effectiveStatus` field reflects lifecycle states that drive the UI status badge:

```
[draft] → pending → active
                 ↘ rejected → (resubmit) → pending
active  → sold
active  → inactive (seller deactivates)
inactive → active (seller reactivates)
```

> Status transitions are managed entirely by the backend. The frontend renders the badge based on the current `effectiveStatus` value only.

---

## Validation Rules

| Field | Rule |
|---|---|
| `id` | Non-empty string |
| `title` | Non-empty string |
| `description` | String (may be empty) |
| `price` | Non-negative number |
| `effectiveStatus` | One of the known union values (or arbitrary string) |
| `images` | Array (may be empty; component falls back to placeholder) |
| `images[n].url` | Non-empty string |

# Data Model: Phase 1 — Product Inventory UI

## Entities

### `ProductStatus` (type union)

```
'active' | 'pending' | 'rejected' | 'inactive' | string
```

- `active` → success badge
- `pending` → warning badge
- `rejected` → error/danger badge
- `inactive` → neutral badge
- `string` (fallback) → neutral badge, display raw value

---

### `SellerProduct` (interface)

| Field | Type | Nullable | Notes |
|---|---|---|---|
| `id` | `string` | No | Unique product identifier |
| `title` | `string` | No | Displayed in card header. Truncated at overflow. |
| `category` | `string` | No | Displayed below header |
| `price` | `number` | No | Displayed with Riyal icon |
| `imageUrl` | `string \| null` | Yes | Null triggers fallback placeholder |
| `status` | `ProductStatus` | No | Drives StatusBadge color and label |

**Location**: `src/lib/api/types/seller-product.ts`

---

## Component Interfaces

### `StatusBadge` props

| Prop | Type | Required | Notes |
|---|---|---|---|
| `status` | `string` | Yes | Maps to color variant and i18n key |
| `className` | `string` | No | Optional override |

**Color variant map** (internal to component):

| Status | Variant | BG token | Text token |
|---|---|---|---|
| `active` | success | `bg-success-50` | `text-success-500` |
| `pending` | warning | `bg-warning-100` | `text-warning-500` |
| `rejected` | error | `bg-danger-50` | `text-danger-500` |
| `inactive` | neutral | `bg-neutral-50` | `text-neutral-600` |
| _(fallback)_ | neutral | `bg-neutral-50` | `text-neutral-600` |

---

### `ProductCard` props (desktop + mobile, responsive)

| Prop | Type | Required | Notes |
|---|---|---|---|
| `product` | `SellerProduct` | Yes | Full product data |

---

### `ProductCardSkeleton` (no props)

Renders a skeleton shell matching `ProductCard` dimensions. Desktop: 434px×380px. Mobile: full-width×124px. Responsive via same breakpoint logic as real card.

---

## i18n Keys (new `seller-dashboard` namespace)

```json
{
  "products": {
    "emptyTitle": "...",
    "emptyDescription": "...",
    "status": {
      "active": "...",
      "pending": "...",
      "rejected": "...",
      "inactive": "..."
    },
    "actions": {
      "view": "...",
      "delete": "..."
    }
  }
}
```

Must be added to all 8 locales (ar, en, de, es, fa, fr, tr, ur). Phase 1 requires ar + en as the primary supported locales; other locales default to en.

---

## State Transitions (StatusBadge)

```
Backend status value
  → mapped via statusVariantMap (internal record)
  → if not in map → fallback to 'neutral'
  → ColorVariant used to apply Tailwind token classes
  → i18n key `products.status.{status}` looked up
  → if key missing → display raw status string
```

---

## File Locations

| Artifact | Path |
|---|---|
| Product type | `src/lib/api/types/seller-product.ts` |
| StatusBadge | `src/components/shared/status-badge.tsx` |
| ProductCard | `src/features/seller-dashboard/products/product-card.tsx` |
| ProductCardSkeleton | `src/features/seller-dashboard/products/product-card-skeleton.tsx` |
| EmptyProductsState (update) | `src/features/seller-dashboard/products/empty-products-state.tsx` |
| Products page | `src/app/[locale]/(seller-dashboard)/dashboard/seller/products/page.tsx` |
| i18n — ar | `src/locales/ar/seller-dashboard.json` |
| i18n — en | `src/locales/en/seller-dashboard.json` |
| DeleteIcon addition | `src/components/shared/icon-base/constant.tsx` |

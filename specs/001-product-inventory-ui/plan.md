# Implementation Plan: Phase 1 — Product Inventory UI (Seller Dashboard)

**Branch**: `001-product-inventory-ui` | **Date**: 2026-03-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-product-inventory-ui/spec.md`

---

## Summary

Build the complete UI for the Seller Dashboard Product Inventory page. This includes a responsive product card grid (desktop vertical card + mobile horizontal card), a shared `StatusBadge` component, skeleton loaders for both viewports, an updated `EmptyProductsState` with i18n, and a new `DeleteIcon` in the icon constants. Phase 1 is strictly UI — no API calls or click handlers are wired. Product data is passed via props (mock or future Server Action) per the constitution's Server-First paradigm.

---

## Technical Context

**Language/Version**: TypeScript 5 / Next.js App Router (16)
**Primary Dependencies**: Tailwind CSS 4, CVA (class-variance-authority), next/image, next-intl (i18n)
**Storage**: N/A (Phase 1 is UI-only; no database access)
**Testing**: TypeScript compiler (`tsc --noEmit`) + `npm run build` for zero-error validation; visual manual review in browser
**Target Platform**: Web — desktop (≥768px) and mobile (<768px); LTR (en) and RTL (ar)
**Project Type**: Next.js web application (App Router, Server Components first)
**Performance Goals**: Sub-100ms Largest Contentful Paint on first paint of skeleton; zero layout shift between skeleton and real cards
**Constraints**: All colors via semantic tokens only; no hardcoded hex; no `use client` on page or card (Server Component); `deleteIcon` must follow existing `constant.tsx` pattern
**Scale/Scope**: One page, 6 new/modified files, 2 locale files per locale

---

## Constitution Check

*GATE: Must pass before implementation.*

| Rule | Status | Notes |
|---|---|---|
| Server-First — no `use client` on page/card | ✅ | Page and `ProductCard` are Server Components. `StatusBadge` is also server-safe (no interactivity). |
| No hardcoded hex colors | ✅ | All color references use tokens from `colors.css` and Tailwind semantic classes |
| Kebab-case file naming | ✅ | `product-card.tsx`, `product-card-skeleton.tsx`, `status-badge.tsx` |
| API types in `src/lib/api/types/` | ✅ | `seller-product.ts` placed there per Technical Standards rule |
| i18n mandatory for all user-facing text | ✅ | `EmptyProductsState` migrated to i18n; `StatusBadge` uses i18n keys |
| No div-buttons | ✅ | Icon buttons use `<button>` with `aria-label` |
| `next/image` for all images | ✅ | Product image and fallback via `<Image>` |
| Direct imports (no barrel index.ts) | ✅ | No index.ts introduced |
| CVA for component variants | ✅ | `StatusBadge` uses CVA for color variant mapping |
| Dark mode via `.dark` class, not `dark:` prefix abuse | ✅ | `Skeleton` already handles this internally; price token uses explicit `dark:text-neutral-10` per spec — justified by spec constraint |

**Result: All gates pass. No violations.**

---

## Project Structure

### Documentation (this feature)

```text
specs/001-product-inventory-ui/
├── plan.md              ✅ This file
├── research.md          ✅ Phase 0 complete
├── data-model.md        ✅ Phase 1 complete
└── tasks.md             (Phase 2 — /speckit.tasks)
```

### Source Code Changes

```text
src/
├── lib/
│   └── api/
│       └── types/
│           └── seller-product.ts               [NEW] SellerProduct interface + ProductStatus type
│
├── components/
│   ├── shared/
│   │   ├── icon-base/
│   │   │   └── constant.tsx                    [MODIFY] Add DeleteIcon SVG export
│   │   └── status-badge.tsx                    [NEW] Shared StatusBadge with CVA + i18n
│   └── ui/
│       └── skeleton.tsx                        [NO CHANGE] Reused as-is
│
├── features/
│   └── seller-dashboard/
│       └── products/
│           ├── product-card.tsx                [NEW] Responsive ProductCard (Server Component)
│           ├── product-card-skeleton.tsx       [NEW] Skeleton variant matching card dimensions
│           └── empty-products-state.tsx        [MODIFY] Migrate hardcoded Arabic → i18n keys
│
├── app/
│   └── [locale]/
│       └── (seller-dashboard)/
│           └── dashboard/
│               └── seller/
│                   └── products/
│                       └── page.tsx            [MODIFY] Wire ProductCard grid + Suspense + EmptyState
│
└── locales/
    ├── ar/
    │   └── seller-dashboard.json               [NEW] Arabic translations
    └── en/
        └── seller-dashboard.json               [NEW] English translations
    (other locales: de, es, fa, fr, tr, ur)     [NEW] Minimal keys, en fallback
```

---

## Implementation Phases

### Phase 0 (Complete): Research

- ✅ Confirmed `EyeIcon` in `constant.tsx` (line 358)
- ✅ Confirmed `Riyall` icon (21×23px) for price display
- ✅ Confirmed `Skeleton` component pattern
- ✅ Confirmed `Card` CSS-class shell
- ✅ Identified `DeleteIcon` missing — must add
- ✅ Identified `EmptyProductsState` hardcoded Arabic — must migrate to i18n
- ✅ Determined `common.json` does not contain product keys → new `seller-dashboard.json` namespace
- ✅ Determined page location: `src/app/[locale]/(seller-dashboard)/dashboard/seller/products/page.tsx`

### Phase 1 (Design & Contracts)

**Step 1 — Add `SellerProduct` type** (`src/lib/api/types/seller-product.ts`)

```typescript
export type ProductStatus = 'active' | 'pending' | 'rejected' | 'inactive' | (string & {});

export interface SellerProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string | null;
  status: ProductStatus;
}
```

---

**Step 2 — Add `DeleteIcon`** to `src/components/shared/icon-base/constant.tsx`

A 28×28px trash/delete SVG export following the same `React.SVGProps<SVGSVGElement>` + `fill="currentColor"` pattern as existing icons.

---

**Step 3 — Create `StatusBadge`** (`src/components/shared/status-badge.tsx`)

- Server Component
- Uses CVA to map `status` string → variant (success / warning / error / neutral / info)
- Reads i18n translation via `getTranslations('seller-dashboard')` (server-side)
- Falls back to raw status string if i18n key missing
- Fully accessible: `<span>` with descriptive text (no interactive element needed)

```
Props: { status: string; className?: string }
Variants: success | warning | error | neutral | info
```

---

**Step 4 — Create `ProductCard`** (`src/features/seller-dashboard/products/product-card.tsx`)

- Default export, Server Component, function declaration, `interface ProductCardProps`
- Desktop layout (≥md): vertical card — image (402×175px) → header row (title + badge) → category → price with Riyall icon → footer (Eye + Delete buttons)
- Mobile layout (<md): horizontal card — image (80×80px left) + flex-col content right (header row → mt-auto footer)
- All dimensions per `phase-1-ui.md` design tokens
- Icon buttons: `<button type="button" aria-label="...">` with `aria-hidden="true"` on SVG children
- Price uses `text-neutral-950 dark:text-neutral-10` per spec
- Title truncates: `truncate` class

---

**Step 5 — Create `ProductCardSkeleton`** (`src/features/seller-dashboard/products/product-card-skeleton.tsx`)

- Named export, Server Component
- Desktop: `Card` shell (max-w-[434px] min-h-[380px]) with `Skeleton` blocks matching image, title, category, price, footer proportions
- Mobile: horizontal shell (full-width max-h-[124px]) with small square image skeleton + content blocks

---

**Step 6 — Migrate `EmptyProductsState`** to i18n

- Replace hardcoded Arabic strings with `useTranslations('seller-dashboard')` (server — `getTranslations`)
- `aria-label` uses translated `products.emptyTitle` key
- `alt` on `<Image>` uses translated key

---

**Step 7 — Create i18n locale files**

`src/locales/ar/seller-dashboard.json` and `src/locales/en/seller-dashboard.json` (and remaining 6 locales with en as content):

```json
{
  "products": {
    "emptyTitle": "You haven't added any products yet",
    "emptyDescription": "Start selling your products now...",
    "status": {
      "active": "Active",
      "pending": "Pending",
      "rejected": "Rejected",
      "inactive": "Inactive"
    },
    "actions": {
      "view": "View product",
      "delete": "Delete product"
    }
  }
}
```

---

**Step 8 — Update products `page.tsx`**

- Wrap product list in `<Suspense fallback={<ProductCardSkeletonGrid />}>` per constitution PPR rule
- Conditionally render `<EmptyProductsState>` when products array is empty
- Render responsive grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- Each card: `<ProductCard product={p} key={p.id} />`

---

## Verification Plan

### Automated

1. **TypeScript check** (zero errors required):
   ```
   npx tsc --noEmit
   ```
2. **Build check** (zero build errors):
   ```
   npm run build
   ```

### Manual Browser Verification

1. Start dev server (`npm run dev`) and navigate to `/en/dashboard/seller/products`
2. **Desktop (≥1024px viewport)**:
   - Verify grid shows up to 3 columns with 16px gap
   - Verify each card shows image, title + badge header, category, price with Riyall icon, and footer buttons
   - Verify long title truncates with ellipsis inside card boundaries
3. **Mobile (<768px viewport)**:
   - Verify each card renders as horizontal row (80×80 image left, content right, max-height 124px)
   - Verify footer buttons are right-aligned at the bottom of the content column
4. **Dark mode** (toggle via `.dark` class on `<html>`):
   - Verify price text switches to light token (`neutral-10`)
   - Verify skeleton uses `primary-700` background
   - Verify no hardcoded colors remain
5. **RTL** (switch to `/ar/dashboard/seller/products`):
   - Verify layout mirrors correctly (flex-row reversal in RTL)
   - Verify status badge labels appear in Arabic
   - Verify `EmptyProductsState` renders Arabic text from i18n
6. **Empty state**:
   - Temporarily render page with empty products array
   - Verify `EmptyProductsState` appears with translated heading and description
7. **Skeleton**:
   - Temporarily add artificial delay to data loading
   - Verify skeleton cards appear before real cards load, with matching dimensions
8. **Accessibility**:
   - Inspect Delete and View buttons: confirm `aria-label` present, SVG has `aria-hidden="true"`
   - Confirm card uses semantic `<article>` or equivalent landmark

---

## Complexity Tracking

*No constitution violations found. No complexity justification required.*

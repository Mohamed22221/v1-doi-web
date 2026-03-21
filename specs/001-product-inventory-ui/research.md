# Research: Phase 1 — Product Inventory UI

## 1. Existing UI Primitives

### Decision: Use existing `Card`, `Skeleton`, and `EmptyProductsState`
- **`Card`** (`src/components/ui/card.tsx`): CSS-class-based (`card`, `card-header`, `card-footer`, etc.). Used as the card shell per spec.
- **`Skeleton`** (`src/components/ui/skeleton.tsx`): `animate-pulse rounded-md bg-neutral-100 dark:bg-primary-700`. Reuse for skeleton variants.
- **`EmptyProductsState`** (`src/features/seller-dashboard/products/empty-products-state.tsx`): Server Component. Currently hardcoded Arabic; needs i18n migration.

### Decision: `DeleteIcon` does not exist — must be added
- `EyeIcon` ✅ confirmed in `constant.tsx` (line 358)
- `Riyall` icon ✅ confirmed in `constant.tsx` (line 455) — the Saudi Riyal currency icon (21×23px)
- `DeleteIcon` ❌ **not present** — must be added as a new custom SVG export in `constant.tsx`
- **Rationale**: All icons are custom SVGs in `constant.tsx`, not from lucide-react. A trash/delete icon must be added in the same pattern.

---

## 2. Design Token Mapping

### Decision: Direct token usage from `colors.css` & `shadcn.css`

| UI Element | Light Token | Dark Token |
|---|---|---|
| Card title | `text-primary-800` | (same via CSS var) |
| Category | `text-neutral-600` | (dark resolves via semantic var) |
| Price | `text-neutral-950` | `dark:text-neutral-10` |
| Skeleton | `bg-neutral-100` | `dark:bg-primary-700` (built into Skeleton) |
| StatusBadge success | `bg-success-50 text-success-500` | — |
| StatusBadge warning | `bg-warning-100 text-warning-500` | — |
| StatusBadge error | `bg-danger-50 text-danger-500` | — |
| StatusBadge neutral | `bg-neutral-50 text-neutral-600` | — |
| StatusBadge info | `bg-primary-50 text-primary-600` | — |

---

## 3. Responsive Grid Pattern

### Decision: Tailwind CSS grid with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Rationale: Tailwind 4 responsive grid utilities already referenced in project; using `gap-4` (16px = Tailwind `4`) and `max-w-[434px]` per card with `w-full`.
- No custom CSS needed; this is the standard pattern used by other grid sections in the codebase.

---

## 4. i18n — New Namespace

### Decision: Add `seller-dashboard` namespace across all locales
- Existing namespaces: `auth`, `common`, `home`, `seo` across 8 locales (ar, en, de, es, fa, fr, tr, ur).
- A new i18n namespace `seller-dashboard` must be created in each locale.
- Minimum required keys for Phase 1:
  - `products.emptyTitle` — "You haven't added any products yet"
  - `products.emptyDescription` — descriptive subtitle
  - `products.status.active`, `status.pending`, `status.rejected`, `status.inactive`, `status.unknown`
  - `products.actions.view`, `products.actions.delete`

---

## 5. Product Data Type

### Decision: Define `SellerProduct` interface in `src/lib/api/types/seller-product.ts`
- Does not exist yet. Must be created per constitution Technical Standards rule.
- Shape: `{ id: string; title: string; category: string; price: number; imageUrl: string | null; status: ProductStatus }`
- `ProductStatus` union: `'active' | 'pending' | 'rejected' | 'inactive' | string`

---

## 6. Page & Data Architecture

### Decision: Server Component page with static mock data for Phase 1
- Phase 1 is UI-only. The page fetches no real API data.
- Products page at `src/app/[locale]/(seller-dashboard)/dashboard/seller/products/page.tsx` will receive a `products` array as a prop (or use a hardcoded mock array) to drive rendering.
- `<Suspense>` + skeleton wrapping per constitution PPR rule.
- Rationale: Keeps Phase 1 strictly UI and avoids coupling to unimplemented API endpoints.

---

## 7. `StatusBadge` — Shared Component Location

### Decision: `src/components/shared/status-badge.tsx`
- Per spec FR-004 and `phase-1-ui.md`: create as a shared component (not feature-scoped).
- Accepts `status: string`, resolves color variant and translation key internally.
- Uses semantic bg/text tokens. CVA is appropriate here for variant mapping.

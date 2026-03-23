# Implementation Plan: Seller Products Integration

**Branch**: `002-seller-products-integration` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-seller-products-integration/spec.md`

## Summary

Replace mock product data in the Seller Dashboard with real API data from `/api/v1/seller/products`. The integration follows the project's established pattern: `apiClient` inside a `serverActionWrapper` Server Action, consumed by a `useQuery` hook in a new `"use client"` Products List component, with SSR prefetch via `HydrationBoundary` in the Server Component page. Dynamic filtering (by `productSellType`) and pagination (by `page`) are driven by URL search params, and the existing `ProductsFilter` component already handles URL updates.

## Technical Context

**Language/Version**: TypeScript 5 / Next.js 15 (App Router)
**Primary Dependencies**: `@tanstack/react-query` v5, `next/navigation`, `zod`, `apiClient` singleton
**Storage**: N/A (read-only; no database, no local persistence)
**Testing**: Manual browser testing (no automated test suite exists for this feature area)
**Target Platform**: Web (Server + Client: Next.js SSR + React hydration)
**Performance Goals**: Zero loading state on first page view (SSR); instant cache recall on revisited filters (< 50ms perceived)
**Constraints**: Constitution §1.1 (pages stay server components), §2.1 (apiClient in Server Actions only), §2.3 (useQuery wrapping Server Action), §14 (types in `src/lib/api/types/`)
**Scale/Scope**: Single seller's product list, paginated, filtered by sell type

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | Notes |
|---|---|---|
| §1.1 Server-First | ✅ | `page.tsx` stays a Server Component; UI logic extracted to `products-list.tsx` |
| §1.2 Function Declarations | ✅ | All new components use `export function` / `export default function` |
| §1.4 No Barrel Files | ✅ | Direct imports only — no `index.ts` created |
| §2.1 apiClient in Server Actions | ✅ | `getSellerProductsAction` wraps `apiClient.get()` in `serverActionWrapper` |
| §2.3 useQuery in Client Hooks | ✅ | `use-seller-products.ts` uses raw `useQuery` (pattern from `use-seller.ts`) |
| §5.2 i18n | ✅ | No new user-facing strings required; existing locale keys are reused |
| §7 File Naming | ✅ | All new files are kebab-case |
| §9 Accessibility | ✅ | Loading state uses `aria-busy`; list uses semantic `<ul>/<li>` or existing `ProductCard` |
| §14 Types Location | ✅ | `seller-product.ts` is the single source of truth in `src/lib/api/types/` |
| Art. III Cross-Tenant | ✅ | `apiClient` sends seller's own Bearer token; no server-side user ID scoping needed (backend enforces isolation) |

**No violations. Gates PASSED.**

## Project Structure

### Documentation (this feature)

```text
specs/002-seller-products-integration/
├── plan.md          ← this file
├── research.md      ← Phase 0 output
├── data-model.md    ← Phase 1 output
└── tasks.md         ← Phase 2 output (/speckit.tasks - not yet created)
```

### Source Code Touch Points

```text
src/lib/api/types/
└── seller-product.ts             [MODIFY] — rewrite to real API fields

src/lib/api/constants/
├── api-constant.ts               [MODIFY] — add SELLER.PRODUCTS endpoint
└── api-keys-constant.ts          [MODIFY] — add SELLER_PRODUCTS key factory

src/lib/api/actions/
└── products.ts                   [NEW] — getSellerProductsAction Server Action

src/lib/api/hooks/
└── use-seller-products.ts        [NEW] — useSellerProductsQuery hook

src/features/seller-dashboard/products/
├── products-list.tsx             [NEW] — "use client" list component (query + rendering)
└── product-card.tsx              [MODIFY] — update prop type to new SellerProduct interface

src/app/[locale]/(seller-dashboard)/dashboard/seller/products/
└── page.tsx                      [MODIFY] — add HydrationBoundary + SSR prefetch, remove mock data
```

## Implementation Phases

### Phase 1: Type Definitions

**Goal**: Update `seller-product.ts` to reflect real API response shape.

Changes to `src/lib/api/types/seller-product.ts`:
- Rename `ProductStatus` → `ProductEffectiveStatus`
- Remove `category` and `imageUrl` fields
- Add `description: string`, `effectiveStatus: ProductEffectiveStatus`, `images: ProductImage[]`
- Add `ProductImage` interface `{ url: string }`
- Add `SellerProductsFilters` interface `{ productSellType?: string; page?: number }`

### Phase 2: API Constants

**Goal**: Register new endpoint and query key factory.

Changes to `src/lib/api/constants/api-constant.ts`:
- Add `PRODUCTS: { SELLER_LIST: "/api/v1/seller/products" }` under the `SELLER` namespace or as a top-level `PRODUCTS` key.

Changes to `src/lib/api/constants/api-keys-constant.ts`:
- Add `SELLER_PRODUCTS` factory:
  ```ts
  SELLER_PRODUCTS: {
    all: () => ["seller-products"] as const,
    list: (filters: SellerProductsFilters) => ["seller-products", "list", filters] as const,
  }
  ```

### Phase 3: Server Action

**Goal**: Create `getSellerProductsAction` that calls the API through `apiClient` and returns `ActionState`.

New file `src/lib/api/actions/products.ts`:
```ts
"use server";
export async function getSellerProductsAction(
  filters: SellerProductsFilters
): Promise<ActionState<TAPIResponseItems<SellerProduct[]>["data"]>>
```
- Builds query string from `filters` (omitting undefined values)
- Calls `apiClient.get<TAPIResponseItems<SellerProduct[]>["data"]>(endpoint)`
- Wrapped in `serverActionWrapper`

### Phase 4: Client Query Hook

**Goal**: Create `useSellerProductsQuery` hook.

New file `src/lib/api/hooks/use-seller-products.ts`:
```ts
"use client";
export function useSellerProductsQuery(filters: SellerProductsFilters) {
  return useQuery({
    queryKey: ReactQueryKeys.SELLER_PRODUCTS.list(filters),
    queryFn: async () => {
      const result = await getSellerProductsAction(filters);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}
```

### Phase 5: Products List Client Component

**Goal**: Create `products-list.tsx` as a `"use client"` component that consumes the query and handles all conditional rendering.

New file `src/features/seller-dashboard/products/products-list.tsx`:
- `"use client"` directive
- Props: `{ initialFilters: SellerProductsFilters; locale: Locale }`
- Reads current `searchParams` via `useSearchParams()` (live client-side updates on filter change)
- Calls `useSellerProductsQuery` with active filters
- When `isLoading`/`isFetching` + no data: renders `<ProductCardSkeletonGrid count={6} />`
- When `data.items.length === 0`: renders `<EmptyProductsState locale={locale} />`
- Otherwise: renders grid of `<ProductCard>` components with `aria-busy` on the wrapper during background refetch

### Phase 6: Product Card Type Update

**Goal**: Update `product-card.tsx` to accept the new `SellerProduct` type.

Changes to `src/features/seller-dashboard/products/product-card.tsx`:
- Update `ProductCardProps` interface to use new `SellerProduct` (with `images`, `effectiveStatus`, `description`)
- Replace `product.imageUrl` with `product.images[0]?.url ?? null` fallback
- Replace `product.status` with `product.effectiveStatus`
- Replace `product.category` with `product.description`

### Phase 7: Page SSR Integration

**Goal**: Update `page.tsx` to prefetch the query and wrap `ProductsList` in `HydrationBoundary`.

Changes to `src/app/[locale]/(seller-dashboard)/dashboard/seller/products/page.tsx`:
- Accept and `await searchParams`
- Extract `productSellType` and `page` from searchParams → build `SellerProductsFilters`
- Call `getQueryClient()` → `queryClient.prefetchQuery({ queryKey, queryFn })` with the same key/action as the hook
- Wrap `<ProductsList>` in `<HydrationBoundary state={dehydrate(queryClient)}>`
- Remove all mock data

## Complexity Tracking

No constitution violations. No complexity justifications required.

## Verification Plan

### Manual Verification

1. **Real product list renders (SSR)**:
   - Start dev server: `npm run dev` (already running)
   - Log in as a seller, navigate to `http://localhost:3000/ar/dashboard/seller/products`
   - Verify: products appear immediately without a loading spinner on first load
   - Verify: product cards show correct title, description, price (in ﷼), status badge, and image (or fallback)

2. **Filter routing works**:
   - Click a filter tab (e.g., "مزاد")
   - Verify: URL updates to `?productSellType=auction`
   - Verify: product list updates to show only products of that type

3. **Empty state**:
   - Click a filter tab that returns no products
   - Verify: empty state component appears (no blank white area)

4. **Skeleton on client-side fetch**:
   - Open DevTools → Network → throttle to "Slow 3G"
   - Click a new filter tab
   - Verify: skeleton cards appear while data is loading, then replaced by real cards

5. **Cache recall (instant)**:
   - Visit filter A (data loads), visit filter B (data loads), click back to filter A
   - Verify: filter A's results appear instantly without a loading skeleton

6. **TypeScript compilation**:
   - Run `npx tsc --noEmit` in `d:\doi-web` — no type errors expected

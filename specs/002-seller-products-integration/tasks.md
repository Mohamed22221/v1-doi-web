# Tasks: Seller Products Integration

**Input**: Design documents from `/specs/002-seller-products-integration/`
**Branch**: `002-seller-products-integration`
**Spec**: 5 user stories (US1–US5, priorities P1–P3)
**Plan**: 7 implementation phases — types → constants → server action → hook → list component → card update → page SSR

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No new project initialization needed — this is an integration into an existing codebase. Setup tasks cover shared typing and constant infrastructure that ALL user stories depend on.

**⚠️ CRITICAL**: Complete this phase before any user story work begins.

- [x] T001 Rewrite `src/lib/api/types/seller-product.ts`: rename `ProductStatus` → `ProductEffectiveStatus`, remove `category`/`imageUrl`, add `ProductImage { url: string }`, `SellerProductsFilters { productSellType?: string; page?: number; limit?: number }`, and update `SellerProduct` to use `description`, `effectiveStatus`, `images: ProductImage[]`. Default values: `page = 1`, `limit = 10` — these are passed to the API but **no pagination UI controls are rendered in this phase**
- [x] T002 [P] Add `SELLER_PRODUCTS` API query key factory to `src/lib/api/constants/api-keys-constant.ts`: `all: () => ["seller-products"]` and `list: (filters: SellerProductsFilters) => ["seller-products", "list", filters]`
- [x] T003 [P] Add the seller products endpoint to `src/lib/api/constants/api-constant.ts`: `SELLER: { ..., PRODUCTS: { LIST: "/api/v1/seller/products" } }`

**Checkpoint**: Types and constants are correct. TypeScript compiles (`npx tsc --noEmit`). No user-facing change yet.

---

## Phase 2: Foundational (Data Layer)

**Purpose**: Server Action and client query hook — the blocking data-access foundation all UI stories depend on.

**⚠️ CRITICAL**: No UI story work can begin until this phase is complete.

- [x] T004 Create `src/lib/api/actions/products.ts` as a `"use server"` Server Action file. Implement `getSellerProductsAction(filters: SellerProductsFilters): Promise<ActionState<TAPIResponseItems<SellerProduct[]>["data"]>>` — build endpoint URL with query string from filters (omit undefined values), call `apiClient.get()`, wrap entirely in `serverActionWrapper`
- [x] T005 Create `src/lib/api/hooks/use-seller-products.ts` as a `"use client"` hook file. Implement `useSellerProductsQuery(filters: SellerProductsFilters)` using raw `useQuery` from `@tanstack/react-query`: `queryKey` from `ReactQueryKeys.SELLER_PRODUCTS.list(filters)`, `queryFn` calls `getSellerProductsAction(filters)` and throws `new Error(result.error)` if `!result.success`, returns `result.data`

**Checkpoint**: Server Action and hook are type-correct. TypeScript compiles with no errors.

---

## Phase 3: User Story 1 — Secure Product Data Display (P1) 🎯 MVP

**Goal**: Authenticated seller sees only their own products, each card showing correct image (or fallback), status badge, title, description, price (﷼).

**Independent Test**: Log in as a seller, navigate to `/ar/dashboard/seller/products`. Verify product cards render with accurate data. Verify a seller cannot see another seller's data (enforced by token on the action).

### Implementation

- [x] T006 [US1] Update `src/features/seller-dashboard/products/product-card.tsx`: change `ProductCardProps` interface to accept the new `SellerProduct` type; replace `product.imageUrl` with `product.images[0]?.url ?? null`, replace `product.status` with `product.effectiveStatus`, replace `product.category` with `product.description`
- [x] T007 [US1] Create `src/features/seller-dashboard/products/products-list.tsx` as a `"use client"` component. Props: `{ locale: Locale }`. Read `productSellType` and `page` from `useSearchParams()`. Call `useSellerProductsQuery({ productSellType, page: Number(page) || 1, limit: 10 })`. Render using the **existing layout structure from `page.tsx`** (keep the `<div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 ...">`  grid div — do NOT switch to `<ul>/<li>`): show `<ProductCardSkeletonGrid count={6} />` when `isLoading || isFetching` and no cached data; show `<EmptyProductsState locale={locale} />` when `data.items.length === 0`; otherwise map `data.items` into `<ProductCard>` components using the existing grid div wrapper. Set `aria-busy={isFetching}` on the outer grid wrapper during background refetches.
- [x] T008 [US1] Update `src/app/[locale]/(seller-dashboard)/dashboard/seller/products/page.tsx`: await and destructure `searchParams` to get `productSellType` and `page`; call `getQueryClient()`, prefetch using `queryClient.prefetchQuery({ queryKey: ReactQueryKeys.SELLER_PRODUCTS.list(filters), queryFn: () => getSellerProductsAction(filters).then(r => { if (!r.success) throw new Error(r.error); return r.data; }) })`; **mandatorily** wrap `<ProductsList locale={locale} />` in **both** `<HydrationBoundary state={dehydrate(queryClient)}>` and `<Suspense fallback={<ProductCardSkeletonGrid count={6} />}>` — the `<Suspense>` boundary is **required** by Next.js App Router for any component using `useSearchParams()` and must not be omitted. Remove all mock data and the `mockProducts` array.
- [x] T008a [US1] Create `src/app/[locale]/(seller-dashboard)/dashboard/seller/products/error.tsx` as a Next.js error boundary component. It **must** use `"use client"` directive (required by Next.js for `error.tsx`). Accept the standard `{ error: Error; reset: () => void }` props. Use `getApiErrorMessage(error)` from `@lib/api/error` to extract the localized error string. Display the message in a visually clear error region (using existing semantic Tailwind classes: `bg-destructive/10`, `text-destructive`, `border-destructive/20`). Provide a retry `<button>` that calls `reset()`. Do **not** build a custom inline alert inside `products-list.tsx` — this `error.tsx` file is the single error boundary for the entire products route segment.

**Checkpoint**: Navigate to seller products page as authenticated seller. Products from the real API appear without a loading spinner on first load. Product cards show real images (or fallback), status badges, titles, descriptions, and prices in ﷼.

---

## Phase 4: User Story 2 — Instant Page Load via SSR (P2)

**Goal**: Products are visible in the initial HTML response — no client-side loading spinner on first visit.

**Independent Test**: Disable JavaScript in the browser, navigate to `/ar/dashboard/seller/products` — products must still be visible in the page source.

**Note**: T008 (page.tsx HydrationBoundary) directly delivers this story. After T008 is complete, verify SSR works correctly:

- [/] T009 [US2] Verify SSR prefetch: open DevTools → Network → confirm the HTML response contains rendered product card markup (not just a skeleton shell). If products are absent in initial HTML, debug the `prefetchQuery` call in `page.tsx` — ensure the `queryKey` in `prefetchQuery` exactly matches `ReactQueryKeys.SELLER_PRODUCTS.list(filters)` used in the hook (key mismatch causes hydration miss and client-side refetch).

**Checkpoint**: Products appear in page source HTML. `staleTime: 5000ms` in `query-client.ts` prevents immediate client re-fetch after hydration.

---

## Phase 5: User Story 3 — Dynamic Filtering by Product Type (P2)

**Goal**: Clicking a filter tab updates the URL `productSellType` param and the product list refreshes to show matching products.

**Independent Test**: Click the "مزاد" (auction) filter tab. URL should update to `?productSellType=auction`. Product list should show only auction-type products. Clicking a filter that returns 0 results shows the empty state.

**Note**: `products-filter.tsx` already handles URL updates via `startTransition` + `router.replace`. The `products-list.tsx` created in T007 reads `useSearchParams()` and re-executes the query on URL change. Verify the end-to-end wiring:

- [/] T010 [US3] Verify filter routing end-to-end: confirm `products-list.tsx` calls `useSearchParams()` correctly and that the `productSellType` value is passed into `useSellerProductsQuery`. Confirm query re-executes when the URL param changes. The `<Suspense>` boundary added in T008 is already mandatory — confirm `ProductsFilter` and `ProductsList` are wrapped within it and share the same `searchParams` context correctly.

**Checkpoint**: All filter tabs correctly constrain the product list. Empty state appears when a filter has no results.

---

## Phase 6: User Story 4 — Instant Cache Recall on Repeated Filter Visits (P3)

**Goal**: Revisiting a previously viewed filter tab shows cached results instantly with no skeleton.

**Independent Test**: Visit filter A (data loads), visit filter B (data loads), click back to filter A — results appear immediately, no skeleton visible.

**Note**: TanStack Query's `staleTime: 5000ms` (configured globally in `query-client.ts`) and the filter-scoped query key from `ReactQueryKeys.SELLER_PRODUCTS.list(filters)` together provide this behavior with no additional implementation. This phase is a verification-only checkpoint:

- [/] T011 [US4] Verify cache recall: using browser DevTools Network throttled to "Slow 3G", navigate between two different filter tabs multiple times. Confirm the second visit to a previously loaded filter shows results instantly (no skeleton, no new network request). If a cache miss occurs, inspect whether the `queryKey` structure in the hook matches the prefetch key exactly (key shape must be identical).

**Checkpoint**: Cache recall works. No skeleton on revisited filters.

---

## Phase 7: User Story 5 — Loading Skeleton During Client-Side Fetch (P3)

**Goal**: When switching to an uncached filter, skeleton placeholder cards appear during the fetch, then are replaced by real cards.

**Independent Test**: Throttle network to "Slow 3G" in DevTools. Click a filter tab not previously visited. Skeleton cards appear. After data loads, real product cards replace them.

**Note**: The skeleton rendering logic is implemented in T007 (`products-list.tsx`). This phase is a verification checkpoint:

- [x] T012 [US5] Verify skeleton behavior: with throttled network, click a new filter tab. Confirm `<ProductCardSkeletonGrid count={6} />` appears during loading. Confirm it disappears and real cards render when data arrives. Confirm `aria-busy="true"` is set on the list wrapper during any background refetch (e.g., switching to a cached-but-stale filter).

**Checkpoint**: Skeleton and real-data transitions work correctly under network delay.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [x] T013 [P] TypeScript compile check: run `npx tsc --noEmit` in `d:\doi-web` — confirm zero type errors across all modified and new files
- [x] T014 [P] Accessibility audit: confirm `products-list.tsx` uses `aria-busy={isFetching}` on the outer grid `<div>` wrapper during fetches, that `EmptyProductsState` has an appropriate accessible message, and that `ProductCardSkeletonGrid` does not expose interactive elements during loading. Confirm `error.tsx` retry button has an `aria-label` and is keyboard-focusable.
- [x] T015 Remove any remaining unused imports across modified files: `page.tsx` (remove mock data import of `SellerProduct` type if now imported differently), `product-card.tsx` (remove any orphaned field references)
- [x] T016 Verify dark mode: confirm product cards, skeleton, and empty state render correctly under `.dark` class — all colors must use semantic Tailwind classes (`bg-card`, `text-foreground`, etc.), no hardcoded hex values
- [x] T017 [BUG] Fix `use cache` error in Client Bundle: convert `src/components/shared/status-badge.tsx` and `src/features/seller-dashboard/products/empty-products-state.tsx` to `"use client"`. Replace `getTranslation` from `@lib/i18n/server` with `useTranslation` from `@lib/i18n/client`. This resolves the boundary violations where Client Components (ProductCard and ProductsList) were importing Server Components that pull in server-only i18n logic.
- [x] T018 [BUG] Fix `getQueryClient` error: Remove `"use client"` from `src/lib/api/query-client.ts`. This utility contains server-safe logic (`typeof window === 'undefined'`) and must be importable by both Server and Client environments.
- [x] T019 [LINT] Resolve dependency cycles and lint errors: address cycles between `actions/auth.ts` and `actions/seller.ts` if possible; rename `update_routes.js` to `update-routes.js`.
- [x] T020 [BUG] Configure image hostname: add `doueh.com` to `remotePatterns` in `next.config.ts` to allow loading product images from the backend.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately. T002 and T003 are parallel.
- **Phase 2 (Foundational)**: Depends on Phase 1 complete (T001, T002, T003). T004 and T005 can run in parallel (different files).
- **Phase 3 (US1 — MVP)**: Depends on Phase 2 complete. T006, T007 can run in parallel; T008 depends on T006 + T007; T008a depends on T008 complete (after `error.tsx` route segment exists).
- **Phase 4 (US2 — SSR)**: T009 depends on T008 complete.
- **Phase 5 (US3 — Filtering)**: T010 depends on T007 + T008 complete.
- **Phase 6 (US4 — Cache)**: T011 depends on T010 complete.
- **Phase 7 (US5 — Skeleton)**: T012 depends on T007 complete (can run in parallel with T009–T011).
- **Phase 8 (Polish)**: Depends on all story phases complete. T013, T014, T015, T016 are all parallel.

### Task Dependency Graph

```
T001 ──┐
T002 ──┤→ T004 ──→ T008 ──→ T009 (US2)
T003 ──┘→ T005 ──┐           ↓
                  └──→ T007 ──→ T010 (US3) ──→ T011 (US4)
                        ↓
                       T006 ──→ T008
                        ↓
                       T012 (US5) [parallel with T009–T011]

T013, T014, T015, T016 [all parallel, after all phases]
```

---

## Parallel Execution Examples

```
# Phase 1 — run together:
T002: api-keys-constant.ts
T003: api-constant.ts

# Phase 2 — run together:
T004: products.ts (server action)
T005: use-seller-products.ts (hook)

# Phase 3 — run together, then T008:
T006: product-card.tsx
T007: products-list.tsx
# Then: T008: page.tsx (depends on T006 + T007)

# Verification phases — parallel after T008:
T009 (SSR), T012 (skeleton)

# Phase 8 — all parallel:
T013: tsc check
T014: a11y audit
T015: cleanup
T016: dark mode
```

---

## Implementation Strategy

### MVP First (User Story 1 — Phases 1–3)

1. Complete **Phase 1** (T001–T003): types + constants
2. Complete **Phase 2** (T004–T005): server action + hook
3. Complete **Phase 3** (T006–T008): card update + list component + page wiring
4. **STOP and VALIDATE**: Navigate to the seller products page. Real data appears. Cards show correct fields. No mock data remains.
5. This MVP (phases 1–3) fully delivers US1 and is a shippable increment.

### Incremental Delivery

- After MVP: verify T009 (SSR), T010 (filtering), T011–T012 (cache + skeleton) — all validation-only, no new code
- Complete Phase 8 (polish) before merging

### Single Developer Flow (sequential)

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T008a → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016

---

## Notes

- [P] tasks operate on different files — safe to run in parallel
- T009–T012 are verification-only tasks — no new code, just testing the behavior of earlier implementations
- US2, US3, US4, US5 are largely delivered by the Phase 3 implementation; their phases exist to validate specific behavioral guarantees
- Commit after Phase 3 (MVP complete) and after Phase 8 (polish complete)
- `staleTime: 5000ms` in `query-client.ts` is the mechanism for both SSR cache hydration and cache recall — do not reduce it
- **Pagination**: The data layer (T001, T004, T005) accepts `page` and `limit` params (defaults: `page=1`, `limit=10`). No pagination UI controls are built in this phase — `totalPages` from the API response is available for a future phase.
- **Error handling**: `error.tsx` (T008a) is the sole error boundary for the products route segment. Do not add inline error UI inside `products-list.tsx`.
- **UI structure**: `products-list.tsx` preserves the existing `<div className="grid ...">` layout from `page.tsx`. Do not replace with `<ul>/<li>` elements.

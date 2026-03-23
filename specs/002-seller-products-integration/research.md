# Research: Seller Products Integration

**Branch**: `002-seller-products-integration` | **Date**: 2026-03-23

---

## 1. API Client Pattern

**Decision**: Use the singleton `apiClient` from `src/lib/api/api.ts` inside Server Actions only.

**Rationale**: The `apiClient` is an isomorphic singleton that handles:
- Token retrieval from cookies (server-side) or `document.cookie` (client-side)
- Automatic `401` interception → token refresh → retry
- Request deduplication and optional in-memory caching
- Zod schema validation of `response.data`
- Standardized `ApiErrorClass` error normalization

No raw `fetch` calls are needed. The `apiClient.get<T>()` convenience method is sufficient.

**Pattern confirmed from**: `src/lib/api/actions/seller.ts` — `apiClient.get<T>(endpoint)` inside `serverActionWrapper()`.

---

## 2. Server Action Pattern

**Decision**: Wrap all API calls in `serverActionWrapper` from `src/lib/api/action-utils.ts`.

**Rationale**: `serverActionWrapper` provides a standardized `ActionState<T>` return type (`{ success: true; data: T } | { success: false; error: string }`), which the React Query hook consumes by throwing on failure. This enforces consistent error propagation.

**File location**: `src/lib/api/actions/seller.ts` (product actions go in a new `products.ts` file there)

**Signature pattern**:
```ts
export async function getSellerProductsAction(
  filters: SellerProductsFilters
): Promise<ActionState<TAPIResponseItems<SellerProduct[]>["data"]>>
```

---

## 3. Client Query Hook Pattern

**Decision**: Use raw `useQuery` from `@tanstack/react-query` wrapping the Server Action — NOT a custom `useAppQuery` wrapper (none exists in codebase).

**Rationale**: `useAppMutation` exists for mutations. For queries, `use-seller.ts:useSellerStatus()` uses raw `useQuery` directly, calling the Server Action inside `queryFn` and throwing if `result.success === false`. This is the established project pattern.

**Pattern confirmed from**: `src/lib/api/hooks/use-seller.ts` lines 59–72.

**Hook location**: `src/lib/api/hooks/use-seller-products.ts` (new file)

---

## 4. SSR Prefetch Pattern (HydrationBoundary)

**Decision**: Use `getQueryClient()` from `src/lib/api/query-client.ts` in the Server Component page, call `queryClient.prefetchQuery(...)`, then wrap the client list component in `<HydrationBoundary state={dehydrate(queryClient)}>`.

**Rationale**:
- `getQueryClient()` on the server always creates a fresh `QueryClient` (never shared across requests).
- `staleTime: 5000ms` is set by default, preventing the client from immediately refetching after hydration.
- `HydrationBoundary` from `@tanstack/react-query` serializes the prefetched data into HTML.

**Pattern to adopt from**: Next.js TanStack Query SSR docs + `query-client.ts` comments.

---

## 5. Query Key Strategy

**Decision**: Add a typed key factory to `src/lib/api/constants/api-keys-constant.ts`.

**Rationale**: The `api-keys-constant.ts` file currently exports an empty `ReactQueryKeys` object. For seller products, query keys must include `filters` (productSellType, page) to scope cache entries per filter. This avoids stale data cross-contamination between filter tabs.

**Key structure**:
```ts
SELLER_PRODUCTS: {
  all: () => ["seller-products"],
  list: (filters: SellerProductsFilters) => ["seller-products", "list", filters],
}
```

---

## 6. Type Strategy

**Decision**: Rewrite `src/lib/api/types/seller-product.ts` to match the real API response schema. Remove the mock-era flat fields.

**Rationale**: The current type uses `category: string`, `imageUrl: string | null`, and `status: ProductStatus` — all derived from Phase 1 mock data. The real API returns `images: Array<{ url: string }>`, `effectiveStatus`, `description`, and no `category` field.

**New interface** (see `data-model.md`): `SellerProduct` with `id`, `title`, `description`, `price`, `effectiveStatus`, `images`.

**ProductEffectiveStatus**: Same string union as current `ProductStatus` (`'active' | 'pending' | 'rejected' | 'inactive' | 'sold'`) — rename to align with API field name.

---

## 7. API Endpoint

**Decision**: Add `PRODUCTS: { SELLER_LIST: "/api/v1/seller/products" }` to `src/lib/api/constants/api-constant.ts`.

**Rationale**: Centralizing endpoints in `API_ENDPOINTS` is the established pattern (see `api-constant.ts`). The endpoint path comes from the phase-2-integration.md spec: `/api/v1/seller/products` and accepts `productSellType` and `page` query parameters.

---

## 8. UI Component Split

**Decision**: Extract a new `products-list.tsx` Client Component from `page.tsx`. Keep `page.tsx` as a pure Server Component.

**Rationale**:
- Constitution rule §1.1: pages must remain Server Components. Interactive/loading-state logic lives in extracted client leaf components.
- `products-filter.tsx` is already a `"use client"` component handling URL navigation — no changes needed there.
- The loading/empty/list rendering logic must live in a `"use client"` component that consumes the `useSellerProductsQuery` hook.
- `product-card.tsx` receives a `SellerProduct` prop — update its interface to the new type.

---

## 9. Pagination

**Decision**: Support a `page` URL query parameter alongside `productSellType`.

**Rationale**: `TAPIResponseItems` already includes `TPaginationSimple` (`page`, `limit`, `total`, `totalPages`). The `page.tsx` SSR prefetch and the client hook both consume `searchParams.page` (defaulting to `1`).

---

## Alternatives Considered

| Decision | Alternative | Rejected Because |
|---|---|---|
| Server Action wraps `apiClient` | Direct `fetch` in hook | Constitution §2.1 mandates `apiClient` inside Server Actions only |
| `useQuery` in hooks | Custom `useAppQuery` | No `useAppQuery` exists; `use-seller.ts` uses raw `useQuery` — consistent with codebase |
| New `products-list.tsx` client component | Convert `page.tsx` to client | Violates Constitution §1.1 (pages must be Server Components) |
| Rewrite `seller-product.ts` types | Add new file | Types must have single source of truth per Constitution §14 |

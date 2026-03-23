# Research: Infinite Scroll Implementation

## Decisions

### 1. Unified Hook for Infinite Query
- **Decision**: Update `src/lib/api/hooks/use-seller-products.ts` to include an infinite query hook.
- **Rationale**: Keeps all product-related fetching logic in one place.
- **Alternatives**: Creating a separate `use-seller-products-infinite.ts`. Rejected to reduce file clutter.

### 2. Intersection Observer Configuration
- **Decision**: Use `react-intersection-observer` with `rootMargin: '400px'`.
- **Rationale**: "400px" provides enough buffer for typical network latency, ensuring the next page is loaded before the user sees the bottom.
- **Alternatives**: Using a lower value like `100px`. Rejected as it may result in visible loading states on faster scrolls.

### 3. Loading UI Strategy
- **Decision**: Append `ProductCardSkeletonGrid` at the end of the list when `isFetchingNextPage` is true.
- **Rationale**: Direct user request for "Seamless Skeleton" that does not disrupt current view.
- **Alternatives**: Showing a single global spinner at the bottom. Rejected as skeletons provide a better structural preview.

## Best Practices
- **Standardized Pagination**: Uses `TPaginationSimple` from `src/lib/api/types/api.ts`.
- **Zod Validation**: Response will be validated via the `apiClient` schema (if defined).
- **Accessibility**: Loading states will be announced via `aria-live`.

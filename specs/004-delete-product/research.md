# Research: Seller Product Deletion

## Decision 1: API Integration Pattern
- **Decision**: Implement `deleteSellerProductAction` in `src/lib/api/actions/products.ts`.
- **Rationale**: Aligns with existing product-related server actions and uses the standard `serverActionWrapper` and `apiClient`.
- **Alternatives considered**: Direct `apiClient` call in hooks (rejected by Constitution rule 2.3).

## Decision 2: Optimistic UI Strategy
- **Decision**: Use `useAppMutation` with `onMutate`, `onError`, and `onSettled` in a custom hook `useDeleteProduct`.
- **Rationale**: Follows TanStack Query best practices for optimistic updates, ensuring a "zero-latency" feel as required by the success criteria.
- **Alternatives considered**: Standard mutation without optimistic update (rejected by Spec SC-001).

## Decision 3: Internationalization (i18n)
- **Decision**: Add deletion-related strings to `src/locales/ar/common.json` under a new `product-actions` section.
- **Rationale**: Centralizes common action-related text.
- **Alternatives considered**: Creating a new `product.json` locale file (kept as backup if section grows too large).

## Decision 4: Responsive UI Strategy
- **Decision**: Use a shared `DeleteProductContent` component rendered inside `Dialog` (Desktop) or `Drawer` (Mobile).
- **Rationale**: Maximizes code reuse while respecting platform-specific UI patterns (as specified in the design plan).
- **Alternatives considered**: Separate components for Dialog and Drawer content (rejected due to duplication).

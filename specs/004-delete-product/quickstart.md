# Quickstart: Delete Product Feature

## Prerequisites
- Node.js environment with Next.js 16.
- `apiClient` correctly configured in `src/lib/api/api.ts`.

## Implementation Steps

1. **Backend Integration**:
   - Add `deleteSellerProductAction` to `src/lib/api/actions/products.ts`.
   - Use `serverActionWrapper` to handle errors.

2. **Mutation Hook**:
   - Add `useDeleteProductMutation` to `src/lib/api/hooks/use-seller-products.ts`.
   - Implement optimistic updates using `onMutate`, `onError`, and `onSettled`.

3. **UI Implementation**:
   - Create `DeleteProductContent` component for the shared message and actions.
   - Use `Dialog` (Desktop) and `Drawer` (Mobile) to wrap the content.

4. **i18n**:
   - Add Arabic translations to `src/locales/ar/common.json`.

## Verification
- Resize browser to test responsive layout (midpoint 768px).
- Verify optimistic cache update by checking if product disappears before network request finishes.
- Verify error handling by simulating network failure.

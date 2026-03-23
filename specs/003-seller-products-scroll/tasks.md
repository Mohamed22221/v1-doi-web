# Tasks: Seller Products Infinite Scroll

**Input**: Design documents from `/specs/003-seller-products-scroll/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initial verification of environment

- [x] T001 Verify feature branch `003-seller-products-scroll` is active and specs are accessible

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for the infinite query

- [x] T002 [P] Verify `TAPIResponseItems` and `TPaginationSimple` in `src/lib/api/types/api.ts`
- [x] T003 [P] Verify `ReactQueryKeys.SELLER_PRODUCTS.list` exists in `src/lib/api/constants/api-keys-constant.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Smooth Browsing (Priority: P1) 🎯 MVP

**Goal**: Enable basic infinite scroll with early fetching and seamless skeletons.

**Independent Test**: Scroll through the list and observe auto-loading before reaching the bottom.

### Implementation for User Story 1

- [x] T004 [US1] Implement `useSellerProductsInfiniteQuery` using `useInfiniteQuery` (v5) in `src/lib/api/hooks/use-seller-products.ts`
- [x] T005 [US1] Update `src/features/seller-dashboard/products/products-list.tsx` to switch from `useSellerProductsQuery` to `useSellerProductsInfiniteQuery`
- [x] T006 [US1] Implement `useInView` with `rootMargin: '400px'` in `src/features/seller-dashboard/products/products-list.tsx` for early fetching
- [x] T007 [US1] Update render logic in `src/features/seller-dashboard/products/products-list.tsx` to flatMap `data.pages` and append skeletons via `isFetchingNextPage`
- [x] T008 [US1] Implement "End of List" UI in `src/features/seller-dashboard/products/products-list.tsx` (hide sentinel and show "No more products" message when `hasNextPage` is false)

**Checkpoint**: User Story 1 functional with requested UX improvements.

---

## Phase 4: User Story 2 - Filtered Infinite Scroll (Priority: P2)

**Goal**: Ensure filters preserve the infinite scroll state.

**Independent Test**: Apply a status filter and verify infinite scroll loads the correct subset of products.

### Implementation for User Story 2

- [x] T009 [US2] Synchronize `nuqs` filter state with `useSellerProductsInfiniteQuery` parameters in `src/features/seller-dashboard/products/products-list.tsx`

---

## Phase 5: Polish & UX Hardening

**Purpose**: Final accessibility and validation

- [x] T010 [P] Add `aria-live="polite"` to the loading sentinel and "End of List" message in `src/features/seller-dashboard/products/products-list.tsx`
- [x] T011 Run `quickstart.md` validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 - Blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2. **MVP**.
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion (for base scroll logic).
- **Polish (Phase 5)**: Final verification.

### Parallel Opportunities

- T002 and T003 can be verified in parallel.
- T009 can be implemented concurrently with T007 if refactoring allows.

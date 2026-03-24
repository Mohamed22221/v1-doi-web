---
description: "Task list for Seller Product Deletion Implementation"
---

# Tasks: Seller Product Deletion Modal & Integration

**Input**: Design documents from `/specs/004-delete-product/`
**Prerequisites**: `plan.md`, `spec.md`, `data-model.md`, `contracts/delete-product.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and foundational constants setup.

- [ ] T001 Define translation strings for delete warnings in `src/locales/ar/common.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before the UI can be connected.

- [ ] T002 Implement backend deletion integration `deleteSellerProductAction` in `src/lib/api/actions/products.ts`
- [ ] T003 Implement `useDeleteProductMutation` hook scaffolding in `src/lib/api/hooks/use-seller-products.ts`

**Checkpoint**: Foundation ready - the API action and translation strings are available.

---

## Phase 3: User Story 1 - Delete Regular Product (Priority: P1) 🎯 MVP

**Goal**: As a Seller, I want to delete a product that is not part of an active or scheduled auction.

**Independent Test**: Can be tested by selecting a regular product, clicking delete, and confirming. The product should disappear from the view immediately.

### Implementation for User Story 1

- [ ] T004 [US1] Create shared component `src/features/seller/products/components/delete-product-content.tsx`
- [ ] T005 [US1] Implement standard warning layout (Desktop Dialog + Mobile Drawer styles) in `delete-product-content.tsx`
- [ ] T006 [US1] Implement optimistic cache removal (`onMutate`) in `src/lib/api/hooks/use-seller-products.ts`
- [ ] T007 [US1] Connect Delete button in UI to invoke `useDeleteProductMutation`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Delete Auction Product (Priority: P1)

**Goal**: As a Seller, I want to be warned specifically when deleting a product linked to an auction.

**Independent Test**: Can be tested by selecting an auction product and verifying the specific warning text regarding insurance loss appears.

### Implementation for User Story 2

- [ ] T008 [US2] Add conditional logic to `delete-product-content.tsx` to detect `auction_live` / `auction_scheduled` statuses
- [ ] T009 [US2] Update UI to display the specific auction warning strings and layout variants

**Checkpoint**: Both regular and auction-specific warnings should work dynamically.

---

## Phase 5: User Story 3 - Cancel Deletion (Priority: P2)

**Goal**: As a Seller, I want to be able to close the deletion confirmation without taking action.

**Independent Test**: Can be tested by opening the delete interface and clicking "Cancel" or dismissing it; the product must remain in the list.

### Implementation for User Story 3

- [ ] T010 [US3] Implement `onCancel` or dismiss handlers for the secondary buttons in `delete-product-content.tsx`

---

## Phase 6: User Story 4 - Handle Deletion Failure (Priority: P2)

**Goal**: As a Seller, I want the system to handle network errors gracefully by restoring the UI state.

**Independent Test**: Can be tested by simulating a failed server response; any product that was hidden during the process should reappear in the list.

### Implementation for User Story 4

- [ ] T011 [US4] Implement `onError` snapshot rollback logic and display error using `showErrorToast` (with `getApiErrorMessage` and specific `bottom-center` config) in `src/lib/api/hooks/use-seller-products.ts`
- [ ] T012 [US4] Implement `onSettled` cache invalidation to ensure server state synchronization

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [ ] T013 Update `walkthrough.md` with screenshots of Desktop and Mobile deletion views
- [ ] T014 Verify accessibility (`aria-` attributes) for the new overlays

---

## Dependencies & Execution Order

- **Foundational (Phase 2)**: Depends on translations (T001)
- **User Story 1**: Depends on Foundational completion.
- **User Story 2, 3, 4**: Can be incrementally added to the components created in US1.

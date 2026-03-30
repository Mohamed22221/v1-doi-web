# Tasks: Product Details Modal

**Input**: Design documents from `/specs/005-product-details/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create component files for `view-product-content.tsx` and `view-product-modal.tsx` in `src/features/seller-dashboard/products/details-product/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Define TypeScript interfaces for the product data props expected by the modal components (aligning with `data-model.md`).

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View Product Details on Large Screens (Priority: P1) 🎯 MVP

**Goal**: Implement the core modal overlay allowing sellers to view product details on large screens (>1200px).

**Independent Test**: Can be tested by rendering the component on a desktop screen and verifying the layout constraints (max 90vh) and structural content.

### Implementation for User Story 1

- [x] T003 [P] [US1] Implement `ViewProductContent` in `src/features/seller-dashboard/products/details-product/view-product-content.tsx` to render the product attributes (images, title, description, price, status).
- [x] T004 [US1] Implement `ViewProductModal` in `src/features/seller-dashboard/products/details-product/view-product-modal.tsx` using the `Dialog` component, configuring it for desktop overlay.
- [x] T005 [US1] Update `src/features/seller-dashboard/products/product-card.tsx` to trigger the `ViewProductModal` when the EyeIcon is clicked.

**Checkpoint**: At this point, User Story 1 should be fully functional on desktop.

---

## Phase 4: User Story 2 - View Product Details on Small Screens (Priority: P1)

**Goal**: Ensure the modal correctly adapts to a full-screen view on small and tablet screens (<1200px).

**Independent Test**: Can be tested by resizing the browser to <1200px and ensuring the modal takes up the full viewport.

### Implementation for User Story 2

- [x] T006 [US2] Update `view-product-modal.tsx` Tailwind classes to force full-screen dimensions on screens below 1200px (`max-xl:` breakpoint modifier or similar).
- [x] T007 [US2] Verify internal scrolling behavior in `view-product-content.tsx` to ensure long descriptions are accessible on smaller devices without breaking the overlay.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work interchangeably based on screen size.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 Review and finalize accessibility attributes (e.g., proper Dialog titles, aria-labels for close buttons).
- [x] T009 Ensure all user strings (like "عرض المنتج") use the `useTranslation` hook properly.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: Depends on Foundational phase
- **Polish (Final Phase)**: Depends on Phase 4 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 (Foundational)
- **User Story 2 (P1)**: Extends User Story 1; depends on the base modal existing (T004).

### Implementation Strategy

#### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3: User Story 1.
3. **STOP and VALIDATE**: Verify desktop rendering.

#### Incremental Delivery

1. Foundation ready.
2. Deliver US1 (Desktop Modal).
3. Deliver US2 (Responsive Mobile Full-Screen).
4. Apply Polish (i18n, Accessibility).

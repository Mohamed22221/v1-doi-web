# Tasks: Phase 1 — Product Inventory UI (Seller Dashboard)

**Input**: Design documents from `specs/001-product-inventory-ui/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md

## Organization
Tasks are grouped by Foundational infrastructure first, then by User Story to enable incremental delivery and testing.

---

## Phase 1: Setup & Foundational (Blocking Prerequisites)

**Purpose**: Core types, icons, and shared components required by all UI layers.

- [x] T001 [P] Create `SellerProduct` interface and `ProductStatus` type in `src/lib/api/types/seller-product.ts`
- [x] T002 [P] Add `DeleteIcon` SVG export to `src/components/shared/icon-base/constant.tsx` (28x28px, custom path)
- [x] T003 Create shared `StatusBadge` component in `src/components/shared/status-badge.tsx` (Server Component, CVA-based variants)
- [x] T004 [P] Create i18n namespace files `seller-dashboard.json` in `src/locales/ar/` and `src/locales/en/` with primary keys
- [x] T005 [P] Add minimal `seller-dashboard.json` to remaining locales (de, es, fa, fr, tr, ur) with English content
- [x] T006 Update existing `EmptyProductsState` in `src/features/seller-dashboard/products/empty-products-state.tsx` to use i18n keys

**Checkpoint**: Foundation ready - UI components can now be implemented.

---

## Phase 2: User Story 3 - Status Badge Visibility (Priority: P2)

**Goal**: Products show a semantic badge reflecting their current state.

- [x] T007 [US3] Implement color variant mapping in `StatusBadge` for `active`, `pending`, `rejected`, `inactive`
- [x] T008 [US3] Wire i18n labels for all defined status values in `StatusBadge`
- [x] T009 [US3] Add fallback logic for unknown status keys (Neutral variant + raw string)

**Independent Test**: Render `StatusBadge` with all status values in a temporary dev page. Verify correct color and translated label in both `ar` and `en`.

---

## Phase 3: User Story 1 & 2 - Responsive Product Card (Priority: P1/P2) 🎯 MVP

**Goal**: A single card component that adapts between desktop (vertical) and mobile (horizontal) layouts.

- [x] T010 [US1/2] Create `ProductCard` shell in `src/features/seller-dashboard/products/product-card.tsx` (Server Component)
- [x] T011 [US1] Implement Desktop layout (≥md): Image top, Title/Badge header, Category, Price, Footer icons
- [x] T012 [US2] Implement Mobile layout (<md): Image left (80x80), Content right (Header row, mt-auto Footer)
- [x] T013 [US1/2] Add price row with `Riyall` icon and correct semantic color tokens
- [x] T014 [US4] Add View and Delete icon buttons to card footer (UI-only, 1px border, 28x28px)
- [x] T015 [US1/2] Implement truncation logic for long product titles

**Independent Test**: Render `ProductCard` with mock data. Toggle viewport between mobile and desktop. Verify layout shift and dimension compliance (434px max-width desktop, 124px max-height mobile).

---

## Phase 4: User Story 5 - Skeleton State (Priority: P2)

**Goal**: Visual placeholders while data loads to prevent layout shift.

- [x] T016 [US5] Create `ProductCardSkeleton` in `src/features/seller-dashboard/products/product-card-skeleton.tsx`
- [x] T017 [US5] Implement desktop skeleton blocks matching `ProductCard` geometry
- [x] T018 [US5] Implement mobile skeleton blocks matching horizontal card geometry

**Independent Test**: Render `ProductCardSkeleton`. Verify it matches the dimensions of the real cards on both viewports.

---

## Phase 5: Integration & Page Assembly

**Goal**: Final products page with grid, skeleton, and empty state.

- [x] T019 [US1] Implement responsive grid layout in `src/app/[locale]/(seller-dashboard)/dashboard/seller/products/page.tsx` (1 col mobile → 3 col desktop, 16px gap)
- [x] T020 [US5] Wrap product list in `<Suspense>` with `ProductCardSkeleton` grid as fallback
- [x] T021 [US1] Implement empty state conditional rendering using `EmptyProductsState`
- [x] T022 [P] Final visual audit: dark mode tokens, RTL mirror checks, and accessibility (aria-labels)

**Independent Test**: Navigate to `/dashboard/seller/products`. Verify full page composition works: Grid (populated), Empty state (if array empty), Skeleton (during loading simulation).

---

## Dependencies & Execution Order

1. **Phase 1 (Setup)**: MUST be complete first. (T001-T006)
2. **Phase 2 & 3**: Can run in parallel once T001-T004 are ready.
3. **Phase 4 (Skeleton)**: Depends on Phase 3 (matching geometry).
4. **Phase 5 (Integration)**: Depends on all previous phases.

---

## Verification Strategy

- **Manual**: Visual review of cards and grid in local dev server (`npm run dev`).
- **Accessibility**: Browser inspector check for `aria-label` and `aria-hidden` attributes.
- **RTL/LTR**: Direct locale switching in URL (`/ar/...` vs `/en/...`).
- **Types**: `npx tsc --noEmit` to ensure no regression in project types.

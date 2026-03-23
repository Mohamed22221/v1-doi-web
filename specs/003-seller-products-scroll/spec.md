# Feature Specification: Seller Products Infinite Scroll

**Feature Branch**: `003-seller-products-scroll`  
**Created**: 2026-03-23  
**Status**: Draft  
**Input**: User description: "Implement Infinite Scroll for Seller Products using TanStack Query v5 and react-intersection-observer."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Smooth Browsing of Large Catalogs (Priority: P1)

As a seller with many products, I want to scroll through my product list without having to click "Next" or wait for full page reloads, so that I can efficiently manage my inventory.

**Why this priority**: Core UX improvement for the seller dashboard. Eliminates pagination friction.

**Independent Test**: Can be tested by navigating to the Seller Products page and scrolling down. The system should fetch the next page automatically when reaching the bottom.

**Acceptance Scenarios**:

1. **Given** a seller has 50 products and initial limit is 20, **When** the user scrolls to the bottom of the list, **Then** the next 20 products are fetched and appended to the list.
2. **Given** the user is scrolling rapidly, **When** they reach the bottom, **Then** a loading indicator is shown while the next batch is fetched.

---

### User Story 2 - Filtered Infinite Scroll (Priority: P2)

As a seller, I want my active filters (status, type) to be preserved while I scroll infinitely, so that I only see relevant products in the continuous stream.

**Why this priority**: Essential for usability when managing specific product subsets (e.g., active products).

**Independent Test**: Apply a filter, then scroll. Verify that subsequent pages follow the same filter criteria.

**Acceptance Scenarios**:

1. **Given** a "Sold" filter is applied, **When** the user reaches the bottom of the first page, **Then** the next page of "Sold" products is fetched.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use `useInfiniteQuery` from TanStack Query v5 for data fetching.
- **FR-002**: System MUST use `getNextPageParam` to determine the next page number based on `TPaginationSimple` (checking if `page < totalPages`).
- **FR-003**: System MUST trigger fetching the next page using `react-intersection-observer` when the user is within 400px of the list bottom (Early Fetching).
- **FR-004 (Seamless Loading)**: System MUST provide seamless feedback by displaying a Skeleton loader at the bottom of the list when `isFetchingNextPage` is true, without unmounting existing items.
- **FR-005 (End of Data Handling)**: System MUST explicitly handle the "End of List" state. When `hasNextPage` is false and the list is populated, the scroll sentinel MUST be unmounted/hidden, and a "No more products" UI message MUST be displayed.
- **FR-006 (Filter Persistence)**: System MUST maintain filter state (e.g., status, type) across all infinite page loads.

### Non-Functional Requirements (Accessibility)

- **NFR-001**: System MUST include `aria-live="polite"` attributes on the Loading Skeleton and the "End of List" message to ensure screen readers announce status changes without interrupting the user's scrolling experience.

### Key Entities

- **SellerProduct**: Represents a single item in the seller's inventory.
- **PaginationMeta**: Metadata from the API including `page`, `totalPages`, and `total`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page transitions (next page load) occur without user intervention (no clicks required).
- **SC-002**: Data fetching initialization MUST visibly trigger (e.g., network request initiated, skeleton rendered) immediately upon the sentinel element entering the 400px `rootMargin`.
- **SC-003**: 100% of products are eventually reachable via scrolling if no filters are applied.

# Feature Specification: Phase 1 — Product Inventory UI (Seller Dashboard)

**Feature Branch**: `001-product-inventory-ui`
**Created**: 2026-03-21
**Status**: Draft
**Input**: User description: "Phase 1: Product Inventory UI for Seller Dashboard"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Seller Views Products in a Card Grid on Desktop (Priority: P1)

A seller navigates to their dashboard products page on a desktop device and sees each product displayed as a card. Each card presents the product image, title, category, price, and current status at a glance, allowing the seller to quickly assess their inventory.

**Why this priority**: This is the core, zero-fallback view of the product inventory. Without it, sellers cannot manage their products at all.

**Independent Test**: Navigate to `/dashboard/seller/products` on a wide viewport. Verify that product cards are displayed with image, title, category, price, and status badge.

**Acceptance Scenarios**:

1. **Given** a seller has at least one product, **When** they visit the products page on a desktop viewport (≥ 768px), **Then** products are displayed in a responsive grid that shows up to 3 columns with a 16px gap between cards, each card having a max width of 434px and min height of 380px.
2. **Given** a product card is rendered, **When** it is displayed, **Then** the image occupies the top area (~402×175px), followed by a header row (title + status badge, space-between), then category text, then price, and finally a footer row with action icons right-aligned.
3. **Given** a product card is rendered in light mode, **When** the price is displayed, **Then** the price uses the dark-neutral color token; in dark mode it uses the light-neutral color token.

---

### User Story 2 — Seller Views Products in a Compact List on Mobile (Priority: P2)

A seller accesses the products page on a small screen. Each product is displayed as a compact horizontal row, maximising the number of visible items without scrolling.

**Why this priority**: Mobile is a critical access channel; sellers must be able to scan their inventory on any device.

**Independent Test**: Navigate to `/dashboard/seller/products` on a mobile viewport (< 768px). Verify that each product is displayed as a horizontal row (image left, content right) with max height 124px.

**Acceptance Scenarios**:

1. **Given** a seller is on a mobile viewport (< 768px), **When** they view their products, **Then** each product card renders in horizontal (`flex-row`) layout with the image (80×80px, small radius) on the left and content on the right.
2. **Given** the mobile product card is rendered, **When** it is displayed, **Then** the header row shows title and status badge space-between, and action buttons are right-aligned at the bottom of the content area.

---

### User Story 3 — Seller Sees a Status Badge Reflecting Product State (Priority: P2)

Each product card displays a status badge that clearly communicates whether the product is active, pending, rejected, or in another state. The badge color and label adapt to the product's current status and the user's language.

**Why this priority**: Status visibility is critical for seller decision-making — it directly answers "do I need to take action on this product?"

**Independent Test**: Render product cards with varying status values. Confirm that each renders the correct badge color (success/error/warning/info/neutral) and that the label is translated correctly for both `ar` and `en` locales.

**Acceptance Scenarios**:

1. **Given** a product has status `active`, **When** the card is rendered, **Then** the badge uses the success color variant and displays the translated "Active" label.
2. **Given** a product has status `rejected`, **When** the card is rendered, **Then** the badge uses the error color variant and displays the translated "Rejected" label.
3. **Given** the UI locale is Arabic, **When** status badges are rendered, **Then** all labels appear in Arabic and the layout is mirrored (RTL).

---

### User Story 4 — Product Card Displays View and Delete Icon Buttons (Priority: P3)

Each product card exposes two icon buttons — View (eye icon) and Delete (trash icon) — positioned in the footer area. In Phase 1, these are **UI elements only**: they must be rendered with the correct dimensions, borders, and accessible labels, but no click behaviour, routing, or delete logic is wired in this phase.

**Why this priority**: The card UI must be complete and match the design spec before actions are layered in a subsequent phase.

**Independent Test**: Render a product card and verify the footer contains both icon buttons at 28×28px with a 1px border and accessible `aria-label` attributes. No click handler is required.

**Acceptance Scenarios**:

1. **Given** a product card is rendered, **When** the footer is inspected, **Then** a View (eye) icon button and a Delete (trash) icon button are present at 28×28px each with a visible 1px border.
2. **Given** icon buttons are rendered, **When** inspected for accessibility, **Then** each button has an `aria-label` and each icon SVG is `aria-hidden="true"`.
3. **Given** Phase 1 scope, **When** a seller clicks either icon button, **Then** no navigation, modal, or data mutation occurs — click handling is out of scope for this phase.

---

### User Story 5 — Seller Sees Skeleton Cards While Products Are Loading (Priority: P2)

When the seller first opens the products page and data is being fetched, placeholder skeleton cards appear in place of real product cards. These skeletons match the exact dimensions of the desktop and mobile card layouts, preventing layout shift and giving immediate visual feedback that content is loading.

**Why this priority**: A blank page during loading is disorienting. Skeleton placeholders matching the card geometry are required to maintain a polished, production-quality experience.

**Independent Test**: Simulate a slow data load on the products page. Verify that skeleton placeholder cards appear immediately, matching the desktop card dimensions (max-width 434px, min-height 380px) or mobile card dimensions (full-width, max-height 124px) depending on viewport.

**Acceptance Scenarios**:

1. **Given** the products page is loading on a desktop viewport, **When** data has not yet resolved, **Then** skeleton placeholder cards are displayed matching the desktop card layout (434px wide, 380px tall).
2. **Given** the products page is loading on a mobile viewport, **When** data has not yet resolved, **Then** skeleton placeholder cards are displayed matching the mobile card layout (full-width, 124px tall, horizontal).
3. **Given** data finishes loading, **When** the real product cards are ready, **Then** the skeletons are replaced by the actual product cards without a layout shift.

---

### Edge Cases

- What happens when a seller has zero products? The products page must display an empty-state illustration or message instead of a blank grid.
- What happens when a product has no image? A placeholder image or fallback graphic must be shown in the image area, maintaining the defined dimensions.
- What happens when the product title is very long? Text must truncate with an ellipsis and must not overflow the card boundaries.
- How does the card render with an unknown/unmapped status value? The badge falls back to the neutral color variant and displays the raw status string.
- What happens in dark mode? All color tokens must resolve correctly, with no hardcoded colors, ensuring full dark mode compatibility.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sellers MUST be able to view all their products on the products page, each represented by a product card component.
- **FR-002**: The product card MUST display product image, title, category, price, and status badge on both desktop and mobile layouts.
- **FR-003**: The product card MUST render in a vertical layout on desktop viewports (≥ 768px) and in a horizontal compact layout on mobile viewports (< 768px).
- **FR-004**: A shared `StatusBadge` component MUST map each product status value to a semantic color (success, error, warning, info, neutral) and a translated label.
- **FR-005**: The `StatusBadge` MUST render translated labels using the application's i18n system for both Arabic and English.
- **FR-006**: The product card footer MUST contain a View icon button (eye, 28×28px) and a Delete icon button (trash, 28×28px), each with a visible 1px border and an accessible `aria-label`. **In Phase 1, these buttons are UI-only — no click handlers, routing, or deletion logic are in scope.**
- **FR-007**: All color values MUST reference semantic design tokens from `colors.css`; no hardcoded hex values are permitted.
- **FR-008**: The layout MUST be fully RTL-compatible, mirroring flex directions and alignment for Arabic locale.
- **FR-009**: The component MUST be fully compatible with dark mode using the `.dark` class-based theming system.
- **FR-010**: Images MUST be rendered using the application's image component with defined width/height constraints. An appropriate fallback MUST be shown when no image is available.
- **FR-011**: Long product titles MUST be truncated with an ellipsis and MUST NOT cause card overflow.
- **FR-012**: The products page MUST display the existing `EmptyProductsState` component (located at `src/features/seller-dashboard/products/empty-products-state.tsx`) when the seller has no products. The component currently contains hardcoded Arabic strings and MUST be updated to use the i18n system so both Arabic and English labels render correctly.
- **FR-013**: The products page MUST display skeleton placeholder cards while product data is loading. Desktop skeletons MUST match the desktop card dimensions (max-width 434px, min-height 380px) and mobile skeletons MUST match the mobile card dimensions (full-width, max-height 124px, horizontal layout).
- **FR-014**: The products page grid MUST use a responsive auto-fill layout: 1 column on mobile viewports (< 768px) scaling up to a maximum of 3 columns on desktop (≥ 768px). The gap between cards MUST be 16px and each card MUST have a max-width of 434px.

### Key Entities

- **ProductCard**: A self-contained display unit representing a single seller product. Key attributes: `id`, `title`, `category`, `price`, `imageUrl` (nullable), `status`.
- **StatusBadge**: A shared UI component. Key attributes: `status` (string key), resolved `colorVariant` (success/error/warning/info/neutral), translated `label` (string).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A seller can scan the full status and key details of every product on the inventory page without any additional interaction, completing a visual review in under 15 seconds per 10 items.
- **SC-002**: The product card renders correctly (no layout breaks, no overflowing text, correct status color) across desktop, tablet, and mobile viewports in both LTR (English) and RTL (Arabic) layouts.
- **SC-003**: All status badge color and label combinations are visually distinguishable and correctly translated, achieving a 100% mapping accuracy for all defined status values.
- **SC-004**: The product card and status badge have zero TypeScript compilation errors and zero accessibility violations (missing labels, non-semantic elements) as validated by automated checks.
- **SC-005**: The dark mode rendering of the inventory page passes visual review with no mixed light/dark colors, confirming full theming compliance.

---

## Assumptions

- The product data shape (id, title, category, price, imageUrl, status) is already defined in or will be placed in `src/lib/api/types/` per the constitution's Technical Standards.
- Status values available from the backend are: `active`, `pending`, `rejected`, `inactive` (and possibly others); the `StatusBadge` maps these to semantic variants and falls back to `neutral` for unknown keys.
- View and Delete icon buttons are UI-only in Phase 1. Navigation and deletion logic (including any confirmation modal) are explicitly out of scope and will be addressed in a subsequent phase.
- Pagination is explicitly out of scope for Phase 1. The products grid renders all available products in a single scrollable layout. Pagination, infinite scroll, and load-more controls will be addressed in the integration phase.
- The `EmptyProductsState` component already exists at `src/features/seller-dashboard/products/empty-products-state.tsx` and renders an image, heading, and body text. It currently uses hardcoded Arabic strings that must be migrated to i18n keys before use.
- Pixel-perfect measurements from `phase-1-ui.md` are treated as design targets; minor sub-pixel differences due to browser rendering are acceptable.
- The `EyeIcon` and `DeleteIcon` referenced in the spec are already available in `@components/shared/icon-base/constant`.
- The `EmptyProductsState` component is an existing Server Component with no client-side interactivity.
- The products grid uses responsive auto-fill columns (1 on mobile → max 3 on desktop) with a 16px gap between cards.

---

## Clarifications

### Session 2026-03-21

- Q: Should the delete icon button trigger a confirmation dialog before deleting, or delete immediately? → A: Phase 1 is UI-only. Delete and View icon buttons are rendered as static UI elements per the design spec. No modals, actions, or routing are in scope for this phase.
- Q: Should the products page show a skeleton/placeholder card layout while data loads, or a spinner/nothing? → A: Option A — Skeleton card placeholders for both desktop (434px×380px) and mobile (full-width×124px) matching Phase 1 dimensions exactly. This is in scope for Phase 1.
- Q: Should the products page support pagination, infinite scroll, or display all products in a single scrollable grid? → A: Option C — Pagination is out of scope for Phase 1. Focus is the grid layout and card UI only; pagination will be handled in the integration phase.
- Q: What should the empty state display? → A: Option A — Use the existing `EmptyProductsState` component at `src/features/seller-dashboard/products/empty-products-state.tsx`. It must be updated to support i18n (currently hardcoded Arabic) before use.
- Q: How many columns should the desktop product grid display? → A: Option C — Responsive auto-fill grid: 1 column on mobile, scales to 3 columns on desktop, 16px gap, 434px max-width per card.

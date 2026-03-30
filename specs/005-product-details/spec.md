# Feature Specification: Product Details Modal

**Feature Branch**: `005-product-details`  
**Created**: 2026-03-25  
**Status**: Draft  
**Input**: User description: "D:\doi-web\.specify\memory\phases\phase-4-details-products.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Product Details on Large Screens (Priority: P1)

As a Seller using a desktop or large screen, I want to click a view icon on my product card to see its full details in a modal overlay, so that I can quickly reference its information without navigating away from my dashboard.

**Why this priority**: Core functionality for product management, allowing sellers to review their listings efficiently.

**Independent Test**: Can be tested on a large screen (> 1200px) by clicking the view icon to ensure a constrained modal appears with product details.

**Acceptance Scenarios**:

1. **Given** a seller is viewing their products list on a large screen, **When** they click the view (eye) icon on a product card, **Then** a modal opens with the centered title "عرض المنتج".
2. **Given** the product details modal is open on a large screen, **Then** the modal height does not exceed 90% of the viewport height (90vh).
3. **Given** the modal is open, **When** the seller clicks outside the modal or on the close button, **Then** the modal closes and the user remains on the product list.

---

### User Story 2 - View Product Details on Small Screens (Priority: P1)

As a Seller using a mobile device or tablet, I want the product details to take up the full screen when viewed, so that the information is readable and easy to navigate on a smaller display.

**Why this priority**: Ensures a responsive and accessible user experience across all devices.

**Independent Test**: Can be tested on a mobile/tablet screen (< 1200px) by clicking the view icon to ensure a full-screen view appears instead of a constrained modal.

**Acceptance Scenarios**:

1. **Given** a seller is viewing their products list on a small screen, **When** they click the view (eye) icon on a product card, **Then** a full-screen view opens showing the product's details and the title "عرض المنتج".
2. **Given** the full-screen view is open, **When** the seller clicks the close button, **Then** the view closes and returns to the product list.

---

### Edge Cases

- **Missing Data**: How does the modal render if some optional product data (e.g., description or certain images) is missing?
- **Long Content**: If a product has a very long description or many images, how does the modal handle scrolling without breaking the 90vh constraint on large screens?
- **Rapid Clicking**: What happens if the user rapidly clicks the view icon multiple times before the modal finishes opening?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a clickable view icon on each product card in the seller dashboard.
- **FR-002**: System MUST open a detailed view when the view icon is clicked, displaying the product's data (images, title, description, price, status).
- **FR-003**: System MUST constrain the modal height to a maximum of 90% of the viewport height (90vh) on screens 1200px and wider, ensuring it remains within the visible area.
- **FR-004**: System MUST display a centered title containing the text "عرض المنتج" at the top of the detailed view.
- **FR-005**: System MUST render the detailed view as a full-screen overlay on screens smaller than 1200px (tablet and downwards).
- **FR-006**: System MUST provide a visible close mechanism to exit the detailed view and return to the main list.
- **FR-007**: System MUST handle internal scrolling within the modal if the product details exceed the available height.

### Key Entities

- **Product**: The item being viewed. Contains attributes like title, description, images, price, and status.
- **Seller**: The authenticated user viewing their own products.

## Assumptions & Dependencies

- **Assumption**: Product details are immediately accessible or can be retrieved quickly by the system.
- **Assumption**: The system supports responsive overlay views (full-screen vs constrained modal).
- **Dependency**: Requires the existing seller dashboard product listing interface to provide the entry point (view icon).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The modal opens visibly in under 200ms after the user clicks the view icon.
- **SC-002**: Interface layout correctly adapts based on the 1200px screen width boundary: 100% of the time, screens >= 1200px use a constrained modal (<90vh), and screens < 1200px use a full-screen view.
- **SC-003**: Users can successfully scroll through all product content within the modal without the modal itself exceeding screen bounds.

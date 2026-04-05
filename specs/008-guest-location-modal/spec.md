# Feature Specification: Guest Location Selection Modal

**Feature Branch**: `008-guest-location-modal`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "Implement Guest Location Selection Modal based on D:\doi-web\.specify\memory\phases\home\sec-6-home-location.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Forced Region Selection for Guests (Priority: P1)

As a first-time guest visitor, I want to be prompted to select my region so that the platform can show me localized content (like auctions or products near me) from the start.

**Why this priority**: Core initialization step for guest experiences. Essential for localization and preventing repetitive modal prompts.

**Independent Test**: Can be tested by clearing cookies, loading the home page, and verifying the modal appears immediately for guests but NOT for logged-in users.

**Acceptance Scenarios**:

1. **Given** a guest user with no `user_location` cookie, **When** the page mounts on the client, **Then** the `LocationModal` must open automatically.
2. **Given** the modal is open, **When** the user selects "جدة" (Jeddah) and clicks "تأكيد المنطقة", **Then** the `user_location` cookie must be set to "جدة" and the modal must close.

---

### User Story 2 - Automated Geolocation (Priority: P2)

As a guest, I want to use my current location automatically so that I don't have to manually search for my city.

**Why this priority**: Enhances UX by reducing friction and providing accurate localization.

**Independent Test**: Can be tested by clicking the "Use Current Location" button and verifying the browser geolocation prompt appears.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks "استخدام الموقع الحالي", **Then** the browser Geolocation API must be triggered.
2. **Given** successful geolocation, **When** the coordinates are resolved, **Then** the location (or coordinate flag) must be saved in the cookie and the modal closed.

---

### User Story 3 - Default Fallback on Dismissal (Priority: P2)

As a guest, I should be able to dismiss the modal without making a choice, but it shouldn't haunt me on every page refresh.

**Why this priority**: Prevents user frustration for those who don't want to specify a location immediately, while still satisfying the "must be set" business logic.

**Independent Test**: Can be tested by closing the modal via the 'X' button or clicking outside, then refreshing the page to ensure it stays closed.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user clicks the 'X' button or the overlay, **Then** the `user_location` cookie must be set to "الرياض" (Riyadh) and the modal closed.
2. **Given** the cookie is set by dismissal, **When** the page is refreshed, **Then** the modal must NOT reappear.

---

### Edge Cases

- **User Denies Location Permission**: If the Geolocation API call fails or is denied, the system should show a toast or message and keep the city selection interactive.
- **Hydration Mismatch**: Since cookies are checked on mount, the modal should not flash on the server-rendered HTML before the client takes over.
- **Slow Cookie Write**: Ensure the modal doesn't close until the cookie is confirmed to be set or standard JS execution flow finishes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST check for `user_location` cookie on client-side mounting (`useEffect`).
- **FR-002**: System MUST automatically trigger the `LocationModal` if the user is a guest (not authenticated) AND the cookie is missing.
- **FR-003**: System MUST provide a searchable or selectable list of predefined Saudi cities (e.g., Riyadh, Jeddah, Dammam).
- **FR-004**: System MUST include a "Use Current Location" button that invokes `navigator.geolocation`.
- **FR-005**: System MUST use `js-cookie` for persistence with a reasonable expiry (e.g., 30 days).
- **FR-006**: System MUST persist "الرياض" as a fallback value if the user closes the modal without explicit selection.

## UI & Design Specifications

- **Responsiveness**: The modal must be fully responsive, switching between Desktop and Mobile layouts.
- **Desktop Figma**: Implement this design: [1316-21786](https://www.figma.com/design/nFMq6SSTy7gQuirkoIFYBv/Doueh-Platform---Web-Version?node-id=1316-21786&m=dev)
- **Mobile Figma**: Implement this design: [1318-22660](https://www.figma.com/design/nFMq6SSTy7gQuirkoIFYBv/Doueh-Platform---Web-Version?node-id=1318-22660&m=dev)
- **Componentry**: Use Tailwind CSS and existing UI components (shadcn/ui or similar) for inputs, buttons, and dialog overlays.

### Key Entities

- **UserLocation**: A client-side entity stored in cookies representing the user's regional preference.
  - `city`: String (localized name or ID).
  - `isGeoResolved`: Boolean (optional flag if resolved via Geolocation API).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Guests see the location prompt within 500ms of client-side hydration.
- **SC-002**: Any user action (select, geo, or dismiss) results in exactly ONE `user_location` cookie set.
- **SC-003**: 100% suppression of the modal on subsequent page views once the cookie exists.
- **SC-004**: Responsive layout shifts between mobile (drawer-like) and desktop (centered modal) based on viewport.

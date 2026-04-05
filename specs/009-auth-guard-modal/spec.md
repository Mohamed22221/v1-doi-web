# Feature Specification: Implement Auth Guard Modal for Guest Users

**Feature Branch**: `009-auth-guard-modal`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "Implement Auth Guard Modal for Guest Users"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Guest Triggering Protected Action (Priority: P1)

As a guest user, I want to see a clear prompt to login or register when I try to bid or buy, so that I understand authentication is required for these actions.

**Why this priority**: Core business value; prevents unauthorized actions while providing a clear path to conversion.

**Independent Test**: Can be fully tested by clicking a "Bid Now" button as an unauthenticated user and verifying the modal appears.

**Acceptance Scenarios**:

1. **Given** a guest user is on a product or auction page, **When** they click "Bid Now", "Join Auction", or "Buy Now", **Then** the Auth Guard Modal must be displayed.
2. **Given** the Auth Guard Modal is open, **When** the user clicks the "Register" button, **Then** they are redirected to the registration page.
3. **Given** the Auth Guard Modal is open, **When** the user clicks the "Login" link, **Then** they are redirected to the login page.

---

### User Story 2 - Authenticated User Action (Priority: P2)

As an authenticated user, I want my actions (bidding/buying) to execute immediately without interruption, so that my experience remains seamless.

**Why this priority**: Ensures no regression for existing users.

**Independent Test**: Can be tested by logging in and clicking "Bid Now" to verify no modal appears.

**Acceptance Scenarios**:

1. **Given** an authenticated user is on a product page, **When** they click a protected action button, **Then** the action must proceed directly without showing the Auth Guard Modal.

---

### User Story 3 - Modal Dismissal (Priority: P3)

As a guest user, I want to be able to close the modal if I change my mind, so that I can continue browsing other content.

**Why this priority**: Usability and user control.

**Independent Test**: Can be tested by clicking the "X" or backdrop on the modal.

**Acceptance Scenarios**:

1. **Given** the Auth Guard Modal is open, **When** the user clicks the close button or the backdrop overlay, **Then** the modal must be dismissed and the user remains on the current page.

## Clarifications

### Session 2026-04-05
- Q: When a guest is redirected to Login/Register, after successful auth, should they be returned to the page with the protected action automatically triggered? → A: Full Return & Resume: Redirect back to the source page and ideally trigger the action context (e.g., open the bidding drawer).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST maintain a global state (Zustand) to manage the visibility of the Auth Guard Modal.
- **FR-002**: System MUST provide a mechanism (e.g., a custom hook) to intercept protected actions based on the user's authentication status.
- **FR-003**: The Auth Guard Modal MUST contain the specified text:
    - Title: "عشان تكمل وتزايد أو تشتري لازم يكون عندك حساب."
    - Subtitle: "تسجيلك سريع وبخطوتين! ويفتح لك كل المزادات."
- **FR-004**: System MUST display a primary registration button and a secondary login link with `callbackUrl` search params pointing back to the current page.
- **FR-005**: System MUST support a Mobile-First responsive layout, transitioning from a Drawer (mobile) to a Dialog (desktop) using the `ResponsiveModal` implementation.
- **FR-006**: System MUST utilize Next.js `<Image />` for the modal illustration.
- **FR-007**: System MUST support RTL (Right-to-Left) layouts for Arabic language users.
- **FR-008**: System MUST preserve the "intent" of the user (e.g., the specific action context) when redirecting, ensuring the user is returned to their previous context after authentication.

### Key Entities *(include if feature involves data)*

- **Auth Guard State**: Manages the `isOpen` (boolean) status and the `openModal`/`closeModal` actions.
- **Feature Action**: The callback function passed to the guard that only executes upon successful authentication check.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of guest-initiated protected actions correctly trigger the modal.
- **SC-002**: The modal becomes visible in under 300ms on both mobile and desktop devices.
- **SC-003**: Navigating to Register/Login from the modal takes exactly 1 click/tap.
- **SC-004**: Visual layout matches Figma specifications at 375px (mobile) and 1440px (desktop) widths.

### Edge Cases

- **Session Expiry**: User was logged in but session expired right before clicking. Modal should handle this by checking status on click.
- **Concurrent Modals**: If another modal is open (e.g., location), the Auth Guard Modal should prioritize visibility or handle the stack gracefully.
- **Deep Linking**: User is redirected to Login/Register; after success, the system MUST return them to the previous page and ideally re-trigger the action context.

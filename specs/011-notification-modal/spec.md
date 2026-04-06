# Feature Specification: Notification Modal Implementation

**Feature Branch**: `011-notification-modal`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "Implement a two-step Notification Modal triggered for logged-in users with valid location and no prior preference."

## Clarifications

### Session 2026-04-06

- Q: Preference Storage & API Integration → A: Save to cookie AND trigger an API call to save preferences to the user's backend profile.
- Q: Native Web Push vs. Internal Preferences → A: Yes, trigger the native browser Notification.requestPermission() after they confirm.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Notification Opt-in Journey (Priority: P1)

As a logged-in user with a set location, I want to be prompted to enable notifications so that I don't miss important updates about auctions and sales.

**Why this priority**: Core value of the feature - converting users to subscribed notifications.

**Independent Test**: Can be tested by logging in as a user with a location, verifying the prompt appears, and proceeding to the second step to save preferences.

**Acceptance Scenarios**:

1. **Given** a logged-in user with `user_location` set and no `notification_prompted` cookie, **When** they visit the home page, **Then** the Notification Prompt modal MUST appear.
2. **Given** the Notification Prompt modal is visible, **When** the user clicks "Allow", **Then** the modal MUST transition to Step 2 (Settings).
3. **Given** the Notification Settings modal (Step 2) is visible, **When** the user toggles options and clicks "Confirm", **Then** the preference MUST be saved, a long-term cookie MUST be set, and the modal MUST close.

---

### User Story 2 - Privacy & Deferral (Priority: P2)

As a user who is busy, I want to dismiss the notification prompt temporarily so that I can continue my current task without being forced to make a decision immediately.

**Why this priority**: Essential for UX - avoids annoying users by forcing immediate configuration.

**Independent Test**: Can be tested by clicking "Later" and verifying the modal closes and returns after 15 minutes.

**Acceptance Scenarios**:

1. **Given** the Notification Prompt modal is visible, **When** the user clicks "Later", **Then** the modal MUST close and a session cookie `notification_prompted=later` MUST be set with a 15-minute expiration.
2. **Given** the user previously selected "Later", **When** they return after 15 minutes, **Then** the modal SHOULD reappear.

---

### User Story 3 - Visual Consistency & Accessibility (Priority: P2)

As a user regardless of my language (Arabic/English), I want the modal to be perfectly aligned and readable so that I can easily interact with it.

**Why this priority**: Ensures the platform remains premium and accessible to all target users.

**Independent Test**: Can be tested by toggling between Arabic and English locales and verifying visual alignment using logical properties.

**Acceptance Scenarios**:

1. **Given** the Arabic locale (RTL), **When** the modal appears, **Then** the text and switches MUST align to the right and use correct logical spacing.
2. **Given** the English locale (LTR), **When** the modal appears, **Then** the text and switches MUST align to the left and use correct logical spacing.

---

### Edge Cases

- **What happens when the user logs out while the modal is open?** The modal should naturally unmount as the auth guard or layout level logic updates.
- **How does the system handle missing location after login?** The modal MUST NOT trigger if `user_location` is missing or invalid.
- **Bypassing the Modal:** If the user has already configured notifications via other means (if any exist in the future), the modal should respect the `configured` cookie.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a two-step notification modal to logged-in users who meet the trigger criteria (valid location, no preference cookie).
- **FR-002**: System MUST use `js-cookie` for state persistence:
  - `notification_prompted=later`: 15 minutes expiration.
  - `notification_prompted=configured`: 1 year expiration.
- **FR-003**: System MUST provide three notification toggles in Step 2:
  - Auction Notifications (Default: ON)
  - Sale Notifications (Default: OFF)
  - General Notifications (Default: OFF)
- **FR-004**: UI MUST be implemented using Tailwind CSS logical properties (e.g., `text-start`, `ps-4`, `inset-inline-0`).
- **FR-005**: All text strings MUST be internationalized using translatable keys (no hardcoding).
- **FR-006**: The modal logic MUST run exclusively on the client-side to prevent hydration mismatches.
- **FR-007**: Integration MUST be performed in `src/app/[locale]/layout.tsx` without using `ssr: false` in a way that breaks server rendering.
- **FR-008**: System MUST trigger an API call to save the chosen notification preferences (Auctions, Sales, General) to the user's backend profile when they confirm their settings.
- **FR-009**: System MUST trigger the native browser `Notification.requestPermission()` prompt after the user confirms their settings in the modal.

### Key Entities *(include if feature involves data)*

- **Notification Preference**: Represents the user's choice for different alert types (Auctions, Sales, General).
- **User Location**: A prerequisite for the trigger, ensuring notifications are relevant to the user's region.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of eligible users are presented with the prompt upon their first qualifying visit.
- **SC-002**: Users can navigate from the initial prompt to confirmation in under 20 seconds.
- **SC-003**: Zero hydration errors reported in the browser console related to the Notification Modal.
- **SC-004**: 100% layout accuracy in both RTL and LTR modes as per Figma designs.

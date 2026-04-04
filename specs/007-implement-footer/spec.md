# Feature Specification: Footer Section Implementation

**Feature Branch**: `007-implement-footer`  
**Created**: 2026-04-04  
**Status**: Draft  
**Input**: User description: "Implement this design from Figma descetop footer sec in D:\doi-web\src\features\home @706:8001 and mobile @1325:24877"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Global Footer Layout (Priority: P1)

As a user, I want to see a consistent and professional footer at the bottom of every page that provides quick access to support, legal information, and social media.

**Why this priority**: The footer is a standard navigation and trust element in web applications.

**Independent Test**: Can be verified by navigating to any public page and scrolling to the bottom.

**Acceptance Scenarios**:

1. **Given** a desktop viewport, **When** scrolling to bottom, **Then** I see a three-column layout containing the Logo, Contact Info, Social Icons, and categorized Navigation Links.
2. **Given** the footer, **When** viewing the bottom bar, **Then** I see the copyright notice and language switcher.
3. **Given** any layout, **When** switching languages, **Then** the footer content and layout (RTL/LTR) updates accordingly.

---

### User Story 2 - Mobile Optimization (Priority: P1)

As a mobile user, I want a footer that fits my screen perfectly without horizontal scrolling.

**Why this priority**: Ensures accessibility and a premium feel on mobile devices.

**Independent Test**: Can be verified by inspecting the page in a mobile viewport (e.g., iPhone 12 Pro).

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** scrolling to bottom, **Then** I see a centered layout with stacked elements as per Figma design `1325:24877`.
2. **Given** the mobile view, **When** viewing social icons, **Then** they are appropriately sized and centered.

---

### Edge Cases

- **Missing Translations**: If a translation key is missing for a language, the system should fallback gracefully to the default locale.
- **Extreme Aspect Ratios**: The footer should maintain its layout on ultra-wide or very narrow screens.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a global footer at the bottom of the page in the Public layout.
- **FR-002**: Footer MUST include the Doueh logo (imgTitle in Figma).
- **FR-003**: Footer MUST provide contact information including Email (`support@doueh.com`) and Phone (`+966 5X XXX XXXX`).
- **FR-004**: Footer MUST have two columns of links:
    - **Doueh Column**: About Us, Start Selling, FAQ.
    - **Support Column**: Terms and Conditions, Privacy Policy, Report a Problem.
- **FR-005**: Footer MUST include social media icons with links to Facebook, Instagram, and X.
- **FR-006**: Footer MUST include a language switcher supporting Arabic and English.
- **FR-007**: Footer MUST use the specified primary background color `primary/800` (`#202e46`).
- **FR-008**: Footer MUST be fully responsive, switching between the desktop three-column layout and the mobile centered layout.

### Key Entities

- **Navigation Link**: Represents a link in the footer with a label and a destination URL.
- **Locale**: Represents the current language/culture setting (Arabic/English) which affects the footer's text and directionality.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visual fidelity to Figma design (706:8001 and 1325:24877) is 100% regarding typography, colors, and relative spacing.
- **SC-002**: 100% of text elements in the footer are localized using the application's i18n system.
- **SC-003**: Footer is accessible (WCAG 2.1 Level AA) with correct semantic HTML (`<footer>`, `<a>`, `aria-label` for icons).
- **SC-004**: Layout transition between desktop and mobile occurs smoothly at the standard project breakpoint.

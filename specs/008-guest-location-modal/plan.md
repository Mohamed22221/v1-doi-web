# Implementation Plan - Guest Location Selection Modal

Technical strategy for a "forced" regional selection modal for guest users, utilizing client-side cookie persistence and reactive UI patterns.

## User Review Required

> [!IMPORTANT]
> **Forced Dismissal Fallback**: If the user closes the modal without selecting (via ESC or backdrop), the system will automatically set the location to "الرياض" (Riyadh). This ensures the modal doesn't keep appearing, but it might not match the user's actual city.

> [!WARNING]
> **Geolocation Privacy**: Browsers will prompt for permission when the user clicks "Use Current Location". If denied, the modal will remain open for manual selection.

- **Component Path**: `D:\doi-web\src\components\layout\location-modal.tsx`.
- **Target Design**: Figma [1316-21786](https://www.figma.com/design/nFMq6SSTy7gQuirkoIFYBv/Doueh-Platform---Web-Version?node-id=1316-21786&m=dev) (Desktop) / [1318-22660](https://www.figma.com/design/nFMq6SSTy7gQuirkoIFYBv/Doueh-Platform---Web-Version?node-id=1318-22660&m=dev) (Mobile).

## Proposed Changes

### [Component] Layout & Shared
#### [NEW] [location-modal.tsx](file:///D:/doi-web/src/components/layout/location-modal.tsx)
- Create a `"use client"` leaf component using `Dialog` (shadcn).
- Props: `isGuest: boolean`.
- State: `isOpen`, `selectedCity?`, `isLoadingGeo`.
- Logic:
  - `useEffect`: On mount, check if `Cookies.get('user_location')` is missing and `isGuest` is true → `setOpen(true)`.
  - `handleConfirm(city)`: Set cookie and `setOpen(false)`.
  - `handleGeo()`: Use `navigator.geolocation`. Resolve city via lat/lng (or set specific geo flag).
  - `onOpenChange`: If `!open` and `!cookieExists` → Set cookie to `"riyadh"` (default).

#### [MODIFY] [layout.tsx](file:///D:/doi-web/src/app/[locale]/layout.tsx)
- Inject the `<LocationModal isGuest={!session} />` component into the root layout server-shell (inside `ProvidersShell`).

### [Business Logic] i18n
#### [MODIFY] [common.json](file:///D:/doi-web/src/locales/ar/common.json)
- Add entries for `"location_modal.title"`, `"location_modal.search_placeholder"`, `"location_modal.confirm_btn"`, `"location_modal.use_current_btn"`.

## Phase Breakdown

### Phase 1: Foundation & UI
- [ ] Create `location-modal.tsx` with basic `Dialog` structure.
- [ ] Add i18n strings for Arabic and English.
- [ ] Implement responsive layout (Drawer-style for mobile, Center-modal for desktop).

### Phase 2: Interactivity & State
- [ ] Install/Import `js-cookie`.
- [ ] Implement city search and selection logic.
- [ ] Implement Geolocation API integration with error handling.

### Phase 3: Visibility & Fallback
- [ ] Implement client-side `useEffect` trigger for guests.
- [ ] Implement dismissal fallback to "الرياض".
- [ ] Integrate into root layout.

## Verification Plan
### Automated Tests
- Browser test: Clear cookies, navigate to Home. Modal MUST appear.
- Browser test: Select a city. Cookie MUST be set. Refresh. Modal MUST NOT appear.
- Browser test: Click 'X'. Cookie MUST be set to "الرياض".

### Manual Verification
- Verify the Geolocation button on mobile and desktop.
- Inspect the cookie payload in the Application tab of devtools.

# Tasks: Guest Location Selection Modal

Technical breakdown for implementing a forced location selection modal for guest users.

## Progress Summary
- **Total Tasks**: 11
- **Completed**: 0
- **Status**: Not Started

## Phase 1: Setup
- [ ] T001 Install dependencies: `npm install js-cookie` and `npm install -D @types/js-cookie`
- [ ] T002 Add i18n translations for Arabic and English in `src/locales/ar/common.json` and `src/locales/en/common.json`

## Phase 2: Foundational
- [ ] T003 Create `LocationModal` shell using `Dialog` (shadcn) in `src/components/layout/location-modal.tsx`
- [ ] T004 Define static city list and `UserLocation` schema based on `data-model.md` in `src/components/layout/location-modal.tsx`

## Phase 3: [US1] Guest Trigger & UI (Priority: P1)
**Goal**: Modal appears for guests without a cookie and allows manual selection.
**Test**: Clear cookies, guest access -> modal opens. Select a city -> cookie set, modal closes.

- [ ] T005 [US1] Implement mount-time cookie check and `isGuest` logic in `src/components/layout/location-modal.tsx`
- [ ] T006 [US1] Implement city selection grid/list with search filtering in `src/components/layout/location-modal.tsx`
- [ ] T007 [US1] Implement "Confirm" action to persist selection in `user_location` cookie and close modal

## Phase 4: [US2] Geolocation (Priority: P2)
**Goal**: Allow users to auto-detect location.
**Test**: Click "Use Current Location" -> Browser prompt appears -> Success results in cookie set and close.

- [ ] T008 [US2] Implement geolocation handler using `navigator.geolocation` in `src/components/layout/location-modal.tsx`

## Phase 5: [US3] Dismissal Fallback (Priority: P2)
**Goal**: Ensure a default location is set if the modal is dismissed.
**Test**: Close modal via 'X' without selecting -> Verify cookie is set to "الرياض".

- [ ] T009 [US3] Implement `onOpenChange` logic to handle fallback persistence in `src/components/layout/location-modal.tsx`

## Phase 6: Integration & Polish
- [ ] T010 [P] Integrate `<LocationModal />` into the root layout `src/app/[locale]/layout.tsx`
- [ ] T011 [P] Refine responsive design according to Figma specs (1316-21786 / 1318-22660) in `src/components/layout/location-modal.tsx`

## Implementation Strategy
- **MVP First**: Complete Phase 1-3 to satisfy the core "Must-Have" requirement.
- **Incremental**: Geolocation and Dismissal logic are added as P2 enhancements.
- **Safe Integration**: Root layout integration is the final step once the component is fully self-managed.

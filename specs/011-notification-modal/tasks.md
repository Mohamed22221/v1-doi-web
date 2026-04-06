# Tasks: Notification Modal

**Input**: Design documents from `/specs/011-notification-modal/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `src/utils/notification-cookies.ts` base structure
- [x] T002 Create `src/hooks/use-notification-modal.ts` base structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Implement layout integration structure in `src/app/[locale]/layout.tsx` to conditionally render the upcoming modal wrapper (currently a placeholder).
- [x] T004 Add translatable keys to `src/locales/en/common.json` for the modal strings.
- [x] T005 [P] Add translatable keys to `src/locales/ar/common.json` for the modal strings.

**Checkpoint**: Foundation ready - basic structure available for user stories.

---

## Phase 3: User Story 1 - Notification Opt-in Journey (Priority: P1) 🎯 MVP

**Goal**: As a logged-in user with a set location, I want to be prompted to enable notifications so that I don't miss important updates about auctions and sales.

**Independent Test**: Can be tested by logging in as a user with a location, verifying the prompt appears, and proceeding to the second step to save preferences.

### Implementation for User Story 1

- [x] T006 [P] [US1] Implement `notification_prompted=configured` persistence in `src/utils/notification-cookies.ts`.
- [x] T007 [P] [US1] Create the notification prompt UI in `src/components/template/notification-modal/notification-prompt.tsx`.
- [x] T008 [P] [US1] Create the settings toggles UI in `src/components/template/notification-modal/notification-settings.tsx`.
- [x] T009 [US1] Implement the main modal states inside `src/hooks/use-notification-modal.ts` to trigger if user has location + logged in + no preference cookie.
- [x] T009b [US1] Extend `use-notification-modal.ts` to execute an API call saving chosen toggles to backend profile.
- [x] T009c [US1] Extend `use-notification-modal.ts` to trigger native `Notification.requestPermission()` after tracking API success.
- [x] T010 [US1] Create the main wrapper `src/components/template/notification-modal/notification-modal-wrapper.tsx` replacing the placeholder in `src/app/[locale]/layout.tsx`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Privacy & Deferral (Priority: P2)

**Goal**: As a user who is busy, I want to dismiss the notification prompt temporarily so that I can continue my current task without being forced to make a decision immediately.

**Independent Test**: Can be tested by clicking "Later" and verifying the modal closes and returns after 15 minutes.

### Implementation for User Story 2

- [x] T011 [P] [US2] Implement `notification_prompted=later` cookie saving (15 min expiry) in `src/utils/notification-cookies.ts`.
- [x] T012 [US2] Wire the "Later" buttons in `notification-prompt.tsx` and `notification-settings.tsx` to dismissal logic in `use-notification-modal.ts`.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Visual Consistency & Accessibility (Priority: P2)

**Goal**: As a user regardless of my language (Arabic/English), I want the modal to be perfectly aligned and readable so that I can easily interact with it.

**Independent Test**: Can be tested by toggling between Arabic and English locales and verifying visual alignment using logical properties.

### Implementation for User Story 3

- [x] T013 [P] [US3] Verify and adjust Tailwind logical properties (`text-start`, `ps-4`, etc.) in `src/components/template/notification-modal/notification-prompt.tsx`.
- [x] T014 [P] [US3] Verify and adjust Tailwind logical properties and Switch A11y roles in `src/components/template/notification-modal/notification-settings.tsx`.

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T015 Verify zero hydration errors globally.
- [x] T016 Run Quickstart scenarios from `quickstart.md` to ensure all tests pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Extends US1, should be done alongside or after US1.
- **User Story 3 (P2)**: Formatting logic can be applied continuously during component development.

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Models within a story marked [P] can run in parallel

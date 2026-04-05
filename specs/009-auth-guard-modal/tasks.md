# Tasks: Auth Guard Modal for Guest Users

**Feature**: [plan.md](file:///d:/doi-web/specs/009-auth-guard-modal/plan.md) | **Branch**: `009-auth-guard-modal`

## Implementation Strategy

We will follow an incremental approach:
1. **Infrastructure**: Setup Zustand store and the interceptor hook.
2. **UI Foundation**: Build the responsive modal using existing project primitives.
3. **Integration**: Connect the hook to the modal and inject it globally via `ProvidersShell`.
4. **Logic Alpha**: Implement basic redirection with `callbackUrl`.
5. **Logic Beta**: Implement "Intent Preservation" to resume actions after login.

---

## Phase 1: Setup

- [x] T001 Add `auth_modal` translation keys to `src/locales/ar/auth.json` (Arabic) and `src/locales/en/auth.json` (English)

---

## Phase 2: Foundational

- [x] T002 [P] Create `AuthGuardStore` using Zustand in `src/lib/store/auth-guard-store.ts`
- [x] T003 [P] Implement `useProtectedAction` hook in `src/hooks/use-protected-action.ts` to intercept actions based on `auth-store` status

---

## Phase 3: User Story 1 - Guest Interceptor (P1)

**Goal**: Block protected actions for guests and show the authentication prompt.  
**Test**: Click a protected button (mocked or actual) as a guest -> Modal appears.

- [x] T004 [P] [US1] Create `AuthGuardModal` component in `src/components/template/auth-guard-modal/auth-guard-modal.tsx` using `ResponsiveModal`
- [x] T005 [P] [US1] Create shadowing `AuthGuardWrapper` with `next/dynamic` (ssr: false) in `src/components/template/auth-guard-modal/auth-guard-wrapper.tsx`
- [x] T006 [US1] Register `AuthGuardWrapper` in `src/components/providers/providers-shell.tsx` for global availability
- [x] T007 [US1] Implement "Register" and "Login" navigation with `callbackUrl` handling in `AuthGuardModal`
- [x] T008 [US1] Add illustration image to `public/assets/illustrations/auth-guard.svg` (Completed using /img/authentication-bro.png)

---

## Phase 4: User Story 2 - Authenticated User Action (P2)

**Goal**: Ensure logged-in users are not interrupted.  
**Test**: Log in -> Click protected button -> Action executes immediately.

- [x] T009 [US2] Verify `useProtectedAction` correctly ignores the modal check if `isAuthenticated` is true in `src/hooks/use-protected-action.ts`

---

## Phase 5: User Story 3 - Modal Dismissal (P3)

**Goal**: Allow guests to close the modal.  
**Test**: Open modal -> Click "X" or backdrop -> Modal closes, user remains on page.

- [x] T010 [US3] Connect `closeModal` action to the `ResponsiveModal`'s `onOpenChange` or close button events

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T011 Implement FR-008: Intent Preservation logic (capture action context before redirect)
- [x] T012 Perform RTL visual audit and Accessibility audit (Focus trap, aria-labels)
- [x] T013 Update `quickstart.md` with final API usage and examples

---

## Dependencies

1. US1 depends on Phase 1 & 2.
2. US2 depends on US1 (for verification).
3. US3 depends on US1.
4. Polish depends on all US implementations.

---

## Parallel Execution Examples

- **Setup & Infrastructure**: T001, T002, T003 can be done in parallel with T008 (Assets).
- **UI Components**: T004 and T005 can be built while logic in T007 is being refined.

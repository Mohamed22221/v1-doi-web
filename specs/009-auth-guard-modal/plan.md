# Implementation Plan: Auth Guard Modal for Guest Users

**Branch**: `009-auth-guard-modal` | **Date**: 2026-04-05 | **Spec**: [spec.md](file:///d:/doi-web/specs/009-auth-guard-modal/spec.md)
**Input**: Feature specification for implementing a guest-authentication interceptor modal.

## Summary

Implement a global authentication guard that interrupts protected actions (bidding, buying) for guest users. The solution leverages a Zustand store for state, a custom hook for action interception, and a responsive modal (Drawer/Dialog) for UI.

## Technical Context

**Language/Version**: TypeScript / Next.js 16 (App Router)  
**Primary Dependencies**: `zustand`, `lucide-react`, `next/image`, `next/dynamic`.  
**Storage**: Zustand (Client-side memory).  
**Testing**: Browser-based interaction testing.  
**Target Platform**: Responsive Web (Mobile-First).  
**Performance Goals**: Modal trigger < 300ms.  
**Constraints**: Tailwind CSS 4, RTL support, Hydration-safe rendering.

## Constitution Check (v1.1.0)

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle 1.1 (Server-First)**: The modal and its wrapper MUST be marked with `"use client"`. The trigger (hook) must be client-side.
- **Principle 1.5 (Hydration Optimization)**: The modal MUST be loaded via `next/dynamic` with `ssr: false` to avoid hydration mismatches and minimize the initial server payload.
- **Principle 3.3 (Route Group Scoping)**: Since protected actions can be initiated from both public pages and potentially user-specific lists, the `AuthGuardModalWrapper` will be placed in `ProvidersShell` to ensure global coverage.

## Project Structure

### Documentation (this feature)

```text
specs/009-auth-guard-modal/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Redirect logic & asset research
├── data-model.md        # Zustand store structure
├── quickstart.md        # Usage guide for developers
└── tasks.md             # Implementation checklist (future)
```

### Source Code

```text
src/
├── lib/
│   └── store/
│       └── auth-guard-store.ts      # Zustand visibility state
├── hooks/
│   └── use-protected-action.ts       # Action interceptor logic
└── components/
    └── template/
        └── auth-guard-modal/
            ├── auth-guard-modal.tsx  # Dynamic UI component
            └── auth-guard-wrapper.tsx # Hydration-safe wrapper
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Global Component | Needed for interception across multiple disparate features (Home, Search, Details). | Local modals per feature would violate DRY and design consistency. |

## Phase 0: Outline & Research

- **Decision 1**: How to handle redirection? Use `usePathname` and `useSearchParams` to pass a `callbackUrl` to the Login/Register pages.
- **Decision 2**: Illustration asset? Research Figma links to extract the correct image or identify its path in the public directory if already exists.

## Phase 1: Design & Contracts

- **State Model**: Define `AuthGuardStore` with `isOpen` and navigation actions.
- **Hook Contract**: `useProtectedAction` should return a function that wraps any provided callback.
- **Agent Context**: Update `agy` context with the new shared utility pattern.

## Phase 2: Implementation (Task Breakdown)

1. Create `auth-guard-store.ts`.
2. Implement `useProtectedAction.ts`.
3. Scaffold `auth-guard-modal.tsx` with responsive layouts.
4. Integrate into `ProvidersShell`.
5. Add placeholder/actual illustration.
6. Localize all strings.

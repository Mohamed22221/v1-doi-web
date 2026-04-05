# Data Model: Auth Guard & Interceptor

**Status**: Draft | **Goal**: Define the state management and code interfaces for the Auth Guard system.

---

## 1. Zustand Store (`auth-guard-store.ts`)

The store provides a global mechanism for opening/closing the modal from anywhere in the application (including callbacks inside hooks).

### State Interface: `AuthGuardState`
- `isOpen` (boolean): Controls the modal's visible state.

### Actions:
- `openModal()`: Sets `isOpen` to `true`.
- `closeModal()`: Sets `isOpen` to `false`.

**Context**: 
- **Namespace**: `auth-guard`
- **Persistence**: None (Reset on page refresh).

---

## 2. Interceptor Hook (`useProtectedAction`)

This hook acts as the primary functional bridge between the UI and the Auth Store.

### Interface:
- **Input**: 
  - `onAction` (Function): The primary callback to execute upon success.
- **Output**: 
  - `guardedAction` (Function): A wrapped function that performs the check before executing the callback.

### Logic Flow:
1. Check `isAuthenticated` from `auth-store`.
2. If `true` -> Execute `onAction()`.
3. If `false` -> Execute `AuthGuardStore.openModal()`.

---

## 3. UI Component (`AuthGuardModal`)

### Structure:
- **Wrapper**: `AuthGuardWrapper` (`ssr: false` next/dynamic).
- **Core Component**: `AuthGuardModal`.

### Props:
- No external props required (uses global state).
- **Sub-components**: `ResponsiveModal`, `ResponsiveModalContent`, `ResponsiveModalHeader`, `ResponsiveModalTitle`, `ResponsiveModalDescription`.

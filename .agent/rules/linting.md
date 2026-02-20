---
trigger: always_on
---

Goal: Strict adherence to **Next.js App Router + TypeScript + SaaS-grade quality**, according to the ESLint configuration defined in `eslint.config.ts`.

---

## 1) Naming & File Structure

### 1.1 File Naming (Mandatory)

- All files must use **kebab-case**:
  - ✅ `user-profile-card.tsx`
  - ✅ `reset-password-form.tsx`
  - ❌ `UserProfileCard.tsx`
  - ❌ `userProfileCard.tsx`

### 1.2 Reserved Next.js Files (Allowed Exceptions)

The following files are allowed as-is and must not be renamed:

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `route.ts`

### 1.3 React Component Naming

- Any React component used inside JSX must be **PascalCase**:
  - ✅ `<UserProfileCard />`
  - ❌ `<userProfileCard />`

- Filenames must remain `kebab-case` even if they export a PascalCase component:
  - ✅ `user-profile-card.tsx` contains  
    `export function UserProfileCard(){...}`

---

## 2) TypeScript Rules

### 2.1 Avoid `any`

- Using `any` is forbidden unless absolutely necessary.
- If unavoidable:
  - Prefer `unknown` first and apply type narrowing.
  - Or add a clear comment explaining why `any` is required.

### 2.2 Unused Variables

- Avoid unused variables.
- If you must intentionally ignore a variable/parameter:
  - Prefix it with `_`  
    Example: `(_req, _res)` or `const _unused = ...`

### 2.3 Type Imports

- Prefer type-only imports:
  - ✅ `import type { User } from "@/types";`

### 2.4 Promises (Important)

- Do not leave a Promise unhandled unless absolutely necessary.
  - Use `await`, `void`, or `return`.
  - For fire-and-forget cases:
    - Use `void someAsync()` with a comment explaining why.

---

## 3) React / Next.js Best Practices

### 3.1 Hooks

- Follow the Rules of Hooks.
- `react-hooks/exhaustive-deps` is set to warn:
  - Do not ignore dependencies without a clear reason and comment.

### 3.2 Images

- Do NOT use `<img />` in Next.js.
  - Use `next/image` instead.
  - ✅ `import Image from "next/image";`

### 3.3 App Router

- Follow the Next.js `app/` directory pattern:
  - Server Components by default.
  - Client Components only when necessary using `"use client"`.

---

## 4) Imports Policy

### 4.1 Import Order

- All imports must be at the top of the file.
- No duplicate imports.
- Add a blank line after the import block.

### 4.2 Unused Imports (Strict)

- Any unused import must be removed immediately.
- Do not keep imports “for future use”.

### 4.3 Circular Dependencies

- Avoid circular dependencies.
- If detected:
  - Refactor shared logic into `lib/` or `shared/`.

### 4.4 Anonymous Default Exports

- Avoid anonymous default exports like:
  - ❌ `export default () => ...`

- Prefer:
  - ✅ `export default function SettingsPage(){...}`

---

## 5) Code Quality & Maintainability

### 5.1 Prevent Code Degradation

- Avoid duplicating identical functions.
- Avoid unnecessary inverted boolean logic.
- Do not write overly complex code without reason.
- Cognitive complexity must remain low (target ≤ 18).
  - If a function becomes large, split it into smaller functions.

### 5.2 Prefer Constants

- Always use `const` unless `let` is required.
- `var` is forbidden.

### 5.3 Comparisons

- Do NOT use `==` or `!=`.
- Use only `===` and `!==`.

### 5.4 Debugging

- `debugger` is forbidden.

---

## 6) Console Policy

- `console.log` is forbidden.
- Allowed:
  - `console.warn`
  - `console.error`
  - `console.info`

### 6.1 Server / API Exception

In the following files:

- `**/app/api/**/*.{ts,tsx}`
- `**/pages/api/**/*.{ts,tsx}`
- `**/*.server.{ts,tsx}`

`console.debug` is also allowed.

---

## 7) Security Guidelines

- `child_process` usage is forbidden (Error).
- Do not use dynamic file paths with `fs` without explicit validation (Warn).
- Be aware of timing attack risks (Warn).
- Object injection rule is disabled, but:
  - Do NOT write code that allows key injection without validation.

**General Rule:**  
Any user input must be validated before use.

---

## 8) Formatting (Prettier)

- Do not add formatting rules inside ESLint (Prettier flat config exists).
- Let Prettier handle formatting.
- When modifying a file:
  - Preserve the existing formatting style.

---

## 9) Workflow Rules for AI Agent

When performing any task:

1. Apply changes with minimal diff.
2. Do not rename reserved Next.js files.
3. Remove unused imports immediately.
4. Do not add `console.log`.
5. Do not use `<img>`.
6. Keep code organized:
   - Imports at the top.
   - Small, clear functions.
7. If you must disable or bypass a rule:
   - Scope it as narrowly as possible.
   - Add a clear explanatory comment.

---

## 10) Definition of Done (DoD)

Before finishing any change:

- ✅ No unused imports
- ✅ Filenames are kebab-case (except allowed exceptions)
- ✅ Components are PascalCase
- ✅ No `console.log`
- ✅ No `<img>`
- ✅ No `==`, `var`, or `debugger`
- ✅ No unnecessary increase in complexity
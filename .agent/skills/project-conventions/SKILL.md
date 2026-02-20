---
name: project-conventions
description: Enforces this project's architectural patterns, styling rules, component structure, and coding conventions. Use when creating or modifying components in this repository.
---

# Project Conventions Skill

---

## When to use this skill

- When creating new components
- When editing existing components
- When adding styling
- When restructuring folders
- When reviewing PRs
- When introducing new features

---

## Project Context (Derived from Codebase Analysis)

This project is **Tailwind-first**, with a structured modular CSS layer for base UI primitives.

- Tailwind CSS 4 is the primary styling engine.
- Base UI components (button, card, input, etc.) use modular CSS defined in `src/styles/components/`.
- CVA (class-variance-authority) connects component props to predefined CSS class variants.
- Architecture follows a **feature-based domain structure** under `src/features`.
- Forms follow a strict `react-hook-form + zod` pattern using RHF wrapper components.
- Internationalization is mandatory for all user-facing text.

All conventions below are derived from actual patterns observed in the repository.

---

# Styling Rules

## Core Styling Strategy

- **Tailwind CSS 4 is the primary styling system.**
- Utility classes should be used directly in components.
- Prefer composition over custom CSS whenever possible.

## Modular CSS (Controlled Usage)

- Modular CSS is allowed **ONLY** for base UI primitives inside:
  `src/styles/components/`
- These styles must be imported into:
  `src/styles/base.css`
- Do NOT introduce new global CSS files.
- Do NOT create ad-hoc CSS files outside the modular system.
- If a new base component is needed, follow the modular CSS pattern.

## CVA Usage

- Use `class-variance-authority (CVA)` for UI component variants.
- Map props to predefined CSS classes.
- Avoid conditional Tailwind class duplication when CVA is appropriate.

## Semantic HTML

Prefer semantic elements:

- `<article>`
- `<section>`
- `<header>`
- `<footer>`
- `<button>`
- `<nav>`
- `<main>`

Avoid excessive `<div>` nesting for structural elements.

---

# Component Rules

## Component Declaration

- Use **function declarations** (not arrow functions for components).

```tsx
export function MyComponent({ ... }: MyComponentProps) {
  ...
}
```

## Props Typing

- Always use an **interface** for component props.

```tsx
interface MyComponentProps {
  ...
}
```

> [!NOTE]
> Components in `src/components/ui` are mostly shadcn-based and are exempt from the strict `interface` requirement. They may continue to use their original patterns (e.g., `React.ComponentProps`, `type`).

## Exports Policy

- **UI & Shared Components**: Use **Named Exports** (e.g., `src/components/ui`, `src/components/shared`).
- **Features & Pages**: Use **Default Exports** for main feature components and page-level forms (e.g., `src/features/[feature]/[component].tsx`).

## Form Implementation

- **Library**: Always use `react-hook-form` + `zod`.
- **RHF Wrappers**: Use the pre-built RHF components from `src/components/forms` (e.g., `RHFInput`, `RHFSelect`, `RHFCheckbox`).
- **Validation**: Place schemas in a `schema.ts` file within the feature directory.

---

# Folder & Architecture Rules

## Folder Structure

- **Features**: `src/features/[domain]` contains domain-specific logic, components, and schemas.
- **UI Primitives**: `src/components/ui` for base building blocks.
- **Shared Components**: `src/components/shared` for cross-feature UI elements.
- **Business Logic/Utilities**: `src/lib` for core logic, i18n configuration, and API clients.

## Path Aliases

Always use the following path aliases:
- `@/` -> `src/`
- `@components/` -> `src/components/`
- `@lib/` -> `src/lib/`
- `@utils/` -> `src/utils/`
- `@features/` -> `src/features/`

## Internationalization (i18n)

- Use the custom `useTranslation` hook from `@lib/i18n/client`.
- No hardcoded strings in JSX.
- All translations must live in `src/locales/[locale]/[namespace].json`.

---

# Decision Tree

1. **Creating a new UI primitive (e.g., a custom Button)?**
   - Create in `src/components/ui`.
   - Add modular CSS in `src/styles/components/`.
   - Use CVA for variants.
2. **Creating a new domain feature (e.g., Order tracking)?**
   - Create folder in `src/features/order-tracking`.
   - Implement forms using RHF wrappers.
3. **Need a shared utility?**
   - Place in `src/lib` or `src/utils`.
4. **Need styling?**
   - Default to Tailwind 4 utility classes.

---

## Important

- Base all rules on actual patterns found in the repository.
- Do NOT invent rules that do not exist.
- Keep the skill focused and concise.

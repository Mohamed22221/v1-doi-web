---
description: accessibility
---

# Global Accessibility, Semantic HTML & SVG Standards

## 1. Semantic HTML First

- **No Div-Buttons:** Never use `<div>` or `<span>` for interactive elements. Use `<button>` for actions and `<a>` (or Next.js `<Link>`) for navigation.
- **Landmarks:** Structure pages using `<main>`, `<header>`, `<footer>`, `<nav>`, and `<section>`.
- **Hierarchy:** Maintain a strict heading hierarchy (h1 -> h2 -> h3).

## 2. Dynamic Content & State

- **Toggles:** Use `aria-expanded` and `aria-controls` for modals, dropdowns, and accordions.
- **Updates:** Use `aria-live="polite"` for dynamic UI updates (e.g., search results, notifications).
- **Loading:** Use `aria-busy="true"` during data fetching (integrated with TanStack Query states).

## 3. SVG Icons Accessibility

- **Decorative:** If an icon is purely visual, add `aria-hidden="true"` and `role="presentation"` to the `<svg>`.
- **Action Icons:** If a button contains only an icon, the `<button>` MUST have an `aria-label`.
- **SVG Attributes:** Always use `focusable="false"` on SVGs and `fill="currentColor"` for styling.
- **Meaningful SVGs:** Use `role="img"` and a `<title>` tag linked via `aria-labelledby`.

## 4. Form Standards

- **Labels:** Every input must have a linked `<label htmlFor="...">`.
- **Errors:** Link error messages using `aria-describedby` and use `aria-invalid="true"` for failed validation.

## AI Directive

Always audit the accessibility of any code snippet before providing it. If a requested UI is inaccessible, suggest a semantic alternative.

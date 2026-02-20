---
trigger: manual
---

# Component Styling Rules & Guidelines

This document outlines the mandatory steps for styling any new or existing component in the project. Following these rules ensures consistency, maintainability, and full support for Dark Mode and RTL/LTR directions.

## 1. Check the Project Style Configuration

Before writing any style, familiarize yourself with the core configuration files in `src/styles/config/`:

- **[colors.css](file:///d:/doi-web/src/styles/config/colors.css)**: The source of truth for semantic color palettes (Primary, Secondary, Neutral, etc.).
- **[shadcn.css](file:///d:/doi-web/src/styles/config/shadcn.css)**: Functional variables that adapt to Light/Dark modes.
- **[theme.css](file:///d:/doi-web/src/styles/config/theme.css)**: Mappings that enable Tailwind CSS utilities.

## 2. Mandatory Styling Steps

### A. Use Semantic Variables

**NEVER** use hardcoded HEX/RGB values in your components or CSS.

- **Correct**: `var(--primary)`, `var(--background)`, `var(--border)`.
- **Incorrect**: `#2A3D5D`, `white`, `rgba(0,0,0,0.1)`.

### B. Prefer Tailwind Utility Classes

Always use Tailwind classes that are mapped to our theme. This ensures your component automatically responds to theme changes.

- Use `bg-primary` instead of `bg-[#2A3D5D]`.
- Use `text-foreground` instead of `text-[#292928]`.
- Use `border-border` instead of custom border colors.

### C. Dark Mode Compatibility

By using the variables from `shadcn.css`, your component will support Dark Mode automatically.

- Ensure you test your component in both modes.
- If you need a specific adjustment for dark mode, use the Tailwind `dark:` prefix or target the CSS `.dark` class.

### D. Component-Specific Styles (Including shadcn)

- **Mandatory**: Any style for a component (especially shadcn components) **MUST** be placed in `src/styles/components/`.
- **Naming Convention**: Use the underscore prefix for filenames (e.g., `_button.css`, `_dialog.css`).
- **Registration**: You must import the new file in **[base.css](file:///d:/doi-web/src/styles/base.css)**.
- **Example**: If you add a "Card" component, create `_card.css` in `src/styles/components/` and use our variables inside it.

### E. Layout & Direction (RTL/LTR)

- Use logical properties where possible (e.g., `ms-2` instead of `ml-2`).
- Check **[config.css](file:///d:/doi-web/src/styles/config/config.css)** for direction-based font handling.

## 3. Summary Checklist

- [ ] Does the component use `var()` calls or Tailwind theme classes?
- [ ] Is it compatible with Dark Mode?
- [ ] Does it respect RTL layout?
- [ ] Are there any hardcoded colors? (Should be 0)

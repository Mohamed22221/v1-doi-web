# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

This feature adds a responsive Product Details Modal (`Dialog`) to the seller dashboard. It allows sellers to view comprehensive information about their products without leaving the list view. The modal scales to full screen on devices under 1200px and remains a constrained overlay on larger screens to ensure optimal user experience according to SC-002.

## Technical Context

**Language/Version**: TypeScript / React 19 / Next.js 15
**Primary Dependencies**: Tailwind CSS 4, shadcn/ui (Dialog), lucide-react
**Storage**: N/A (Client-side cache via React Query)
**Testing**: Jest / Playwright
**Target Platform**: Web browsers (Responsive mobile/desktop)
**Project Type**: Next.js Web Application
**Performance Goals**: <200ms open time
**Constraints**: Overlay height <= 90vh on 1200px+ screens
**Scale/Scope**: Single component overlay connected to existing product cards

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Components follow Server-First Paradigm unless interactivity is strictly required. (Yes, modal state requires `"use client"`, but inner fetching/rendering boundary kept distinct if possible).
- [x] Uses `react-hook-form` / `zod` for any contained forms. (No forms in this display-only view).
- [x] Tailwind CSS 4 with semantic variables used exclusively (e.g., `bg-background`).
- [x] Complies with strict semantic HTML standards (no div-buttons) and accessibility standards (aria-labels for the modal close button).
- [x] Data fetches and side effects utilize `@lib/api/action-utils.ts` and TanStack React Query where necessary. *(N/A for this phase: UI preparation only, no APIs).*

## Project Structure

### Documentation (this feature)

```text
specs/005-product-details/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── features/
│   └── seller-dashboard/
│       └── products/
│           ├── product-card.tsx
│           └── details-product/
│               ├── view-product-content.tsx       # NEW: Extracting the details body
│               └── view-product-modal.tsx         # NEW: Modal wrapper component
```

**Structure Decision**: Standard web application feature structure. The `view-product-modal` handles the `Dialog` state, and `view-product-content` renders the internal UI to ensure modularity.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

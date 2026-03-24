# Implementation Plan: Seller Product Deletion Modal & Integration

**Branch**: `004-delete-product` | **Date**: 2026-03-24 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-delete-product/spec.md`

## Summary

Implement a responsive deletion flow for seller products using a shared `DeleteProductContent` component rendered within a `Dialog` (Desktop) or `Drawer` (Mobile). The implementation includes a new Server Action `deleteSellerProductAction`, a custom mutation hook `useDeleteProductMutation` with optimistic cache updates, and full RTL/Arabic support.

## Technical Context

**Language/Version**: TypeScript / Next.js 16  
**Primary Dependencies**: Tailwind CSS 4, react-hook-form, zod, TanStack React Query, shadcn/ui
**Error Handling**: Utilize `getApiErrorMessage` and `showErrorToast` with `{ positionSm: "bottom-center", className: "tablet:w-[545px] xl:w-[600px]" }` matching `use-auth.ts`.
**Storage**: Backend API interaction via `apiClient`  
**Testing**: NEEDS CLARIFICATION (No automated test suit detected in root; will use manual verification and browser-based validation)  
**Target Platform**: Web (Responsive, 768px midpoint)  
**Project Type**: Web Application (feature-based architecture)  
**Performance Goals**: UI optimistic update in < 100ms  
**Constraints**: Strict adherence to `.specify/memory/constitution.md` (Server Actions, TanStack Query hooks, i18n)  
**Scale/Scope**: Seller-facing product management domain

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Rule 1.1**: UI is isolated into client components; Dialog/Drawer triggers are Server-aware.
2. **Rule 2.2**: API calls wrapped in `serverActionWrapper` inside `src/lib/api/actions/products.ts`.
3. **Rule 2.3**: Client components use `useAppMutation` hooks, NO direct `apiClient` calls.
4. **Rule 5.2**: 100% i18n applied using `useTranslation` and locale JSONs.
5. **Rule 9.2**: Using `<button>` instead of div-buttons; proper `aria-` attributes for overlays.

## Project Structure

### Documentation (this feature)

```text
specs/004-delete-product/
├── plan.md              # This file
├── research.md          # Research findings
├── data-model.md        # Data entities and state
├── quickstart.md        # Feature setup guide
├── contracts/           # API interaction contract
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
src/
├── features/
│   └── seller/
│       └── products/
│           ├── components/
#### [NEW] [delete-product-content.tsx](file:///D:/doi-web/src/features/seller/products/components/delete-product-content.tsx)
- Shared UI Component for both Dialog (>768px) and Drawer (<768px).
- **Desktop UI**: Width `600px`, Max Height `560px`. Image (`Trash.png`) size `224.09px` x `174.62px`, padded `py-6`. Title fontSize `var(--text-h3)`. Target gap `16px` (`gap-4`).
- **Mobile UI**: Image Size `149.39px` x `116.41px`, padded `py-6`. Title fontSize `var(--text-h4)`. Description fontSize `var(--text-label)`. Target gap `16px` (`gap-4`).
- **Actions/Buttons**:
  - Desktop: `flex` row, 50% each with `gap-3`.
  - Mobile: `flex-col`, full width with `gap-3`.
  - Variants: Confirm (`variant="default"`, `rounded-sm`), Cancel (`variant="secondary"`, `rounded-sm`).
- **Typography Colors**: Title `var(--color-primary-500)` (dark: 200), Description `var(--color-neutral-600)` (dark: 100).
- Displays conditional warning text based on `ProductEffectiveStatus`.
├── lib/
│   └── api/
│       └── actions/
│           └── products.ts [MODIFY]
│       └── hooks/
│           └── use-seller-products.ts [MODIFY]
└── locales/
    └── ar/
        └── common.json [MODIFY]
```

**Structure Decision**: Using the existing feature-based domain structure under `src/features/seller`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

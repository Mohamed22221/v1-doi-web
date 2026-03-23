# Implementation Plan: Seller Products Infinite Scroll

**Branch**: `003-seller-products-scroll` | **Date**: 2026-03-23 | **Spec**: [spec.md](file:///D:/doi-web/specs/003-seller-products-scroll/spec.md)
**Input**: Feature specification from `/specs/003-seller-products-scroll/spec.md`

## Summary
Implement infinite scrolling for the Seller Products dashboard using TanStack Query v5 (`useInfiniteQuery`) and `react-intersection-observer`. Key UX improvements include **Early Fetching** (400px margin) and **Seamless Skeleton Appending**. The system will explicitly handle the **End of List** state with a "No more products" message and accessibility announcements.

## Technical Context

**Language/Version**: TypeScript / Next.js 16 (App Router)  
**Primary Dependencies**: `@tanstack/react-query` (v5), `react-intersection-observer`, `nuqs`  
**Storage**: N/A (Client-side state management)  
**Testing**: Manual / Browser-based (No automated suite detected)  
**Target Platform**: Web (Modern Browsers)
**Project Type**: Web Application (SaaS Dashboard)  
**Performance Goals**: Trigger fetch within 100ms of entering margin; Maintain 60fps while scrolling  
**Constraints**: Must use existing `getSellerProductsAction`; Must append skeletons at bottom without list jump  
**Scale/Scope**: ~10-50 products per fetch; Scalable to thousands of items  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Rule 1.1 (Client Isolation)**: Implementation is confined to the `ProductsList` client component. [PASS]
- **Rule 2.3 (React Query)**: Using `useInfiniteQuery` for state management. [PASS]
- **Rule 2.2 (Server Actions)**: Data fetching routes through `getSellerProductsAction`. [PASS]
- **Rule 9 (Accessibility)**: Implementation will include `aria-live="polite"` on both the Loading Skeleton and the "End of List" message. [PASS]
- **Rule 7 (File Naming)**: All new files will follow `kebab-case`. [PASS]

## Project Structure

### Documentation (this feature)

```text
specs/003-seller-products-scroll/
├── plan.md              # This file
├── research.md          # Implementation decisions
├── data-model.md        # Response structure
└── quickstart.md        # How to run locally
```

### Source Code (repository root)

```text
src/
├── lib/api/
│   ├── hooks/
│   │   └── use-seller-products.ts  # UPDATE: useInfiniteQuery implementation
├── features/seller-dashboard/products/
│   └── products-list.tsx            # UPDATE: Infinite scroll UI & Intersection Observer
```

**Structure Decision**: Following existing feature-based structure and shared API hooks layer.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | - | - |

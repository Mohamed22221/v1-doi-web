# Research & Decisions

## 1. Responsive Modal Implementation

- **Decision**: Use the existing `Dialog` component combined with Tailwind CSS media queries (`max-lg` / `lg`) to switch between full-screen and constrained modal modes.
- **Rationale**: The specification requires `<1200px` to be full screen, and `>=1200px` to be a constrained modal (max `90vh`). Using the existing `Dialog` primitive with tailored Tailwind classes is the most lightweight and consistent approach with the project's shadcn/ui foundation.
- **Alternatives considered**: Using a separate `Drawer` or `Sheet` component for mobile. Rejected because it adds unnecessary complexity and component switching overhead when simple CSS can handle the layout changes.

## 2. Data Handling Strategy

- **Decision**: No API integration is required at this stage. The UI will either use mock data or the existing `product` props passed from the `ProductCard`.
- **Rationale**: The current requirement is strictly for UI preparation ("تجهيز UI"). Any API integration or data fetching is deferred.
- **Alternatives considered**: Setting up React Query hooks or server actions now. Rejected because it exceeds the current scope.

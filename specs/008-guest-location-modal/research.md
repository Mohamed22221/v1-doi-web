# Research: Guest Location Selection Modal

## Decision: Component Architecture
- **Choice**: `shadcn/ui` Dialog (Radix UI).
- **Rationale**: Existing project standard for modals. Provides accessibility (focus trapping, aria-labels) out of the box.
- **Implementation**: Create `LocationModal` in `src/components/layout/location-modal.tsx`. Follow the "leaf component" rule from the Constitution (isolated interactive component).

## Decision: Cookie Management
- **Choice**: `js-cookie`.
- **Rationale**: Specifically requested in the feature description to handle client-side cookie logic reliably without Next.js middleware complexity for a simple UI mount check.
- **Pattern**: `Cookies.get('user_location')` on mount; `Cookies.set('user_location', value, { expires: 30 })` on selection.

## Decision: Geolocation Integration
- **Choice**: Native `navigator.geolocation.getCurrentPosition`.
- **Rationale**: Standard browser API. No external libraries needed.
- **Fallback**: If permission is denied or service unavailable, notify the user via a toast and return focus to the city selection list.

## Decision: Pattern Reference
- **Reference**: `src/features/seller-dashboard/products/delete-product-modal.tsx`.
- **Finding**: Uses `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` with a controlled `open` state. We will adapt this for the "forced" mount trigger.

## Decision: Visibility Trigger
- **Strategy**: Use an `useEffect` in the `LocationModal` itself or its layout wrapper.
- **Check**: `!isLoggedIn && !Cookies.get('user_location')`.
- **Defaulting**: If the user dismisses via backdrop/escape, a handler in `onOpenChange` (when `open` becomes `false`) will check if a selection was made. If not, it sets "الرياض" as the cookie value.

## Alternatives Considered
- **Middleware Redirection**: Rejected because we want a client-side modal experience, not a server-side redirect loop.
- **Zustand State Only**: Rejected because the location must persist across sessions for guest users.

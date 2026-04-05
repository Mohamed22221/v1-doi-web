# Quickstart: Auth Guard Modal

The Auth Guard Modal is a global utility designed to intercept protected actions (e.g., bidding, following, buying) initiated by guest users.

## 1. Usage

To protect a UI action, use the `useProtectedAction` hook.

### Basic Protection

```tsx
import { useProtectedAction } from "@/hooks/use-protected-action";

export function BidButton() {
  const protect = useProtectedAction();
  
  const handleBid = () => {
    // This logic only runs if the user is authenticated
    console.log("Bidding logic executed!");
  };

  return (
    <button onClick={protect(handleBid)}>
      Bid Now
    </button>
  );
}
```

### With Intent Preservation

If you provide an `intent` (e.g., "bid"), the system will append `?resume=bid` to the callback URL. After successful login, you can check for this parameter to automatically re-open the bidding drawer.

```tsx
const protect = useProtectedAction("bid");

// ... later in the component
const searchParams = useSearchParams();
useEffect(() => {
  if (searchParams.get("resume") === "bid" && isAuthenticated) {
    handleBid(); // Auto-resume the action
  }
}, [searchParams, isAuthenticated]);
```

## 2. Global Integration

The modal is integrated globally via the `ProvidersShell`. You do **not** need to add it to your feature pages.

1.  **Store**: `AuthGuardStore` manages `isOpen` and `intent`.
2.  **Wrapper**: `AuthGuardWrapper` handles dynamic loading (ssr: false) to prevent hydration issues.
3.  **Redirection**: The `useLogin` and `useVerifyOtp` hooks are already configured to handle `callbackUrl` redirection automatically.

## 3. UI Design

- **Mobile**: Becomes a bottom-sheet drawer using `ResponsiveModal`.
- **Desktop**: Centered dialog.
- **Illustration**: Uses `/img/authentication-bro.png`.

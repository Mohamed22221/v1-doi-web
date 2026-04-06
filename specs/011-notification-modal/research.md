# Research & Architecture Decisions: Notification Modal

## Web Push Integration & UX Flow

- **Decision:** Trigger the native `Notification.requestPermission()` only *after* the custom in-app modal step 2 is confirmed with at least one toggle enabled.
- **Rationale:** Native browser prompts (Web Push API) cannot be restyled and are often immediately blocked if presented without context. By utilizing a "soft prompt" (our custom Step 1 & 2 Modal), we educate the user on the value of tracking auctions/sales before asking for system-level access.
- **Alternatives Considered:** Triggering the native prompt immediately on page load (rejected due to high rejection rates and poor UX).

## Client-Side State & SSR Isolation

- **Decision:** Use a purely client-side wrapper (`NotificationModalWrapper`) enclosing a custom React Hook (`useNotificationModal`) that is dynamically executed on mount. The hook performs the auth and cookie checks. 
- **Rationale:** The application root layout (`src/app/[locale]/layout.tsx`) is a Server Component. We cannot execute `js-cookie` checks serverside reliably due to caching. The wrapper ensures that UI state (prompt status) only evaluates inside `useEffect`.
- **Alternatives Considered:** Using Next.js `ssr: false` via `next/dynamic` (rejected because it can cause hydration layout shift issues if placed incorrectly in `layout.tsx`).

## Global Figma Text Integration

- **Decision:** The strings extracted from the Figma context are verified and will be mapped to `locales/[locale]/common.json` under a `notification_modal` namespace.
- **Rationale:** Required by constitution architecture. Hardcoding Arabic text will fail English locale builds.

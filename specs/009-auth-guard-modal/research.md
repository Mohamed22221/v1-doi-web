# Research: Auth Guard Redirects & Assets

**Status**: Resolved | **Goal**: Define the redirection mechanism and identify design assets for the Auth Guard Modal.

---

## Decision 1: Authentication Redirection (Callback Strategy)

**Question**: How to correctly return the user to the action source after successful authentication?

### Options Considered:
1. **Dynamic Search Param**: Append `callbackUrl=...` to the Register/Login link.
2. **Session Storage**: Save the current pathname in `sessionStorage` before navigating.
3. **Zod/State context**: Pass the "Action Context" to the AuthStore.

### Selected Solution: **Option 1 (Dynamic Search Param)**
Since the `Login` and `Register` pages already likely handle a `callbackUrl` (standard Next-Auth or custom pattern), the `openModal` action in the `AuthGuardModal` will automatically capture the current `window.location.pathname` and append it as a query parameter to the navigation links.

**Rationale**: 
- Stateless and works across page refreshes.
- No dependency on storage APIs.
- Compatible with existing `BuyerLoginForm` logic if it supports `redirect` search params.

---

## Decision 2: Figma Design Assets (Illustration)

**Figma Reference**: [1318-22173 (Mobile)](https://www.figma.com/design/nFMq6SSTy7gQuirkoIFYBv/Doueh-Platform---Web-Version?node-id=1318-22173&m=dev)

### Illustration Identification:
The illustration depicts a "Locked/Account Required" scene. 
- **Internal Asset Search**: Check if `public/assets/illustrations/auth-guard.svg` or similar exists.
- **Fallback**: If no localized SVG is found, I will use a placeholder or request the user to export the SVG from Figma Node `1318:22173`.

---

## Decision 3: Translation Keys (Localization)

**Namespace**: `auth` or `common`

### Proposed Keys:
- `auth_modal.title`: "عشان تكمل وتزايد أو تشتري لازم يكون عندك حساب."
- `auth_modal.subtitle`: "تسجيلك سريع وبخطوتين! ويفتح لك كل المزادات."
- `auth_modal.register_btn`: "سجل حساب جديد"
- `auth_modal.login_link`: "عندك حساب؟ تسجيل دخول"

**Rationale**: Using a dedicated `auth_modal` prefix in the `auth` namespace keeps things organized.

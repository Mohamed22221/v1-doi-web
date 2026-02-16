---
trigger: manual
---

# Workspace Rule: Mandatory Next.js SaaS Folder Structure (Buyer / Seller)

**Status:** REQUIRED  
**Applies to:** All code in this workspace (features, pages, APIs, components, refactors)  
**Goal:** Enforce a scalable, secure, high-performance architecture with minimal duplication.

---

## 1) Non-Negotiable Principles

1. **`src/app/` is for routing only**
   - Allowed: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, route groups.
   - **Not allowed:** business logic, DB queries, complex permissions, reusable services.

2. **All business logic lives in `src/features/`**
   - Each domain (auth, buyer, seller, orders, catalog, etc.) owns its logic and domain UI.

3. **Shared UI is centralized**
   - Shared UI primitives go in `src/components/ui`.
   - Cross-domain layout pieces go in `src/components/layout`.
   - Marketing-only components go in `src/components/marketing`.

4. **Infrastructure and integrations live in `src/lib/`**
   - DB, auth/session helpers, security utilities, email, caching, payments, shared utilities.

5. **No duplication (DRY is mandatory)**
   - If the same logic appears in more than one place, it must be extracted to `features/` or `lib/`.

6. **Security is server-first**
   - Role authorization must be enforced by **middleware + server-side guards**.
   - Client-side checks are UI-only and never count as security.

7. **Performance is the default**
   - Prefer **Server Components**.
   - Use `"use client"` only when necessary (forms, modals, complex interactivity).

---

## 2) Approved Folder Structure (Canonical)

```txt
src/
  app/
    (public)/
      layout.tsx
      page.tsx
      pricing/page.tsx
      features/page.tsx
      contact/page.tsx

    (auth)/
      layout.tsx
      buyer/login/page.tsx
      seller/login/page.tsx
      forgot-password/page.tsx
      reset-password/page.tsx

    (app)/
      layout.tsx
      loading.tsx
      error.tsx

      buyer/
        layout.tsx
        page.tsx
        orders/page.tsx
        profile/page.tsx

      seller/
        layout.tsx
        page.tsx
        products/page.tsx
        orders/page.tsx
        analytics/page.tsx

    not-found.tsx

  features/
    auth/
      components/
        LoginForm.tsx
      server/
        login.ts
        register.ts
        permissions.ts
      types.ts
      index.ts

    buyer/
      components/
      server/
      types.ts
      index.ts

    seller/
      components/
      server/
      types.ts
      index.ts

    orders/
      server/
      types.ts

    catalog/
      server/
      types.ts

  components/
    ui/
    layout/
    marketing/
    forms/

  lib/
    db/
    auth/
    security/
    payments/
    email/
    cache/
    utils/

  config/
    roles.ts
    routes.ts
    env.ts

  types/
  hooks/
  styles/
  middleware.ts

# ApiClient — Usage Guide (Production Ready)

A single unified instance is exported for the entire application:

```ts
import { apiClient } from "@/api/api";
```

---

## Core Concepts

| Feature            | Detail                                                                      |
| ------------------ | --------------------------------------------------------------------------- |
| **Base URL**       | Read from `process.env.NEXT_PUBLIC_API_URL` via `API_BASE_URL`              |
| **Auth header**    | Injected automatically from cookies (server) or `document.cookie` (client)  |
| **Token refresh**  | Retried once on `401` with a module-level mutex to prevent race conditions  |
| **Timeout**        | Default **15 000 ms** — override per-request via `timeout` option           |
| **Caching (TTL)**  | Built-in memory cache with TTL. Only for `GET` requests.                    |
| **Deduplication**  | In-flight requests are deduplicated; redundant concurrent calls skip fetch. |
| **Error Handling** | Centralized `ApiError` with status, data, and automated 500 logging.        |
| **Zod validation** | Pass a `schema` option to validate & type-narrow at runtime.                |

---

## `RequestOptions<T>`

```ts
interface RequestOptions<T = unknown> extends Omit<RequestInit, "body" | "signal"> {
  schema?:   z.ZodType<T>;   // Zod schema for runtime validation
  locale?:   string;         // Overrides auto-detected locale header
  body?:     unknown;        // Auto JSON-serialized
  timeout?:  number;         // ms, default 15 000
  useCache?: boolean;        // Whether to use/populate the cache (GET only)
  ttl?:      number;         // Time-to-Live in ms (default 5 min)
}
```

---

## Caching & Deduplication

### Request Deduplication (Automatic)

If you trigger `apiClient.get('/user')` 5 times simultaneously, the network request is only fired **once**. The other 4 callers receive the same Promise and wait for the result.

### TTL Caching (Opt-in)

```ts
// Cached for 1 minute
const data = await apiClient.get('/stats', {
  useCache: true,
  ttl: 60_000
});
```

---

## Example 1 — Server Component (PPR/Streaming)

```ts
// src/features/seller/components/dashboard-stats.tsx
import { apiClient } from "@/api/api";
import { API_ENDPOINTS } from "@/api/constants";
import { DashboardStatsSchema } from "@/api/types";

export async function DashboardStats() {
  // Deduplicated and cached for 5 mins by default
  const stats = await apiClient.get(API_ENDPOINTS.SELLER.DASHBOARD, {
    schema: DashboardStatsSchema,
    useCache: true
  });

  return <div>{stats.revenue}</div>;
}
```

---

## Example 2 — Client Component with Toast

```tsx
"use client";

import { apiClient } from "@/api/api";
import { normalizeError } from "@/api/error";
import { toast } from "sonner"; // or react-hot-toast

export function UpdateProfile() {
  async function onSubmit(data: any) {
    try {
      await apiClient.post('/profile', data);
      toast.success("تم التحديث بنجاح");
    } catch (err: any) {
      if (err.status === 422) {
        // Backend validation errors
        toast.error("بيانات غير صالحة: " + JSON.stringify(err.data.errors));
      } else {
        toast.error(normalizeError(err));
      }
    }
  }
}
```

---

## Advanced API Methods

### Cache Invalidation

```ts
// Clear specific endpoint
apiClient.invalidateCache('/seller/dashboard');

// Clear everything
apiClient.invalidateCache();
```

### Query Param Sorting

The cache considers `apiClient.get('/list?a=1&b=2')` and `apiClient.get('/list?b=2&a=1')` as the **same request**. Parameters are sorted automatically to maximize cache hits.

---

## Error Handling Reference

| Scenario               | Thrown type                                     | Key properties                              |
| ---------------------- | ----------------------------------------------- | ------------------------------------------- |
| HTTP 400 - 499         | `ApiError`                                      | `.status` (number), `.data` (payload)       |
| HTTP 500+              | `ApiError`                                      | Automated console logging (monitoring stub) |
| Zod mismatch           | `ZodError`                                      | Use `err.issues` or `normalizeError(err)`   |
| Timeout                | `DOMException`                                  | `.name === "AbortError"`                    |
| No refresh token / 401 | Redirect (server) or `window.location` (client) | —                                           |

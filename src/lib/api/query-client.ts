"use client";

import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime of 5 seconds is critical for SSR + prefetch:
        // prevents immediate client-side refetch after HydrationBoundary
        staleTime: 5 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

// ─── Singleton for the Server (RSC + prefetch) ─────────────────────────────
// We use a module-level variable instead of React.cache to avoid issues
// with the "use client" boundary — this file is kept as a utility.
// For Server Components, import `getQueryClient` from `@/api/get-query-client`.

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Always create a new client on the server to avoid cross-request sharing
    return makeQueryClient();
  }
  // On the browser, reuse the singleton
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}

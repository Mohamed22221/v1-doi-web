import { cache } from "react";
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
// We use React.cache to ensure that the same QueryClient is reused
// for the duration of a single request on the server.
const getRequestQueryClient = cache(makeQueryClient);

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return getRequestQueryClient();
  }
  // On the browser, reuse the singleton
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}

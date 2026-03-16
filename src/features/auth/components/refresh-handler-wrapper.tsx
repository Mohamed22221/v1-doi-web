import { headers } from "next/headers";
import { RefreshHandler } from "./refresh-handler";

/**
 * Server Component wrapper for the RefreshHandler.
 * Isolated dynamic header access to prevent blocking the entire layout.
 * This allows Partial Prerendering (PPR) to work effectively.
 */
export async function RefreshHandlerWrapper() {
  const requestHeaders = await headers();
  const shouldRefresh = requestHeaders.get("x-should-refresh") === "true";
  return <RefreshHandler shouldRefresh={shouldRefresh} />;
}

import { cookies } from "next/headers";
import { SellerStatusTracker } from "./seller-status-tracker";

/**
 * SellerStatusTrackerServer
 * 
 * Server component wrapper to safely read cookies and pass them to the client-side tracker.
 * This is intended to be wrapped in <Suspense> to avoid blocking the entire layout.
 */
export async function SellerStatusTrackerServer() {
  const cookieStore = await cookies();
  const initialRole = cookieStore.get("user_role")?.value || null;
  const initialStatus = cookieStore.get("account_status")?.value || null;

  return <SellerStatusTracker initialRole={initialRole} initialStatus={initialStatus} />;
}

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateAccountStatusAction } from "@/lib/api/actions/seller";
import { useSellerStatus } from "@/lib/api/hooks/use-seller";

/**
 * SellerStatusTracker
 *
 * Periodically polls the seller verification status via useSellerStatus hook (Lazy Tracking).
 * Syncs the session if the verification status has changed since the last cookie update.
 */
export function SellerStatusTracker({
  initialRole: _initialRole,
  initialStatus,
}: {
  initialRole: string | null;
  initialStatus: string | null;
}) {
  const router = useRouter();
  const upgradeInProgress = useRef(false);
  const shouldTrack =
    initialStatus === "seller-pending" ||
    initialStatus === "seller-rejected" ||
    initialStatus === "seller-approved";

  // Lazy Tracking: Enabled for pending or rejected sellers
  const { data } = useSellerStatus(shouldTrack);

  useEffect(() => {
    const fetchedStatus = data?.approvalStatus;
    if (!fetchedStatus || upgradeInProgress.current) return;

    // Map fetched status to our account_status format for comparison
    const mappedStatus = `seller-${fetchedStatus}`;

    // If the status from API differs from our current cookie status, trigger sync
    if (mappedStatus !== initialStatus) {
      upgradeInProgress.current = true;

      const syncStatus = async () => {
        try {
          const result = await updateAccountStatusAction(mappedStatus);

          if (result.success) {
            // Redirect based on the NEW status
            if (fetchedStatus === "approved") {
              router.push("/seller/success");
            } else if (fetchedStatus === "rejected") {
              router.push("/seller/rejected");
            }
            router.refresh();
          } else {
            upgradeInProgress.current = false;
          }
        } catch (error) {
          console.error("[SellerStatusTracker] Status sync failed:", error);
          upgradeInProgress.current = false;
        }
      };

      syncStatus();
    }
  }, [data?.approvalStatus, initialStatus, router]);

  return null;
}

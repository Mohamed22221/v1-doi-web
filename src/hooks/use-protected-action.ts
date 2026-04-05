"use client";

import { useAuthStore } from "@/lib/store/auth-store";
import { useAuthGuardStore } from "@/lib/store/auth-guard-store";

/**
 * Custom hook to intercept protected actions for guest users.
 */
export function useProtectedAction(intent?: string) {
  const user = useAuthStore((state) => state.user);
  const openAuthModal = useAuthGuardStore((state) => state.openModal);

  /**
   * Wraps a function with an authentication guard.
   * @param action The function to execute if authenticated.
   * @returns A guarded version of the function.
   */
  return (action: () => void) => {
    return () => {
      if (!user) {
        openAuthModal(intent);
        return;
      }
      action();
    };
  };
}

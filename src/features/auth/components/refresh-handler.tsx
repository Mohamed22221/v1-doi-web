"use client";

import { useEffect, useCallback } from "react";
import { refreshSessionAction } from "@/lib/api/actions/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { useRouter } from "next/navigation";

interface RefreshHandlerProps {
  shouldRefresh?: boolean;
}

/**
 * Background Refresh Handler Component.
 * Detects the 'x-should-refresh' signal and triggers a silent token rotation.
 * Implements a simple concurrency lock to avoid multiple refreshes across tabs.
 */
export function RefreshHandler({ shouldRefresh }: RefreshHandlerProps) {
  const { user, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  const performRefresh = useCallback(async () => {
    // 1. Concurrency Lock: Check if another tab is already refreshing
    const now = Date.now();
    const lastRefresh = localStorage.getItem("last_refresh_attempt");

    // If we attempted a refresh in the last 10 seconds, skip to avoid race conditions
    if (lastRefresh && now - parseInt(lastRefresh, 10) < 10000) {
      return;
    }
    localStorage.setItem("last_refresh_attempt", now.toString());

    try {
      const result = await refreshSessionAction();

      if (result.type === "SUCCESS") {
        // Update global state with the new token
        // In a real app, you might decode the token to get the user object again if changed
        if (user) {
          setAuth(result.accessToken, "", user);
        }

        // Refresh the router to update Server Component state
        router.refresh();
      } else if (result.type === "UNAUTHORIZED") {
        // Session dead, clear local state and redirect
        clearAuth();
        router.push("/auth/login");
      }
    } catch (_error) {}
  }, [user, setAuth, clearAuth, router]);

  useEffect(() => {
    if (shouldRefresh && user) {
      performRefresh();
    }
  }, [shouldRefresh, user, performRefresh]);

  return null;
}

"use client";

import dynamic from "next/dynamic";

/**
 * Hydration-safe wrapper for the AuthGuardModal.
 * Uses dynamic import with ssr: false to prevent hydration mismatches
 * and ensure the modal bundle is only loaded on the client.
 */
export const AuthGuardWrapper = dynamic(
  () => import("./auth-guard-modal").then((mod) => mod.AuthGuardModal),
  { ssr: false }
);

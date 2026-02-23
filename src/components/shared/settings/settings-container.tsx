"use client";

import dynamic from "next/dynamic";

/**
 * SettingsContainer
 * 
 * A client wrapper for the FloatingSettings component.
 * Uses dynamic import with 'ssr: false' to prevent hydration mismatches
 * and satisfies Next.js requirements that 'ssr: false' dynamic imports
 * must be called from within a Client Component.
 */
const FloatingSettings = dynamic(
    () => import("./floating-settings").then((mod) => mod.FloatingSettings),
    { ssr: false }
);

export function SettingsContainer() {
    return <FloatingSettings />;
}

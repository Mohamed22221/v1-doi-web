// src/components/layout/location-modal-wrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const LocationModal = dynamic(
  () =>
    import("@/components/template/location-modal/location-modal").then((mod) => mod.LocationModal),
  { ssr: false },
);

export function LocationModalWrapper() {
  return (
    <Suspense fallback={null}>
      <LocationModal />
    </Suspense>
  );
}

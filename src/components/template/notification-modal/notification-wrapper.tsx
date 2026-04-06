"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const NotificationModal = dynamic(
  () => import("./index").then((mod) => mod.NotificationModal),
  { ssr: false },
);

export function NotificationModalWrapper() {
  return (
    <Suspense fallback={null}>
      <NotificationModal />
    </Suspense>
  );
}

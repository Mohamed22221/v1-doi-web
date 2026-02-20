"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useNavStore } from "@lib/store/nav-store";
import { removeLocaleFromPathname } from "@lib/nav/utils";

export function NavSync() {
  const pathname = usePathname();
  const setActiveHref = useNavStore((state) => state.setActiveHref);

  useEffect(() => {
    const cleanPath = removeLocaleFromPathname(pathname);
    setActiveHref(cleanPath);
  }, [pathname, setActiveHref]);

  return null;
}

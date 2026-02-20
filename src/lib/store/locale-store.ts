"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cookieName, defaultLocale, getDirection, type Locale } from "@lib/i18n/config";

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  getDirection: () => "ltr" | "rtl";
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set, get) => ({
      locale: defaultLocale,
      setLocale: (locale: Locale) => {
        set({ locale });
        // Write to cookie for SSR
        if (typeof document !== "undefined") {
          const expires = new Date();
          expires.setFullYear(expires.getFullYear() + 1); // 1 year
          document.cookie = `${cookieName}=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
        }
      },
      getDirection: () => getDirection(get().locale),
    }),
    {
      name: "locale-storage", // LocalStorage key
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          // Server-side: return dummy storage
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return window.localStorage;
      }),
    },
  ),
);

// Helper to get locale from cookie (server-side safe)
export function getLocaleFromCookie(): Locale | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const localeCookie = cookies.find((c) => c.startsWith(`${cookieName}=`));

  if (localeCookie) {
    const locale = localeCookie.split("=")[1] as Locale;
    return locale;
  }

  return null;
}

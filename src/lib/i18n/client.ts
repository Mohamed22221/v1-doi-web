"use client";

import { useEffect } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import { getOptions } from "./settings";
import { type Locale, cookieName } from "./config";

const runsOnServerSide = typeof window === "undefined";

// Initialize i18next for client with minimal plugins to reduce TBT
i18next
  .use(initReactI18next)
  .init({
    ...getOptions(),
    lng: undefined, // detect automatically via route/props
    detection: {
      order: ["path", "cookie", "localStorage", "navigator"],
      lookupCookie: cookieName,
      lookupLocalStorage: "i18nextLng",
      caches: ["cookie", "localStorage"],
    },
    preload: runsOnServerSide ? ["en", "ar"] : [],
  });

export function useTranslation(lng: Locale, ns?: string, options?: { keyPrefix?: string }) {
  const ret = useTranslationOrg(ns, { ...options, lng });
  const { i18n } = ret;

  // Server-side synchronization
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  // Client-side synchronization
  useEffect(() => {
    if (!lng || runsOnServerSide || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  return ret;
}

export { i18next };

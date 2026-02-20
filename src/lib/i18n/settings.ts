import type { Locale } from "./config";

export const fallbackLng: Locale = "en";
export const defaultNS = "common";
export const namespaces = ["common", "home"] as const;

export function getOptions(lng: Locale = fallbackLng, ns: string = defaultNS) {
  return {
    // debug: process.env.NODE_ENV === "development",
    supportedLngs: ["en", "ar", "fr", "de", "es", "tr", "fa", "ur"],
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

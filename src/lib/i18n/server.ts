import { cache } from "react";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, defaultNS } from "./settings";
import type { Locale } from "./config";

type TranslationResource = string | { [key: string]: TranslationResource };

const loadLocaleResource = async (language: string, namespace: string): Promise<TranslationResource> => {
  "use cache";
  const importedResource = await import(`../../locales/${language}/${namespace}.json`);
  return importedResource.default;
};

/**
 * Fetches all necessary resources for a given locale and namespace.
 * Marked with 'use cache' to ensure it's treated as static data by Next.js.
 */
async function fetchResources(lng: Locale, ns: string) {
  "use cache";
  return await loadLocaleResource(lng, ns);
}

const initI18next = async (lng: Locale, ns: string, resources: TranslationResource) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      ...getOptions(lng, ns),
      resources: {
        [lng]: {
          [ns]: resources,
        },
      },
    });
  return i18nInstance;
};

const getCachedI18n = cache(async (lng: Locale, ns: string) => {
  const resources = await fetchResources(lng, ns);
  return await initI18next(lng, ns, resources);
});

export async function getResources(lng: Locale, ns: string | string[] = ["common"]) {
  "use cache";
  const namespaces = Array.isArray(ns) ? ns : [ns];
  const resources: Record<string, TranslationResource> = {};

  for (const n of namespaces) {
    resources[n] = await loadLocaleResource(lng, n);
  }

  return resources;
}

export async function getTranslation(
  lng: Locale,
  ns: string = defaultNS,
  options: { keyPrefix?: string } = {},
) {
  const i18nextInstance = await getCachedI18n(lng, ns);

  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}

import { cache } from "react";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";
import type { Locale } from "./config";

const initI18next = cache(async (lng: Locale, ns?: string) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend((language: string, namespace: string) =>
                import(`../../locales/${language}/${namespace}.json`)
            )
        )
        .init(getOptions(lng, ns));

    return i18nInstance;
});

export async function getResources(lng: Locale, ns: string | string[] = ["common"]) {
    'use cache';
    const namespaces = Array.isArray(ns) ? ns : [ns];
    const resources: Record<string, Record<string, string>> = {};

    for (const n of namespaces) {
        const i18nInstance = await initI18next(lng, n);
        const bundle = i18nInstance.getResourceBundle(lng, n);
        if (bundle) {
            // CRITICAL: Ensure it's a plain object to avoid Next.js serialization errors
            resources[n] = JSON.parse(JSON.stringify(bundle));
        }
    }

    return resources;
}

export async function getTranslation(
    lng: Locale,
    ns?: string,
    options: { keyPrefix?: string } = {}
) {
    const i18nextInstance = await initI18next(lng, ns);

    return {
        t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
        i18n: i18nextInstance,
    };
}

export const locales = ["en", "ar", "fr", "de", "es", "tr", "fa", "ur"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const directionMap: Record<Locale, "ltr" | "rtl"> = {
    en: "ltr",
    ar: "rtl",
    fr: "ltr",
    de: "ltr",
    es: "ltr",
    tr: "ltr",
    fa: "rtl",
    ur: "rtl",
};

export const cookieName = "NEXT_LOCALE";

export function getDirection(locale: Locale): "ltr" | "rtl" {
    return directionMap[locale];
}

export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

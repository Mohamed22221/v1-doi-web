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

/**
 * Extracts the locale from the beginning of a pathname.
 * e.g., "/ar/dashboard" -> "ar"
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  if (match && isValidLocale(match[1])) {
    return match[1] as Locale;
  }
  return null;
}

/**
 * Detects the best locale based on cookies and Accept-Language header.
 */
export function detectLocale(requestCookies: unknown, acceptLanguage: string | null): Locale {
  let cookieLocale: string | undefined;

  if (requestCookies && typeof requestCookies === "object") {
    const cookiesObj = requestCookies as Record<string, unknown>;

    if (typeof cookiesObj.get === "function") {
      cookieLocale = (
        cookiesObj as unknown as { get: (n: string) => { value: string } | undefined }
      ).get(cookieName)?.value;
    } else if (typeof cookiesObj[cookieName] === "string") {
      cookieLocale = cookiesObj[cookieName] as string;
    }
  }

  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // 2. Try browser language
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(",")[0].split("-")[0];
    if (isValidLocale(browserLocale)) {
      return browserLocale as Locale;
    }
  }

  // 3. Fallback
  return defaultLocale;
}

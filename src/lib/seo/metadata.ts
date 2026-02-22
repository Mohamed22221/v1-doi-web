import type { Metadata } from "next";
import { getTranslation } from "../i18n/server";
import { type Locale, locales } from "../i18n/config";

interface SeoOptions {
    locale: Locale;
    pageKey: string;
    pathname?: string;
    ns?: string;
    params?: Record<string, string>;
    baseUrl?: string;
}

/**
 * Generates localized metadata for a given page.
 * Pulls from the 'seo' namespace by default.
 */
export async function generateLocalizedMetadata({
    locale,
    pageKey,
    pathname = "",
    ns = "seo",
    params = {},
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://doi.com",
}: SeoOptions): Promise<Metadata> {
    const { t } = await getTranslation(locale, ns);

    // Derive title and description with fallbacks
    const title = t(`${pageKey}.title`, params) || t("default.title");
    const description = t(`${pageKey}.description`, params) || t("default.description");

    const url = `${baseUrl}/${locale}${pathname}`;

    // Construct language alternates
    const languages: Record<string, string> = {};
    locales.forEach((l) => {
        languages[l] = `${baseUrl}/${l}${pathname}`;
    });

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: t("default.siteName"),
            locale: locale.replace("-", "_"),
            type: "website",
            images: [
                {
                    url: `${baseUrl}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${baseUrl}/og-image.jpg`],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

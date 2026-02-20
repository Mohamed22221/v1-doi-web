'use client';

import { type ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18next } from '@/lib/i18n/client';
import type { Locale } from '@/lib/i18n/config';

interface I18nProviderProps {
    children: ReactNode;
    locale: Locale;
    resources?: Record<string, Record<string, string>>;
}

export function I18nProvider({ children, locale, resources }: I18nProviderProps) {
    // Add resources if provided from server
    if (resources) {
        Object.keys(resources).forEach((ns) => {
            if (!i18next.hasResourceBundle(locale, ns)) {
                i18next.addResourceBundle(locale, ns, resources[ns], true, true);
            }
        });
    }

    // Sync language after first render to match server
    useEffect(() => {
        if (i18next.language !== locale) {
            i18next.changeLanguage(locale);
        }
    }, [locale]);

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

'use client';

import { useEffect } from 'react';
import { getDirection, type Locale } from '@lib/i18n/config';

interface LocaleSyncProps {
    locale: Locale;
}

/**
 * A client component that syncs the locale and direction to the root <html> tag.
 * Since the <html> tag is now in the root layout (to persist theme), 
 * we update its attributes dynamically when the locale segment changes.
 */
export function LocaleSync({ locale }: LocaleSyncProps) {
    useEffect(() => {
        const root = document.documentElement;
        const direction = getDirection(locale);

        root.lang = locale;
        root.dir = direction;
    }, [locale]);

    return null;
}

'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocaleStore } from '@store/locale-store';
import { i18next } from '@lib/i18n/client';
import { locales, type Locale } from '@lib/i18n/config';

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const { locale, setLocale } = useLocaleStore();
    const [isPending, startTransition] = useTransition();

    const handleLocaleChange = async (newLocale: Locale) => {
        if (newLocale === locale) return;

        // 1. Update Zustand store (prepares state + cookie)
        setLocale(newLocale);

        // 2. Await language change (fetches JSON if needed)
        // This prevents the "flash" of old language during navigation
        await i18next.changeLanguage(newLocale);

        // 3. Navigate to same route with new locale
        const currentLocale = pathname.split('/')[1];
        // Optimized path calculation as suggested by user
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
        const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

        startTransition(() => {
            // Use replace for a smoother experience as suggested
            router.replace(newPath);
        });
    };

    return (
        <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value as Locale)}
            disabled={isPending}
            className={`px-3 py-2 border rounded-md bg-background text-foreground transition-opacity ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
        >
            {locales.map((loc) => (
                <option key={loc} value={loc}>
                    {getLocaleLabel(loc)}
                </option>
            ))}
        </select>
    );
}

function getLocaleLabel(locale: Locale): string {
    const labels: Record<Locale, string> = {
        en: 'English',
        ar: 'العربية',
        fr: 'Français',
        de: 'Deutsch',
        es: 'Español',
        tr: 'Türkçe',
        fa: 'فارسی',
        ur: 'اردو',
    };
    return labels[locale];
}

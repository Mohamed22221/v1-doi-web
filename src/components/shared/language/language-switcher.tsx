'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocaleStore } from '@store/locale-store';
import { i18next } from '@lib/i18n/client';
import { locales, type Locale } from '@lib/i18n/config';

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const { locale, setLocale } = useLocaleStore();

    const handleLocaleChange = (newLocale: Locale) => {
        // 1. Update Zustand store (which updates cookie + localStorage)
        setLocale(newLocale);

        // 2. Change i18next language
        i18next.changeLanguage(newLocale);

        // 3. Navigate to same route with new locale
        // Remove current locale from pathname and add new one
        const currentLocale = pathname.split('/')[1];
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
        const newPath = `/${newLocale}${pathWithoutLocale || ''}`;

        router.push(newPath);
    };

    return (
        <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value as Locale)}
            className="px-3 py-2 border rounded-md bg-background text-foreground"
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

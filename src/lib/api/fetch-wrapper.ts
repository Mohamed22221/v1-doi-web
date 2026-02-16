import { cookies } from 'next/headers';
import { useLocaleStore } from '@store/locale-store';
import { cookieName, defaultLocale, getDirection, type Locale } from '@lib/i18n/config';

interface ApiFetchOptions extends RequestInit {
    locale?: Locale; // Manual override
}

/**
 * Unified fetch wrapper that automatically adds locale headers
 * Works in both server and client components
 */
export async function apiFetch(
    url: string,
    options: ApiFetchOptions = {}
): Promise<Response> {
    const { locale: manualLocale, headers: customHeaders, ...restOptions } = options;

    // Determine locale
    let locale: Locale = defaultLocale;

    if (manualLocale) {
        // Manual override
        locale = manualLocale;
    } else if (typeof window === 'undefined') {
        // Server-side: get from cookies
        const cookieStore = await cookies();
        const localeCookie = cookieStore.get(cookieName);
        locale = (localeCookie?.value as Locale) || defaultLocale;
    } else {
        // Client-side: get from Zustand store
        locale = useLocaleStore.getState().locale;
    }

    const direction = getDirection(locale);

    // Merge headers
    const headers = new Headers(customHeaders);
    headers.set('Accept-Language', locale);
    headers.set('X-Locale', locale);
    headers.set('X-Dir', direction);

    return fetch(url, {
        ...restOptions,
        headers,
    });
}

/**
 * Typed apiFetch that returns JSON
 */
export async function apiFetchJSON<T>(
    url: string,
    options: ApiFetchOptions = {}
): Promise<T> {
    const response = await apiFetch(url, options);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

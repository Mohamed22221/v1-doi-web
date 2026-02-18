'use client';

import { useEffect } from 'react';

interface ThemeSyncProps {
    theme: string;
}

/**
 * A client component that ensures document.documentElement class matches the server-detected theme.
 * This runs after the initial static shell hydrates, locking the theme without blocking SSR.
 */
export function ThemeSync({ theme }: ThemeSyncProps) {
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return null;
}

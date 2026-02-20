import { cookies } from "next/headers";
import { getResources } from "@lib/i18n/server";
import { I18nProvider } from "./i18n-provider";
import { ThemeSync } from "@/components/shared/theme/theme-sync";
import type { Locale } from "@/lib/i18n/config";

interface ProvidersShellProps {
    children: React.ReactNode;
    locale: Locale;
}

/**
 * A server component that streams dynamic theme and i18n data.
 * This component handles the 'cookies()' call inside a Suspense boundary
 * to prevent 'Blocking Route' errors and enable PPR.
 */
export async function ProvidersShell({ children, locale }: ProvidersShellProps) {
    const cookieStore = await cookies();
    const theme = cookieStore.get("theme")?.value || "light";
    const resources = await getResources(locale);

    return (
        <>
            <ThemeSync theme={theme} />
            <I18nProvider locale={locale} resources={resources}>
                {children}
            </I18nProvider>
        </>
    );
}

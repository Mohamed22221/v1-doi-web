import { type Locale, locales } from "@lib/i18n/config";
import { LanguageSwitcher } from "@components/shared/language/language-switcher";
import { NavSync } from "@components/layout/nav/nav-sync";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/shared/theme/theme-toggle";
import { LocaleSync } from "@components/shared/language/locale-sync";
import { ProvidersShell } from "@/components/providers/providers-shell";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale: rawLocale } = await params;
    const locale = rawLocale as Locale;

    return (
        <>
            <LocaleSync locale={locale} />
            <Suspense fallback={null}>
                <ProvidersShell locale={locale}>
                    <Suspense fallback={null}>
                        <NavSync />
                    </Suspense>
                    <main id="main-content" tabIndex={-1} className="outline-none">
                        {children}
                    </main>
                    <footer role="contentinfo" className="sr-only">
                        Doi Web Application
                    </footer>
                    <div
                        role="region"
                        aria-label="Settings"
                        className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2 scale-75 md:scale-100 origin-bottom-left"
                    >
                        <Suspense fallback={null}>
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </Suspense>
                    </div>
                </ProvidersShell>
            </Suspense>
        </>
    );
}

import type { Metadata } from "next";
import { Montserrat, Cairo } from "next/font/google";
import "@/app/globals.css";
import { getDirection, type Locale, locales } from "@lib/i18n/config";
import { I18nProvider } from "@components/providers/i18n-provider";
import { LanguageSwitcher } from "@components/shared/language/language-switcher";
import { NavSync } from "@components/layout/nav/nav-sync";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/shared/theme/theme-toggle";
import { THEME_INIT_CODE } from "@/components/shared/scripts/theme-init-code";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
    variable: "--font-cairo",
    subsets: ["arabic"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "DOI Web",
    description: "DOI Web Platform",
};

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
    const direction = getDirection(locale);

    return (
        <html lang={locale} dir={direction} suppressHydrationWarning>
            <head>
                {/* Inline blocking script for zero FOUC - executes before first paint */}
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_CODE }} />
            </head>
            <body className={`${montserrat.variable} ${cairo.variable} antialiased font-sans`}>
                {/* ThemeScript component for Next.js best practices */}

                <I18nProvider>

                    <Suspense fallback={null}>
                        <NavSync />
                    </Suspense>
                    <main>
                        {children}
                    </main>
                    <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2 scale-75 md:scale-100 origin-bottom-left">
                        <Suspense fallback={null}>
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </Suspense>
                    </div>

                </I18nProvider>

            </body>
        </html>
    );
}

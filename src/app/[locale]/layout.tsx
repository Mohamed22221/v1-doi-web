import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { type Locale, locales, getDirection } from "@lib/i18n/config";
import { NavSync } from "@components/layout/nav/nav-sync";
import { Suspense } from "react";
import { ProvidersShell } from "@/components/providers/providers-shell";
import { getTranslation } from "@lib/i18n/server";
import { SettingsContainer } from "@/components/shared/settings/settings-container";
import { THEME_INIT_CODE } from "@/components/shared/scripts/theme-init-code";
import { arabicFont, englishFont } from "@/lib/utils/fonts";
import "@/app/globals.css";
import { RefreshHandlerWrapper } from "@/features/auth/components/refresh-handler-wrapper";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "default",
    pathname: "",
  });
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const direction = getDirection(locale);
  const { t } = await getTranslation(locale, "common");

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${arabicFont.variable} ${englishFont.variable}`}
    >
      <head>
        {/* Inline blocking script for zero FOUC - executes before first paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_CODE }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only z-10000 rounded-full bg-primary-400 p-3 text-white shadow-lg focus:not-sr-only focus:absolute focus:start-4 focus:top-4"
        >
          {t("a11y.skipLink")}
        </a>
        <Suspense fallback={null}>
          <ProvidersShell locale={locale}>
            <Suspense fallback={null}>
              <RefreshHandlerWrapper />
            </Suspense>
            <Suspense fallback={null}>
              <NavSync />
            </Suspense>
            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <footer role="contentinfo" className="sr-only">
              Doi Web Application
            </footer>
            <SettingsContainer />
          </ProvidersShell>
        </Suspense>
      </body>
    </html>
  );
}

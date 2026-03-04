import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { type Locale, locales } from "@lib/i18n/config";
import { NavSync } from "@components/layout/nav/nav-sync";
import { Suspense } from "react";
import { LocaleSync } from "@components/shared/language/locale-sync";
import { ProvidersShell } from "@/components/providers/providers-shell";
import { getTranslation } from "@lib/i18n/server";

import { SettingsContainer } from "@/components/shared/settings/settings-container";

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
  const { t } = await getTranslation(locale, "common");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[10000] rounded-full bg-primary-400 p-3 text-white shadow-lg focus:not-sr-only focus:absolute focus:start-4 focus:top-4"
      >
        {t("a11y.skipLink")}
      </a>
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
          <SettingsContainer />
        </ProvidersShell>
      </Suspense>
    </>
  );
}

import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { type Locale, locales } from "@lib/i18n/config";
import { NavSync } from "@components/layout/nav/nav-sync";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { LocaleSync } from "@components/shared/language/locale-sync";
import { ProvidersShell } from "@/components/providers/providers-shell";

import { SettingsContainer } from "@/components/shared/settings/settings-container";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
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
          <SettingsContainer />
        </ProvidersShell>
      </Suspense>
    </>
  );
}

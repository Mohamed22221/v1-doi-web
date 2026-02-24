"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLocaleStore } from "@store/locale-store";
import { i18next } from "@lib/i18n/client";
import { locales, type Locale } from "@lib/i18n/config";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocaleStore();
  const [isPending, setIsPending] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale || isPending) return;

    setIsPending(true);

    // 1. Write cookie + Zustand so server picks up new locale on reload
    setLocale(newLocale);

    // 2. Build new path and hard-navigate
    //    Hard nav avoids async event-handler + Suspense re-suspension
    //    that freeze scroll on mobile
    const currentLocale = pathname.split("/")[1];
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

    // Update i18next client-side (fire and forget — page is reloading anyway)
    void i18next.changeLanguage(newLocale);

    window.location.assign(newPath);
  };

  const { t } = i18next;

  return (
    <select
      value={locale}
      onChange={(e) => handleLocaleChange(e.target.value as Locale)}
      disabled={isPending}
      aria-label={t("common.language")}
      className={`rounded-md border bg-background px-3 py-2 text-foreground transition-opacity ${isPending ? "pointer-events-none opacity-50" : ""}`}
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
    en: "English",
    ar: "العربية",
    fr: "Français",
    de: "Deutsch",
    es: "Español",
    tr: "Türkçe",
    fa: "فارسی",
    ur: "اردو",
  };
  return labels[locale];
}

"use client";

import { Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { type Locale } from "@/lib/i18n/config";
import { useLocaleStore } from "@/lib/store/locale-store";
import { usePathname } from "next/navigation";
import { i18next } from "@/lib/i18n/client";
import * as React from "react";

interface LanguageSwitcherProps {
  locale: Locale;
  englishLabel: string;
  arabicLabel: string;
}

export function LanguageSwitcher({ englishLabel, arabicLabel }: LanguageSwitcherProps) {
  const [isPending, setIsPending] = React.useState(false);
  const { locale, setLocale } = useLocaleStore();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale || isPending) return;

    setIsPending(true);
    setLocale(newLocale);

    const currentLocaleInPath = pathname.split("/")[1];
    const pathWithoutLocale = pathname.replace(`/${currentLocaleInPath}`, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

    // Fire and forget — page is reloading anyway
    void i18next.changeLanguage(newLocale);

    window.location.assign(newPath);
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-[12px] rounded-xs bg-transparent md:gap-[16px]",
        isPending && "pointer-events-none opacity-50",
      )}
    >
      <Globe className="size-[14px] text-primary-400 md:size-[16px] rtl:mb-1" aria-hidden="true" />

      <div className="flex items-center gap-[8px] text-sm font-thin tracking-[0.42px] whitespace-nowrap md:text-base md:tracking-[0.48px]">
        <button
          type="button"
          onClick={() => handleLocaleChange("ar")}
          disabled={isPending}
          className={cn(
            "transition-colors hover:text-primary-200",
            locale === "ar" ? "cursor-default font-bold text-primary-400" : "text-neutral-400",
          )}
        >
          {arabicLabel}
        </button>

        <span className="text-neutral-400 opacity-40">|</span>

        <button
          type="button"
          onClick={() => handleLocaleChange("en")}
          disabled={isPending}
          className={cn(
            "transition-colors hover:text-primary-200",
            locale === "en" ? "cursor-default font-bold text-primary-400" : "text-neutral-400",
          )}
        >
          {englishLabel}
        </button>
      </div>
    </div>
  );
}

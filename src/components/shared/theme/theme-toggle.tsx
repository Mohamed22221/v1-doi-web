"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@components/ui/button";
import { useThemeStore } from "@/lib/store/theme-store";
import { useTranslation } from "@lib/i18n/client";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "common");

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="relative bg-background">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`}
      />
      <span className="sr-only">{t("theme.toggle")}</span>
    </Button>
  );
}

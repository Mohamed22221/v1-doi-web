"use client";

import * as React from "react";
import { Settings2, ChevronRight, Globe, Moon, Sun, Check } from "lucide-react";
import { Button } from "@components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@components/ui/drawer";
import { useThemeStore } from "@/lib/store/theme-store";
import { useLocaleStore } from "@/lib/store/locale-store";
import { locales, type Locale } from "@/lib/i18n/config";
import { i18next } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import { cn } from "@utils/cn";

export function FloatingSettings() {
    const [open, setOpen] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const { theme, toggleTheme } = useThemeStore();
    const { locale, setLocale } = useLocaleStore();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: Locale) => {
        if (newLocale === locale || isPending) return;

        setIsPending(true);
        setLocale(newLocale);

        const currentLocale = pathname.split("/")[1];
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
        const newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

        // Fire and forget — page is reloading anyway
        void i18next.changeLanguage(newLocale);

        window.location.assign(newPath);
    };

    const getLocaleLabel = (loc: Locale): string => {
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
        return labels[loc];
    };

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="left">
            <DrawerTrigger asChild>
                <button
                    className={cn(
                        "fixed left-0 top-1/2 z-[9999] -translate-y-1/2 flex items-center justify-center h-12 w-8 rounded-r-xl bg-primary-800 text-white shadow-lg transition-all hover:w-10 group",
                        open && "left-[-40px]" // Hide trigger when open
                    )}
                    aria-label="Open Settings"
                >
                    <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                </button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-[300px] border-r">
                <DrawerHeader className="border-b pb-4">
                    <DrawerTitle className="flex items-center gap-2">
                        <Settings2 className="size-5" />
                        {locale === "ar" ? "الإعدادات" : "Settings"}
                    </DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col gap-8 p-6">
                    {/* Theme Section */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                            {locale === "ar" ? "المظهر" : "Appearance"}
                        </h3>
                        <div className="flex flex-col gap-2">
                            <Button
                                variant={theme === "light" ? "default" : "outline"}
                                className="justify-start gap-3 w-full"
                                onClick={() => theme !== "light" && toggleTheme()}
                            >
                                <Sun className="size-4" />
                                {locale === "ar" ? "فاتح" : "Light Mode"}
                                {theme === "light" && <Check className="ml-auto size-4" />}
                            </Button>
                            <Button
                                variant={theme === "dark" ? "default" : "outline"}
                                className="justify-start gap-3 w-full"
                                onClick={() => theme !== "dark" && toggleTheme()}
                            >
                                <Moon className="size-4" />
                                {locale === "ar" ? "داكن" : "Dark Mode"}
                                {theme === "dark" && <Check className="ml-auto size-4" />}
                            </Button>
                        </div>
                    </section>

                    {/* Language Section */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                            {locale === "ar" ? "اللغة" : "Language"}
                        </h3>
                        <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin">
                            {locales.map((loc) => (
                                <Button
                                    key={loc}
                                    variant={locale === loc ? "default" : "outline"}
                                    className={cn(
                                        "justify-start gap-3 w-full",
                                        isPending && "opacity-50 cursor-not-allowed"
                                    )}
                                    onClick={() => handleLocaleChange(loc)}
                                    disabled={isPending}
                                >
                                    <Globe className="size-4 opacity-50" />
                                    <span className="flex-1 text-start">{getLocaleLabel(loc)}</span>
                                    {locale === loc && <Check className="size-4" />}
                                </Button>
                            ))}
                        </div>
                    </section>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

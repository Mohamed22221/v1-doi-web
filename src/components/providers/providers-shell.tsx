import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cookies } from "next/headers";
import { getResources } from "@lib/i18n/server";
import { I18nProvider } from "./i18n-provider";
import { ThemeSync } from "@/components/shared/theme/theme-sync";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/components/ui/toast/sonner";
import { getDirection, type Locale } from "@/lib/i18n/config";

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
  const resources = await getResources(locale, [
    "common",
    "home",
    "seo",
    "auth",
    "seller-dashboard",
  ]);

  const dir = getDirection(locale);
  const toasterPosition = dir === "rtl" ? "top-left" : "top-right";

  return (
    <NuqsAdapter>
      <ThemeSync theme={theme} />
      <QueryProvider>
        <I18nProvider locale={locale} resources={resources}>
          {children}
        </I18nProvider>
        {/* Mobile: appears from the bottom */}

        <div className="block md:hidden">
          <Suspense>
            <Toaster
              closeButton
              position="bottom-center"
              dir={dir}
              toastOptions={{
                style: {
                  fontFamily: "var(--font-sans)",
                },
              }}
            />
          </Suspense>
        </div>

        {/* Desktop: appears from the top, direction-aware */}
        <div className="hidden md:block">
          <Suspense>
            <Toaster
              closeButton
              position={toasterPosition}
              dir={dir}
              toastOptions={{
                style: {
                  fontFamily: "var(--font-sans)",
                },
              }}
              offset={{
                left: "var(--toaster-container-offset)",
                right: "var(--toaster-container-offset)",
              }}
            />
          </Suspense>
        </div>

      </QueryProvider>
    </NuqsAdapter>
  );
}

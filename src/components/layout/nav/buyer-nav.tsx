import type { Role } from "@defs/nav";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import { NavLinksContainer } from "./nav-links-container";

interface BuyerNavProps {
  roles: Role[];
  locale: Locale;
}

export async function BuyerNav({ roles, locale }: BuyerNavProps) {
  const { t } = await getTranslation(locale, "common");

  return (
    <nav
      aria-label={t("nav.primary")}
      className="sticky top-0 z-30 hidden border-b bg-neutral-10 shadow-sm transition-all duration-300 md:block dark:bg-card"
    >
      <div className="mx-auto flex h-[85px] max-w-[1500px] items-center justify-center px-8">
        <div className="flex items-center gap-6">
          <NavLinksContainer roles={roles} locale={locale} variant="desktop" />
        </div>
      </div>
    </nav>
  );
}

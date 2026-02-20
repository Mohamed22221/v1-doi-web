import type { Role } from "@defs/nav";
import type { Locale } from "@lib/i18n/config";
import { NavLinksContainer } from "./nav-links-container";

interface MobileNavProps {
  roles: Role[];
  locale: Locale;
}

export async function MobileNav({ roles, locale }: MobileNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t bg-neutral-10 pb-[env(safe-area-inset-bottom)] backdrop-blur-[100px] transition-colors md:hidden dark:bg-card">
      <div className="flex h-16 items-center justify-around px-2">
        <NavLinksContainer roles={roles} locale={locale} variant="mobile" />
      </div>
    </nav>
  );
}

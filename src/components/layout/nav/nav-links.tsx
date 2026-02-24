import type { Locale } from "@lib/i18n/config";
import { NavLinksContainer } from "./nav-links-container";
import { Logo } from "@components/template/nav/logo";
import { PageContainer } from "@components/template/container/page-container";
import { HeaderActions } from "@components/layout/headers/header-actions";
import { HEADER_ACTIONS } from "@config/header-actions-config";
import { type NavConfigPresets, NAV_PRESETS } from "@/config/nav-config-view";
import { getTranslation } from "@lib/i18n/server";

interface NavLinksProps {
  /** Preset key (e.g. "seller", "guest") or a custom config object */
  config?: string | NavConfigPresets;
  locale: Locale;
}

export async function NavLinks({ config = "seller", locale }: NavLinksProps) {
  const navConfig = typeof config === "string" ? NAV_PRESETS[config] : config;

  if (!navConfig) return null;

  // Resolve translation labels for text-link actions server-side
  const textLinkActions = HEADER_ACTIONS.filter(
    (a) => a.type === "text-link" && a.translationKey && a.roles.includes(navConfig.actionRole),
  );

  const resolvedLabels: Record<string, string> = {};

  if (textLinkActions.length > 0) {
    const { t } = await getTranslation(locale, "auth");
    for (const action of textLinkActions) {
      if (action.translationKey) {
        resolvedLabels[action.id] = t(action.translationKey as Parameters<typeof t>[0]);
      }
    }
  }

  const positionClass = navConfig.position === "sticky" ? "sticky top-0" : "fixed inset-x-0 top-0";

  return (
    <header className={`${positionClass} z-40 hidden h-[85px] border-b bg-neutral-10 transition-colors md:block dark:bg-card`}>
      <PageContainer variant="full" className="relative flex h-full items-center justify-between">
        {/* Logo */}
        {navConfig.showLogo && (
          <div className="flex items-center">
            <Logo width={76} height={40} />
          </div>
        )}

        {/* Nav Links — always centered via absolute positioning */}
        {navConfig.showNavLinks && (
          <nav className="pointer-events-none absolute inset-x-0 flex items-center justify-center">
            <div className="pointer-events-auto flex items-center gap-2">
              <NavLinksContainer roles={navConfig.roles} locale={locale} variant="desktop" />
            </div>
          </nav>
        )}

        {/* Actions — rendered from unified header-actions-config */}
        <HeaderActions
          role={navConfig.actionRole}
          variant="desktop"
          resolvedLabels={resolvedLabels}
          locale={locale}
        />
      </PageContainer>
    </header>
  );
}

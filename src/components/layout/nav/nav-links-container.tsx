import { NAV_ITEMS } from "@config/nav-config";
import { NavItem } from "./nav-item";
import type { Role } from "@defs/nav";
import { shouldShowNavItem } from "@lib/nav/utils";
import type { Locale } from "@lib/i18n/config";
import Icon from "@components/shared/Icon";

interface NavLinksContainerProps {
  roles: Role[];
  locale: Locale;
  variant: "desktop" | "mobile";
}

export function NavLinksContainer({ roles, locale, variant }: NavLinksContainerProps) {
  return (
    <>
      {NAV_ITEMS.map((item) => {
        if (!shouldShowNavItem(item, roles, "")) return null;

        return (
          <NavItem
            key={item.id}
            href={item.href}
            exact={item.rules?.exact}
            icon={<Icon icon={item.icon} />}
            label={item.translationKey}
            variant={variant}
            locale={locale}
          />
        );
      })}
    </>
  );
}

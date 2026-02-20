import type { NavItem, Role, NavVisibilityRules } from "@defs/nav";
import { locales, type Locale } from "@lib/i18n/config";

export function shouldShowNavItem(item: NavItem, userRoles: Role[], pathname: string): boolean {
  const { rules } = item;
  if (!rules) return true;

  // Check Path Override
  if (rules.hideOn?.includes(pathname)) return false;
  if (rules.showOn && !rules.showOn.includes(pathname)) return false;

  // Check Roles
  if (rules.roles && !rules.roles.some((r) => userRoles.includes(r))) {
    return false;
  }

  // Check Auth
  if (rules.requiresAuth && userRoles.includes("guest")) {
    return false;
  }

  return true;
}

export function shouldHideNavbar(pathname: string, rules: NavVisibilityRules): boolean {
  const cleanPath = removeLocaleFromPathname(pathname);
  return rules.hideNavbarOn.some((prefix) => cleanPath.startsWith(prefix));
}

export function isNavItemActive(href: string, pathname: string, exact: boolean = false): boolean {
  const cleanPath = removeLocaleFromPathname(pathname);
  if (exact) return cleanPath === href;
  return cleanPath.startsWith(href) && (cleanPath === href || cleanPath[href.length] === "/");
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments.splice(1, 1);
    return segments.join("/") || "/";
  }
  return pathname;
}

"use client"

import Link from "next/link";
import { cn } from "@utils/cn";
import { useNavStore } from "@lib/store/nav-store";
import { isNavItemActive } from "@lib/nav/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  variant?: "desktop" | "mobile";
  badge?: number | string;
  exact?: boolean;
}

export function NavItem({
  href,
  label,
  icon,
  isActive: propIsActive,
  variant = "desktop",
  badge,
  exact,
}: NavItemProps) {

  const activeHref = useNavStore((state) => state.activeHref);
  const isDesktop = variant === "desktop";
  const isActive = propIsActive ?? isNavItemActive(href, activeHref, exact);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex flex-col items-center gap-1 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isDesktop ? "px-2 py-1 rounded-md" : "flex-1 py-1",
        isActive
          ? "text-primary-400"
          : "text-neutral-400 hover:text-primary-400",
      )}
    >
      <div
        className={cn(
          "relative size-6 transition-transform",
          isActive ? "scale-110" : "scale-100",
        )}
      >
        <div className="flex items-center justify-center md:h-[16px]">{icon}</div>

        {badge !== undefined && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
            {badge}
          </span>
        )}
      </div>
      <span
        className={cn(
          "font-medium whitespace-nowrap",
          isDesktop ? "text-body" : "text-[12px]",
        )}
      >
        {label}
      </span>

      {/* Indicator for active state in Mobile Nav */}
      {!isDesktop && isActive && (
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-b-[3px]  bg-primary-400" />
      )}
    </Link>
  );
}

import { HEADER_ACTIONS, type HeaderActionRole } from "@config/header-actions-config";
import { HeaderActionItem } from "./header-action-item";
import { cn } from "@utils/cn";
import type { Locale } from "@lib/i18n/config";

interface HeaderActionsProps {
  role: HeaderActionRole;
  variant: "mobile" | "desktop";
  className?: string;
  /** Pre-resolved labels keyed by action id (for text-link actions from server components) */
  resolvedLabels?: Record<string, string>;
  locale?: Locale;
}

export function HeaderActions({
  role,
  variant,
  className,
  resolvedLabels,
  locale,
}: HeaderActionsProps) {
  // Filter actions based on role and visibility rules
  const filteredActions = HEADER_ACTIONS.filter((action) => {
    const roleMatch = action.roles.includes(role);
    const visibilityMatch = action.visibility === "both" || action.visibility === variant;
    return roleMatch && visibilityMatch;
  });

  if (filteredActions.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {filteredActions.map((action) => (
        <HeaderActionItem
          key={action.id}
          action={action}
          role={role}
          variant={variant}
          resolvedLabel={resolvedLabels?.[action.id]}
          locale={locale}
        />
      ))}
    </div>
  );
}

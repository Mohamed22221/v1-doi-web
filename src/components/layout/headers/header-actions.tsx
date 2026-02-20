import { HEADER_ACTIONS, type HeaderActionRole } from "@config/header-actions-config";
import { HeaderActionItem } from "./header-action-item";
import { cn } from "@utils/cn";

interface HeaderActionsProps {
  role: HeaderActionRole;
  variant: "mobile" | "desktop";
  className?: string;
}

export function HeaderActions({ role, variant, className }: HeaderActionsProps) {
  // Filter actions based on role and visibility rules
  const filteredActions = HEADER_ACTIONS.filter((action) => {
    const roleMatch = action.roles.includes(role);
    const visibilityMatch = action.visibility === "both" || action.visibility === variant;

    // Hide actions on desktop for sellers as per requirements
    if (role === "seller" && variant === "desktop") return false;

    return roleMatch && visibilityMatch;
  });

  if (filteredActions.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {filteredActions.map((action) => (
        <HeaderActionItem key={action.id} action={action} role={role} variant={variant} />
      ))}
    </div>
  );
}

import { DashboardActionButton } from "./dashboard-action-button";
import type { ActionButtonData } from "./types";

interface ActionsBarProps {
  actions: ActionButtonData[];
  ariaLabel: string;
}

/**
 * ActionsBar
 *
 * Renders a horizontal grid of dashboard action buttons.
 * Single Responsibility: only handles layout of action buttons.
 */
export function ActionsBar({ actions, ariaLabel }: ActionsBarProps) {
  return (
    <nav aria-label={ariaLabel}>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {actions.map(({ id, ...rest }) => (
          <DashboardActionButton key={id} {...rest} />
        ))}
      </div>
    </nav>
  );
}

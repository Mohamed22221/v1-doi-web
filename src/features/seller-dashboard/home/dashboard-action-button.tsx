import { Button } from "@/components/ui/button";
import type { ActionButtonData } from "./types";

type ActionButtonProps = Omit<ActionButtonData, "id"> & { onClick?: () => void };

/**
 * DashboardActionButton
 *
 * A single large icon + label action button.
 * Single Responsibility: only renders one action tile.
 */
export function DashboardActionButton({ label, icon, onClick }: ActionButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="md:h-fill flex h-[71px] flex-col items-center justify-center gap-2 rounded-2xl px-3 py-4 transition-colors md:flex-row md:gap-2 md:py-8"
    >
      <span className="flex h-[24px] w-[24px] items-center justify-center">{icon}</span>
      <span className="text-tag md:text-h5">{label}</span>
    </Button>
  );
}

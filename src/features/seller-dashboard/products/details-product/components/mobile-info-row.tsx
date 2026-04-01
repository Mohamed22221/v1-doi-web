import * as React from "react";

/** Mobile: Horizontal label-value rows (rtl: value left, label right) */
export function MobileInfoRow({
  label,
  value,
  noData,
}: {
  label: string;
  value?: React.ReactNode;
  noData: string;
}) {
  return (
    <div className="flex w-full items-start justify-between">
      <p className="shrink-0 text-caption font-normal whitespace-nowrap text-neutral-400 dark:text-muted-foreground">
        {label}
      </p>
      <div className="trxt-right max-w-[75%] text-caption font-thin tracking-wide text-neutral-950 dark:text-foreground">
        {value ?? <span className="text-neutral-300 dark:text-muted-foreground/30">{noData}</span>}
      </div>
    </div>
  );
}

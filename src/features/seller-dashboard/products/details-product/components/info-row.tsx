import * as React from "react";

/** A label-value row where label is muted and value is bold */
export function InfoRow({
  label,
  value,
  noData,
}: {
  label: string;
  value?: React.ReactNode;
  noData: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-h5 leading-none font-bold text-neutral-400 dark:text-muted-foreground">
        {label}
      </p>
      <div className="text-h5 font-thin leading-none text-neutral-950 dark:text-foreground">
        {value ?? <span className="text-neutral-300 dark:text-muted-foreground/30">{noData}</span>}
      </div>
    </div>
  );
}

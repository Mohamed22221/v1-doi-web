import * as React from "react";
import { InfoRow } from "./info-row";

/** A grid row containing 3 InfoRow columns */
export function InfoGrid3({
  items,
  noData,
}: {
  items: Array<{ label: string; value?: React.ReactNode }>;
  noData: string;
}) {
  return (
    <div className="flex w-full items-start gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <InfoRow label={item.label} value={item.value} noData={noData} />
        </div>
      ))}
    </div>
  );
}

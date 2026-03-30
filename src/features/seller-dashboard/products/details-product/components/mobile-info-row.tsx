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
    <div className="flex items-start justify-between w-full" dir="rtl">
      <div className="text-caption font-thin text-neutral-950 tracking-wide max-w-[60%]">
        {value ?? <span className="text-neutral-300">{noData}</span>}
      </div>
      <p className="text-caption font-normal text-neutral-400 whitespace-nowrap shrink-0">
        {label}
      </p>
    </div>
  );
}

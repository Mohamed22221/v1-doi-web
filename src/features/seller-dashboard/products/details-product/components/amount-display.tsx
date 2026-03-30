import * as React from "react";
import { Riyall } from "@components/shared/icon-base/constant";

/** Amount with Saudi Riyal symbol */
export function Amount({ value }: { value?: number | null }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-h3 leading-none font-semibold text-neutral-950">
        {value.toLocaleString()}
      </span>
      <Riyall className="h-6 w-5" aria-hidden="true" />
    </div>
  );
}

import * as React from "react";
import { Riyall } from "@components/shared/icon-base/constant";

/** Amount with Saudi Riyal symbol */
export function Amount({ value }: { value?: number | null }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-caption leading-none text-neutral-950 dark:text-foreground md:text-h3 md:font-semibold">
        {value.toLocaleString()}
      </span>
      <Riyall
        className="h-[14px] w-[12px] text-neutral-950 dark:text-foreground md:h-6 md:w-5"
        aria-hidden="true"
      />
    </div>
  );
}

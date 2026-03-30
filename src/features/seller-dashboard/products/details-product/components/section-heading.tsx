import * as React from "react";
import { PencilIcon } from "@components/shared/icon-base/constant";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-h4 font-normal tracking-wider text-primary-500">{children}</h3>
      <span className="text-primary-400" aria-hidden="true">
        <PencilIcon className="size-7" aria-hidden="true" focusable="false" role="presentation" />
      </span>
    </div>
  );
}

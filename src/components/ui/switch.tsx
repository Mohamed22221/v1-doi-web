"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@utils/cn";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default" | "lg";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch switch",
        size === "default" && "switch-size-default",
        size === "sm" && "switch-size-sm",
        size === "lg" && "switch-size-lg",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "switch-thumb",
          size === "default" && "group-data-[size=default]/switch:size-4",
          size === "sm" && "group-data-[size=sm]/switch:size-3",
          size === "lg" && "group-data-[size=lg]/switch:size-6",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

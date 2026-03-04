"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "@utils/cn";

const toggleVariants = cva(
  "btn inline-flex cursor-pointer items-center justify-center transition-all",
  {
    variants: {
      variant: {
        default: "btn-default data-[state=on]:bg-primary-900 data-[state=on]:text-white",
        destructive: "btn-destructive",
        outline: "btn-outline data-[state=on]:bg-neutral-100 dark:data-[state=on]:bg-neutral-800",
        secondary: "btn-secondary",
        success: "btn-success",
        warning: "btn-warning",
        ghost: "btn-ghost",
        link: "btn-link",
      },
      size: {
        default: "btn-size-default",
        xs: "btn-size-xs",
        sm: "btn-size-sm",
        lg: "btn-size-lg",
        icon: "btn-size-icon",
        "icon-xs": "btn-size-icon-xs",
        "icon-sm": "btn-size-icon-sm",
        "icon-lg": "btn-size-icon-lg",
      },
      rounded: {
        none: "btn-rounded-none",
        xs: "btn-rounded-xs",
        sm: "btn-rounded-sm",
        md: "btn-rounded-md",
        lg: "btn-rounded-lg",
        xl: "btn-rounded-xl",
        full: "btn-rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  rounded,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, rounded, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

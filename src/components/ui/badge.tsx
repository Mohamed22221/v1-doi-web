import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@utils/cn";

export const badgeVariants = cva("badge", {
  variants: {
    variant: {
      default: "badge-default",
      secondary: "badge-secondary",
      destructive: "badge-destructive",
      outline: "badge-outline",
      ghost: "badge-ghost",
      link: "badge-link",
      success: "badge-success",
      warning: "badge-warning",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

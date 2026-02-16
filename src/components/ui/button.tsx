import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@utils/cn"

const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        default: "btn-default",
        destructive: "btn-destructive",
        outline: "btn-outline",
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
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  rounded = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-rounded={rounded}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

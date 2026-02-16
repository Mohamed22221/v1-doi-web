"use client"

import * as React from "react"
import { CheckIcon } from "@components/shared/Icon/constant"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@utils/cn"

const checkboxVariants = cva(
  "peer checkbox",
  {
    variants: {
      size: {
        default: "size-4",
        sm: "size-3.5",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Checkbox({
  className,
  size,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="checkbox-indicator"
      >
        <CheckIcon className={cn("size-3.5", size === "sm" && "size-3", size === "lg" && "size-4")} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, checkboxVariants }

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@utils/cn";

const inputVariants = cva("input", {
  variants: {
    size: {
      default: "h-10 text-sm",
      sm: "h-8 text-xs",
      lg: "h-14 px-4 text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>
>(({ className, type, size, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input, inputVariants };

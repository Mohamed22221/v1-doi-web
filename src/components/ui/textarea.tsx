import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const textareaVariants = cva("textarea", {
  variants: {
    size: {
      default: "min-h-[80px] text-sm",
      sm: "min-h-[60px] text-xs",
      lg: "min-h-[120px] text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>
>(({ className, size, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(textareaVariants({ size, className }))}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };

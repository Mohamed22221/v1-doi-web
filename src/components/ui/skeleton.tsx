import { cn } from "@utils/cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-neutral-100 dark:bg-primary-700", className)}
      {...props}
    />
  );
}

export { Skeleton };

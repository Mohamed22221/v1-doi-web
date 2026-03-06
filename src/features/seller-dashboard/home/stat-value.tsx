import { cn } from "@utils/cn";

interface StatValueProps {
  value: string;
  className?: string;
}

/**
 * StatValue
 *
 * A small Server Component that renders the dynamic value of a stat.
 * This can be used inside a Suspense boundary to allow streaming.
 */
export function StatValue({ value, className }: StatValueProps) {
  return (
    <span
      className={cn(
        "text-sm font-bold text-primary-900 md:text-h3 dark:text-neutral-50",
        className,
      )}
    >
      {value}
    </span>
  );
}

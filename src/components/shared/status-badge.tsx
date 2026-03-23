"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useTranslation } from "@lib/i18n/client";
import { type Locale } from "@lib/i18n/config";
import { cn } from "@utils/cn";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:outline-none md:text-body dark:focus:ring-neutral-300",
  {
    variants: {
      variant: {
        success:
          "bg-success-50 text-success-500 hover:bg-success-50/80 dark:bg-success-500/10 dark:text-success-400",
        warning:
          "bg-warning-100 text-warning-500 hover:bg-warning-100/80 dark:bg-warning-500/10 dark:text-warning-400",
        error:
          "bg-danger-50 text-danger-500 hover:bg-danger-50/80 dark:bg-danger-500/10 dark:text-danger-400",
        info: "bg-primary-50 text-primary-600 hover:bg-primary-50/80 dark:bg-primary-500/10 dark:text-primary-400",
        neutral:
          "bg-neutral-50 text-neutral-600 hover:bg-neutral-50/80 dark:bg-neutral-800 dark:text-neutral-400",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  status: string;
  locale: Locale;
  className?: string;
}

/**
 * StatusBadge
 *
 * Displays a semantically colored badge based on the product status.
 * Client Component (for compatibility with client-rendered lists)
 */
export default function StatusBadge({ status, locale, className }: StatusBadgeProps) {
  const { t } = useTranslation(locale, "seller-dashboard");

  // Map status to semantic variant
  const variantMap: Record<string, "success" | "warning" | "error" | "neutral" | "info"> = {
    active: "success",
    pending_approval: "warning",
    rejected: "error",
    inactive: "neutral",
    sold: "info",
    draft: "neutral",
    auction_scheduled: "info",
    auction_live: "success",
    auction_ended: "neutral",
    hidden: "neutral",
  };

  const variant = variantMap[status?.toLowerCase()] || "neutral";

  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {t(`products.status.${status?.toLowerCase()}`, { defaultValue: status })}
    </span>
  );
}

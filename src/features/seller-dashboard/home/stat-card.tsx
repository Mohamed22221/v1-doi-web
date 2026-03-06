import { Suspense } from "react";
import { cacheLife } from "next/cache";

import { cn } from "@utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import type { StatCardData } from "./types";
import { StatValue } from "./stat-value";

type StatCardProps = Omit<StatCardData, "id">;

/**
 * StatCardShell
 *
 * The static part of the StatCard, cached using Next.js 16 'use cache'.
 */
async function StatCardShell({
  title,
  subtitle,
  badge,
  badgePositive,
  icon,
  className,
  children,
}: Omit<StatCardProps, "value"> & { className?: string; children: React.ReactNode }) {
  "use cache";
  cacheLife("minutes");

  return (
    <article
      className={cn(
        "card group relative flex flex-col justify-between rounded-md p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-200/40 dark:hover:border-primary-600 dark:hover:shadow-primary-900/50",
        className,
      )}
    >
      {/* Icon — top start */}
      <span className="absolute start-4 top-3 flex h-[30px] w-[30px] items-center justify-center rounded-xl bg-primary-50 text-primary-400 transition-transform duration-300 group-hover:scale-110 md:top-4 md:h-[40px] md:w-[40px] dark:bg-primary-900/40 dark:text-primary-400">
        {icon}
      </span>

      {/* Badge — top end (optional) */}
      {badge && (
        <span
          className={cn(
            "absolute end-4 top-4 flex items-center gap-0.5 rounded-sm px-2 py-1 text-xs font-semibold md:px-5 md:py-2 md:text-h5",
            badgePositive
              ? "bg-success-100 text-success-500 dark:bg-success-500 dark:text-success-100"
              : "bg-danger-100 text-danger-500",
          )}
        >
          {badge}
        </span>
      )}

      {/* Body */}
      <div className="mt-8 flex flex-col gap-1 md:mt-12">
        <span className="text-tag text-neutral-600 md:text-h5 dark:text-neutral-200">{title}</span>
        <div className="flex items-center gap-2">
          {children}
          {subtitle && (
            <span className="flex items-center text-xs text-neutral-400 md:text-body dark:text-neutral-300">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * StatCard
 *
 * Displays a single KPI metric with a static shell and a dynamic value.
 * Composes the static shell with a dynamic value streamed via Suspense.
 */
export function StatCard(props: StatCardProps & { className?: string }) {
  const { value, ...shellProps } = props;

  return (
    <StatCardShell {...shellProps}>
      <Suspense fallback={<Skeleton className="h-7 w-20" />}>
        <StatValue value={value} />
      </Suspense>
    </StatCardShell>
  );
}

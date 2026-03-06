import { cacheLife } from "next/cache";
import Link from "next/link";

interface WidgetHeaderProps {
  title: string;
  viewAllLabel: string;
  viewAllHref?: string;
  showStatus?: boolean;
}

/**
 * WidgetHeader
 *
 * A reusable header for dashboard widgets.
 * Standardizes the layout of title, status indicator, and "View All" link.
 */
export async function WidgetHeader({
  title,
  viewAllLabel,
  viewAllHref = "#",
  showStatus = false,
}: WidgetHeaderProps) {
  "use cache";
  cacheLife("weeks");
  return (
    <div className="flex items-center justify-between">
      {/* Title + optional status dot — first child = right in RTL */}
      <div className="mt-2 flex items-center gap-3">
        <span className="text-base font-bold text-primary-500 md:text-h3 dark:text-primary-50">
          {title}
        </span>
        {showStatus && (
          <span className="h-2.5 w-2.5 rounded-full bg-success-500" aria-hidden="true" />
        )}
      </div>

      {/* View All — second child = left in RTL */}
      <Link
        href={viewAllHref}
        className="text-sm text-neutral-300 underline underline-offset-2 md:text-h4 dark:text-neutral-400"
      >
        {viewAllLabel}
      </Link>
    </div>
  );
}

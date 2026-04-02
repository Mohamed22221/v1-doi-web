import Link from "next/link";

interface SectionTitleProps {
  /** ID referenced by the parent <section aria-labelledby> */
  id: string;
  title: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  /** When true, renders the Live Now badge with a red pulsing dot */
  isLive?: boolean;
  /** Label for the live badge (e.g. "مباشر الان") */
  liveLabel?: string;
}

/**
 * SectionTitle — Server Component
 *
 * Reusable h2 heading row used across home-page sections.
 * Accepts an optional "View All" link for dynamic sections.
 *
 * Layout: space-between row, stacks on mobile.
 */
export function SectionTitle({
  id,
  title,
  viewAllLabel,
  viewAllHref,
  isLive,
  liveLabel,
}: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between gap-4 pb-6">
      <h2 id={id} className="text-xl font-bold tracking-wide text-foreground md:text-2xl">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        {/* Live badge — matches Figma node 1325:24754 */}
        {isLive && liveLabel && (
          <div className="flex items-center gap-2" aria-label={liveLabel}>
            <span className="size-4 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
            <span className="text-sm font-normal tracking-wide text-destructive sm:text-base">
              {liveLabel}
            </span>
          </div>
        )}

        {viewAllLabel && viewAllHref && (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm font-medium text-primary-300 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none md:text-h5"
          >
            {viewAllLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

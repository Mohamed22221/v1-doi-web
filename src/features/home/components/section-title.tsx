import Link from "next/link";

interface SectionTitleProps {
  /** ID referenced by the parent <section aria-labelledby> */
  id: string;
  title: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

/**
 * SectionTitle — Server Component
 *
 * Reusable h2 heading row used across home-page sections.
 * Accepts an optional "View All" link for dynamic sections.
 *
 * Layout: space-between row, stacks on mobile.
 */
export function SectionTitle({ id, title, viewAllLabel, viewAllHref }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between gap-4 pb-6">
      <h2 id={id} className="text-xl font-bold tracking-wide text-foreground md:text-2xl">
        {title}
      </h2>

      {viewAllLabel && viewAllHref && (
        <Link
          href={viewAllHref}
          className="shrink-0 text-sm font-medium text-primary-300 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none md:text-h5"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}

import { cacheLife } from "next/cache";

import { StatCard } from "./stat-card";
import type { StatCardData } from "./types";

interface StatsGridProps {
  stats: StatCardData[];
  ariaLabel: string;
}

/**
 * StatsGrid
 *
 * Renders a responsive grid of StatCard items.
 * The grid structure and static shells are cached using Next.js 16 'use cache'.
 */
export async function StatsGrid({ stats, ariaLabel }: StatsGridProps) {
  "use cache";
  cacheLife("minutes");

  return (
    <section aria-label={ariaLabel}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map(({ id, ...rest }) => (
          <StatCard key={id} {...rest} />
        ))}
      </div>
    </section>
  );
}

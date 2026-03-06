import { cacheLife } from "next/cache";
import Image from "next/image";

interface BuyerRatingsWidgetProps {
  title: string;
  viewAllLabel: string;
  ratingCount: string;
  emptyTitle: string;
  emptySubtitle: string;
  viewAllHref?: string;
  rating?: number;
  maxRating?: number;
}

/**
 * FolderSearchIcon
 *
 * Decorative SVG illustration: an open folder with a magnifying glass.
 * Matches the design reference image exactly.
 */

/**
 * StarIcon
 *
 * A single star SVG, either filled (gold) or empty (light grey).
 */
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "#F5A623" : "none"}
      stroke={filled ? "#F5A623" : "#D4BFA8"}
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * BuyerRatingsWidget
 *
 * Server Component showing the empty state for Buyer Ratings.
 * Displays the overall rating (0 by default), 5 stars and an empty state body.
 * Cached with a short TTL.
 */
export async function BuyerRatingsWidget({
  ratingCount,
  emptyTitle,
  emptySubtitle,
  rating = 0,
  maxRating = 5,
}: BuyerRatingsWidgetProps) {
  "use cache";
  cacheLife("days");

  const stars = Array.from({ length: maxRating }, (_, i) => i < rating);

  return (
    <article className="card mt-2 rounded-md px-2 md:mt-5 md:px-4">
      {/* Rating Row */}
      <div className="flex items-center gap-2" aria-label={ratingCount}>
        {/* Numeric rating */}
        <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{rating}</span>
        {/* Count label */}
        <span className="text-xs text-neutral-400 dark:text-neutral-500">{ratingCount}</span>
        {/* Stars (reversed so first star is leftmost) */}
        <div className="flex flex-row-reverse gap-0.5">
          {stars.map((filled, i) => (
            <StarIcon key={i} filled={filled} />
          ))}
        </div>
      </div>

      {/* Empty State Body */}
      <div className="flex flex-col items-center gap-3 py-1 text-center md:py-0">
        <Image
          src="/img/grid-home-2.png"
          alt="Active Auctions Empty"
          width={150}
          height={150}
          className="h-[100px] w-[100px] object-cover md:h-[150px] md:w-[150px]"
        />
        <p className="mt-1 text-h4 font-bold text-primary-500 md:text-h3 dark:text-primary-50">
          {emptyTitle}
        </p>
        <p className="text-label text-neutral-600 md:text-h5 dark:text-neutral-400">
          {emptySubtitle}
        </p>
      </div>
    </article>
  );
}

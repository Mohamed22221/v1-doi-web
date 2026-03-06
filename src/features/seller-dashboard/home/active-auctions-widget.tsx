import { cacheLife } from "next/cache";
import Image from "next/image";

interface ActiveAuctionsWidgetProps {
  title: string;
  viewAllLabel: string;
  emptyTitle: string;
  emptySubtitle: string;
  viewAllHref?: string;
}

/**
 * ActiveAuctionsWidget
 *
 * Server Component showing the empty state for Active Auctions.
 * Cached with a short TTL as content is structural / non-personalised.
 */
export async function ActiveAuctionsWidget({
  emptyTitle,
  emptySubtitle,
}: ActiveAuctionsWidgetProps) {
  "use cache";
  cacheLife("days");

  return (
    <article className="card mt-2 rounded-md p-2 md:mt-5 md:p-5">
      {/* Empty State Body */}
      <div className="flex flex-col items-center gap-3 py-3 text-center md:py-[33px]">
        <Image
          src="/img/grid-home-1.png"
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

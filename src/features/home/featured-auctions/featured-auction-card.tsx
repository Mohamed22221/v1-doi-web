import Link from "next/link";
import { Riyall } from "@/components/shared/icon-base/constant";
import { AuctionCardCarousel } from "./auction-card-carousel";
import { FeaturedAuctionTimer } from "./featured-auction-timer";
import { ProtectedLink } from "@/components/shared/protected-action";

export interface FeaturedAuctionCardProps {
  id: string;
  images: string[];
  title: string;
  price: string;
  href: string;
  locale: string;
  /** i18n labels */
  endsInLabel: string;
  currentPriceLabel: string;
  bidNowLabel: string;
  minutesLabel: string;
  secondsLabel: string;
  targetDateStr?: string;
  className?: string;
}

/**
 * FeaturedAuctionCard — Server Component (carousel is client)
 *
 * Figma node 713:8332 (desktop) / 1325:24759 (mobile)
 */
export function FeaturedAuctionCard({
  id,
  images,
  title,
  price,
  href,
  locale,
  endsInLabel,
  currentPriceLabel,
  bidNowLabel,
  minutesLabel,
  secondsLabel,
  targetDateStr,
  className,
}: FeaturedAuctionCardProps) {
  return (
    <article
      aria-labelledby={`auction-title-${id}`}
      className={`group flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:rounded-2xl sm:p-4 ${className ?? "flex"}`}
    >
      {/* ── Image Carousel (Client Component) ── */}
      <AuctionCardCarousel images={images} title={title} locale={locale} />

      {/* ── Title ── */}
      <h3
        id={`auction-title-${id}`}
        className="line-clamp-2 text-tag leading-snug font-bold tracking-wide text-foreground sm:text-xl"
      >
        <Link
          href={href}
          className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {title}
        </Link>
      </h3>

      {/* ── Divider ── */}
      <hr className="border-neutral-50 dark:border-neutral-700" aria-hidden="true" />

      {/* ── Timer block ── */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-xs tracking-wide text-neutral-400 sm:text-sm dark:text-muted-foreground">
          {endsInLabel}
        </p>
        <FeaturedAuctionTimer
          minutesLabel={minutesLabel}
          secondsLabel={secondsLabel}
          targetDateStr={targetDateStr}
          compact
        />
      </div>

      {/* ── Divider ── */}
      <hr className="border-neutral-50 dark:border-neutral-700" aria-hidden="true" />

      {/* ── Price row ── */}
      <div className="flex items-center justify-between">
        {/* Price amount + riyal symbol (RTL-safe: always rendered dir=rtl) */}

        {/* Label */}
        <p className="text-xs tracking-wide text-muted-foreground sm:text-sm">
          {currentPriceLabel}
        </p>
        <div className="flex items-center gap-1 sm:gap-2" dir="rtl">
          <span className="text-sm font-semibold text-foreground sm:text-2xl">{price}</span>
          <span className="relative inline-block h-3.5 w-3 shrink-0 sm:h-7 sm:w-6">
            <Riyall className="size-3.5 sm:size-6" />
          </span>
        </div>
      </div>

      {/* ── Bid Now button ── */}
      <ProtectedLink
        intent="bid_now"
        aria-label={bidNowLabel}
        href={href}
        className="flex h-[50px] w-full items-center justify-center rounded-2xl bg-primary text-sm font-bold tracking-wide text-white transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none md:text-h5"
      >
        {bidNowLabel}
      </ProtectedLink>
    </article>
  );
}

import Image from "next/image";

import { AuctionCountdownTimer } from "../components/auction-countdown-timer";
import Icon from "@/components/shared/icon-base";
import { EyeIcon, Riyall } from "@/components/shared/icon-base/constant";

interface AuctionCardItem {
  id: string;
  title: string;
  price: number;
  remainingSeconds: number;
  timerLabel?: string;
  imageSrc: string;
  imageAlt: string;
  viewHref?: string;
  viewLabel?: string;
}

interface AuctionCardProps {
  item: AuctionCardItem;
}

/**
 * AuctionCard
 *
 * Server Component — single auction listing card.
 *
 * Mobile (RTL flex-row):  [image (start/right)] [text middle] [eye btn (end/left)]
 * Desktop (flex-col):     [image full-width on top] [centered text below]
 *
 * In RTL, flex-row renders children right→left, so HTML order must be:
 * image → text → eye-button  to achieve the correct visual order.
 */
export function AuctionCard({ item }: AuctionCardProps) {
  return (
    <article className="card relative flex flex-row items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 md:flex-col md:items-center md:gap-0 md:py-3">
      {/* ── Image (RIGHT on mobile / TOP on desktop) ── */}
      {/* In RTL flex-row, this is the first child → appears on the right */}
      <div className="relative flex-none overflow-hidden rounded-sm md:order-1 md:mt-5 md:rounded-none md:rounded-t-2xl">
        {/* Desktop: eye button overlaid on top-start corner */}
        <a
          href={item.viewHref ?? "#"}
          aria-label={item.viewLabel ?? "عرض سريع"}
          className="absolute end-2 top-2 z-10 hidden items-center justify-center rounded-xs border bg-white/95 p-2 text-primary-400 shadow-sm transition-colors hover:bg-primary-100 md:flex md:h-[40px] md:w-[43px] dark:border-neutral-700 dark:bg-primary-700 dark:text-primary-200 dark:hover:bg-primary-800"
        >
          <Icon icon={EyeIcon} />
        </a>

        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          width={320}
          height={175}
          className="h-[85px] w-[85px] rounded-sm object-cover md:h-[175px] md:w-[282px]"
        />
      </div>

      {/* ── Text content (MIDDLE on mobile / BOTTOM centered on desktop) ── */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 md:order-2 md:items-center md:gap-2 md:px-4 md:pt-3 md:pb-4">
        {/* Title — right-aligned mobile, centered desktop */}
        <p className="w-full truncate text-sm font-semibold text-neutral-950 md:text-center md:text-base md:text-h4 dark:text-neutral-50">
          {item.title}
        </p>

        {/* Price */}
        <p className="flex items-center gap-1.5 text-body font-bold text-neutral-800 md:text-xl dark:text-neutral-100">
          {/* Saudi Riyal symbol ﷼ */}

          <span>{item.price.toLocaleString("ar-SA")}</span>
          <span className="font-normal" aria-hidden="true">
            <Icon icon={Riyall} className="h-[16px] w-[14px] md:h-[24px] md:w-[21px]" />
          </span>
        </p>

        {/* Countdown timer */}
        <AuctionCountdownTimer initialSeconds={item.remainingSeconds} ariaLabel={item.timerLabel} />
      </div>

      {/* ── Eye button (LEFT on mobile only / last child = end in RTL) ── */}
      {/* In RTL flex-row, last child appears on the LEFT */}
      <a
        href={item.viewHref ?? "#"}
        aria-label={item.viewLabel ?? "عرض سريع"}
        className="mt-9 flex flex-none items-end justify-center rounded-xs border bg-white/95 p-2 text-center text-primary-400 shadow-sm transition-colors hover:bg-primary-100 md:hidden dark:border-neutral-700 dark:bg-primary-700 dark:text-primary-200 dark:hover:bg-primary-800"
      >
        <EyeIcon />
      </a>
    </article>
  );
}

export type { AuctionCardItem };

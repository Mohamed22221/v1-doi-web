import * as React from "react";
import Image from "next/image";

export interface AuctionCardProps {
  id: string;
  title: string;
  timeLabel: string;
  imageUrl: string;
  orderNumber: string; // e.g. "01", "02", "03"
}

/**
 * AuctionCard — Server Component
 *
 * Figma nodes 1105:8138 / 1105:8150 / 1105:8162
 * - bg-[#0f172a], rounded-[28px], overflow-hidden
 * - Number badge: top-[16px] start-[16px], size-[40px], bg-white/20, rounded-full
 *   text: Montserrat Medium 16px, color #edf1f7
 * - Bottom overlay:  bg-white/12, rounded-[16px], p-4, gap-2, items-start
 *   - Title: Arabic Bold 18px, white
 *   - Time row: dot (8px, bg-[#728fc0] rounded-[4px]) + time text (12px, rgba(255,255,255,0.94))
 * - Gradient overlay: bg-gradient-to-b from-[#0f172a]/10 via-[#0f172a]/26 to-[#0f172a]/92
 */
export function AuctionCard({ title, timeLabel, imageUrl, orderNumber }: AuctionCardProps) {
  return (
    <div className="relative flex h-[160px] w-[110px] shrink-0 flex-col overflow-hidden rounded-md md:h-[320px] md:w-[274px] md:rounded-[28px] lg:h-[422px] lg:w-[274px]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain object-center"
          sizes="274px"
        />
      </div>

      {/* Gradient overlay — Figma: from top 10% → mid 26% → bottom 92% */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-[rgba(15,23,42,0.1)] via-[rgba(15,23,42,0.26)] [--tw-gradient-via-position:44%] to-[rgba(15,23,42,0.92)]" />

      {/* Number badge — top-start (RTL: top-right; LTR: top-left) */}
      <div className="absolute end-3 top-3 z-20 flex size-3 items-center justify-center rounded-full bg-white/20 md:end-4 md:top-4 md:size-10">
        <span className="font-[Montserrat,sans-serif] text-tag font-medium text-primary-50 md:text-base">
          {orderNumber}
        </span>
      </div>

      {/* Bottom content overlay */}
      <div className="absolute bottom-0 z-20 flex flex-col items-start gap-2 rounded-2xl bg-white/12 py-2 ps-2 pe-1 md:inset-x-3.5 md:bottom-3.5 md:p-4">
        {/* Title */}
        <h3 className="line-clamp-1 w-full text-start text-tag leading-snug font-bold tracking-wide text-white md:text-h5">
          {title}
        </h3>
        {/* Time row: dot + time text, right-aligned */}
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-[4px] bg-primary-400 rtl:mb-1" aria-hidden="true" />

          <span className="text-xs font-medium text-white/94">{timeLabel}</span>
        </div>
      </div>
    </div>
  );
}

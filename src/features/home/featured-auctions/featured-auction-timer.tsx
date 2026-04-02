"use client";

import { useEffect, useState } from "react";
import { cn } from "@utils/cn";

interface FeaturedAuctionTimerProps {
  minutesLabel: string;
  secondsLabel: string;
  targetDateStr?: string;
  /** Compact style for mobile cards */
  compact?: boolean;
}

/**
 * FeaturedAuctionTimer — Client Component
 *
 * Figma node 1325:24781 (mobile) / 723:10371 (desktop)
 * - Timer blocks: bg-tertiary-500, text-tertiary-400
 * - Colon separator: text-secondary-500
 * - Labels below: text-secondary-400
 */
export function FeaturedAuctionTimer({
  minutesLabel,
  secondsLabel,
  targetDateStr,
  compact = false,
}: FeaturedAuctionTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 2, seconds: 59 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let totalSeconds = targetDateStr
      ? Math.max(0, Math.floor((new Date(targetDateStr).getTime() - Date.now()) / 1000))
      : 2 * 60 + 59;

    // Use setTimeout to avoid synchronous setState in effect body lint error
    const mountTimeout = setTimeout(() => {
      setMounted(true);
      setTimeLeft({
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60,
      });
    }, 0);

    const intervalId = setInterval(() => {
      totalSeconds -= 1;
      if (totalSeconds < 0) {
        clearInterval(intervalId);
        return;
      }
      setTimeLeft({
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60,
      });
    }, 1000);

    return () => {
      clearTimeout(mountTimeout);
      clearInterval(intervalId);
    };
  }, [targetDateStr]);

  const m = mounted ? String(timeLeft.minutes).padStart(2, "0") : "00";
  const s = mounted ? String(timeLeft.seconds).padStart(2, "0") : "00";

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Countdown boxes */}
      <div className="flex items-center justify-center gap-2" dir="ltr">
        <div
          className={cn(
            "flex items-center justify-center rounded-xs bg-tertiary-500 dark:bg-tertiary-400",
            compact ? "h-[36px] w-[32px]" : "h-[50px] w-[40px]",
          )}
        >
          <span
            className={cn(
              "font-[Montserrat,sans-serif] font-medium text-tertiary-400 dark:text-tertiary-500",
              compact ? "text-base" : "text-lg",
            )}
          >
            {s}
          </span>
        </div>
        {/* Colon */}
        <span className={cn("font-semibold text-secondary-500", compact ? "text-base" : "text-lg")}>
          :
        </span>

        <div
          className={cn(
            "flex items-center justify-center rounded-xs bg-tertiary-500 dark:bg-tertiary-400",
            compact ? "h-[36px] w-[32px]" : "h-[50px] w-[40px]",
          )}
        >
          <span
            className={cn(
              "font-[Montserrat,sans-serif] font-medium text-tertiary-400 dark:text-tertiary-500",
              compact ? "text-base" : "text-lg",
            )}
          >
            {m}
          </span>
        </div>
      </div>

      {/* Labels row */}
      <div
        className={cn(
          "flex items-center justify-between text-center text-secondary-400",
          compact ? "w-[75px] text-xs" : "w-[100px] text-sm",
        )}
      >
        <span>{minutesLabel}</span>
        <span>{secondsLabel}</span>
      </div>
    </div>
  );
}

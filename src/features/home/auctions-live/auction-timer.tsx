"use client";

import * as React from "react";
import { useEffect, useState } from "react";

interface AuctionTimerProps {
  targetDateStr?: string;
  minutesLabel: string;
  secondsLabel: string;
}

/**
 * AuctionTimer — Client Component
 *
 * Figma node 1105:8185 — Countdown widget, 178px wide.
 * Left cell (75px): seconds number + label  → in RTL this is displayed on the LEFT visually
 * Right cell (75px): minutes number + label → in RTL this is displayed on the RIGHT visually
 * Colon separator centered at 89px from left.
 *
 * Numbers: Montserrat Bold 40px, color #2a3d5d  (--primary/500)
 * Labels:  Arabic Thin 16px, color #728fc0      (--primary/400)
 */
export function AuctionTimer({ targetDateStr, minutesLabel, secondsLabel }: AuctionTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    // For mockup: if no target is provided, just set a dummy 2 min 29 sec
    let totalSeconds = targetDateStr
      ? Math.max(0, Math.floor((new Date(targetDateStr).getTime() - Date.now()) / 1000))
      : 2 * 60 + 29;

    const mountTimer = setTimeout(() => {
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
      clearTimeout(mountTimer);
      clearInterval(intervalId);
    };
  }, [targetDateStr]);

  const m = mounted ? String(timeLeft.minutes).padStart(2, "0") : "00";
  const s = mounted ? String(timeLeft.seconds).padStart(2, "0") : "00";

  // Figma layout: 2 cells side-by-side with a centered colon.
  // In Figma (RTL): 29 ثانية is the LEFT cell | 02 دقيقة is the RIGHT cell.
  // Since Figma shows seconds on left and minutes on right (in RTL reading):
  // We render [seconds | : | minutes] in physical DOM order.
  // The parent is dir auto → RTL will show minutes first (right) then seconds (left).
  // To guarantee exact figma positioning regardless of direction, we use dir="ltr" on the timer itself
  // so that the physical DOM order (seconds | colon | minutes) maps to figma's visual order.
  return (
    <div className="flex items-end gap-0 text-center" dir="ltr">
      {/* Seconds cell — Figma: left cell */}
      <div className="flex w-[75px] flex-col items-center gap-3 rounded-xl px-2.5 py-2">
        <span className="font-[Montserrat,sans-serif] text-h1 leading-none font-bold text-primary-500 dark:text-primary-200">
          {s}
        </span>
        <span className="text-base text-primary-400 dark:text-primary-300">{secondsLabel}</span>
      </div>

      {/* Colon separator */}
      <span className="mb-9 text-2xl font-semibold text-primary-500 dark:text-primary-200">:</span>

      {/* Minutes cell — Figma: right cell */}
      <div className="flex w-[75px] flex-col items-center gap-3 rounded-xl px-2.5 py-2">
        <span className="font-[Montserrat,sans-serif] text-h1 leading-none font-bold text-primary-500 dark:text-primary-200">
          {m}
        </span>
        <span className="text-base text-primary-400 dark:text-primary-300">{minutesLabel}</span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface AuctionCountdownTimerProps {
  /** Total seconds remaining */
  initialSeconds: number;
  /** Accessible label for the countdown (e.g. "الوقت المتبقي") */
  ariaLabel?: string;
}

function padTwo(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * AuctionCountdownTimer
 *
 * Client Component — must tick in real-time, so it cannot be a Server Component.
 * Renders a row of time-unit boxes separated by colons, matching the design.
 */
export function AuctionCountdownTimer({
  initialSeconds,
  ariaLabel = "الوقت المتبقي",
}: AuctionCountdownTimerProps) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (initialSeconds <= 0) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const showDays = days > 0;

  const units = showDays
    ? [padTwo(days), padTwo(hours), padTwo(minutes)]
    : [padTwo(hours), padTwo(minutes), padTwo(seconds)];

  return (
    <div className="flex items-center gap-1" role="timer" aria-live="off" aria-label={ariaLabel}>
      {units.map((unit, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <span className="dark:bg-tertiary-900 rounded-xs bg-tertiary-500 px-2 py-1 text-xs font-semibold text-tertiary-400 tabular-nums md:px-3 md:py-3 md:text-h4 dark:bg-tertiary-800 dark:text-tertiary-100">
            {unit}
          </span>
          {idx < units.length - 1 && (
            <span
              className="text-xs font-bold text-tertiary-400 md:text-sm dark:text-[#F0A07A]"
              aria-hidden="true"
            >
              :
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

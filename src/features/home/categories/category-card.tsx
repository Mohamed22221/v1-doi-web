"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { HoverLottieRef } from "@/components/shared/hover-lottie";

// Dynamically import the player with SSR disabled for optimal loading
// Requirements: ssr: false, uses next/dynamic
const HoverLottie = dynamic(() => import("@/components/shared/hover-lottie"), {
  ssr: false,
  loading: () => <Skeleton className="size-full rounded-full" />,
});

interface CategoryCardProps {
  id: string;
  label: string;
  href: string;
  animationPath: string;
}

/**
 * CategoryCard
 *
 * Client-side component that handles hover-triggered Lottie animations.
 * USES:
 * 1. next/dynamic for the ~300KB Lottie player.
 * 2. useRef to play/stop animation imperatively (performance optimization).
 */
export function CategoryCard({ id, label, href, animationPath }: CategoryCardProps) {
  const lottieRef = useRef<HoverLottieRef>(null);
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  // Requirement: Fetch JSON to avoid main bundle bloat
  useEffect(() => {
    let isMounted = true;
    fetch(animationPath)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Expected JSON, got ${contentType}`);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) setAnimationData(data);
      })
      .catch((err) => console.error(`[Lottie] Failed to load animation for ${id}:`, err));

    return () => {
      isMounted = false;
    };
  }, [animationPath, id]);

  const handleMouseEnter = () => {
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };

  return (
    <Link
      href={href}
      className="group flex w-[75px] flex-col items-center gap-2 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 md:w-[160px] md:gap-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The circular image container (88px mobile / 160px desktop) */}
      <div className="flex size-[75px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100 md:size-[160px] dark:bg-card dark:group-hover:bg-card/70">
        <div className="relative flex size-[60px] shrink-0 items-center justify-center md:size-[110px]">
          {animationData ? (
            <HoverLottie
              ref={lottieRef}
              animationData={animationData}
              className="size-full transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <Skeleton className="size-full rounded-full" />
          )}
        </div>
      </div>
      {/* Category text (20px) */}
      <span className="line-clamp-2 text-center text-[11px] font-medium tracking-wide text-foreground md:text-xl ltr:md:text-base">
        {label}
      </span>
    </Link>
  );
}

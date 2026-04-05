"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import Lottie from "lottie-react";

export interface HoverLottieRef {
  play: () => void;
  stop: () => void;
}

interface HoverLottieProps {
  animationData: Record<string, unknown>;
  className?: string;
  loop?: boolean;
}

/**
 * HoverLottie - A reusable Lottie component that can be controlled imperatively.
 *
 * @param animationData - The Lottie JSON animation data.
 * @param className - Optional CSS classes for the container.
 * @param loop - Whether the animation should loop (defaults to true).
 * @param ref - Ref to expose play() and stop() methods.
 */
const HoverLottie = forwardRef<HoverLottieRef, HoverLottieProps>(
  ({ animationData, className, loop = true }, ref) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    // Expose play/stop methods to parent without triggering re-renders
    useImperativeHandle(ref, () => ({
      play: () => lottieRef.current?.play(),
      stop: () => lottieRef.current?.stop(),
    }));

    return (
      <div className={className}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={loop}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
);

HoverLottie.displayName = "HoverLottie";

export default HoverLottie;

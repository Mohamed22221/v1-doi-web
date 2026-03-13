import { createElement } from "react";
import { toast, type ExternalToast } from "sonner";

import {
  CustomToast,
  type CustomToastAction,
  type ToastType,
} from "@/components/ui/toast/custom-toast";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ToastInset {
  top?: string; // e.g. "md:top-4"
  right?: string; // e.g. "ltr:md:right-[20px]"
  bottom?: string; // e.g. "bottom-2"
  left?: string; // e.g. "rtl:md:left-[20px]"
}

export interface ShowToastOptions extends ExternalToast {
  title: string;
  description?: string;
  type?: ToastType;
  action?: CustomToastAction;
  /**
   * Additional Tailwind classes applied to the toast card.
   * Supports all modifiers: `md:`, `ltr:`, `rtl:`, etc.
   * @example "w-[500px] md:w-[400px]"
   */
  className?: string;
  /**
   * Tailwind classes applied to the toast card for fine-grained positioning.
   * Supports responsive and direction modifiers: `md:`, `ltr:`, `rtl:`.
   * @example { right: "ltr:md:right-[20px]", left: "rtl:md:left-[20px]" }
   */
  inset?: ToastInset;
  /**
   * Override position for mobile screens (< 768px).
   * Falls back to `position` if not specified.
   * @example "bottom-center"
   */
  positionSm?: ExternalToast["position"];
}

// ─── Utility ─────────────────────────────────────────────────────────────────

export function showToast({
  title,
  description,
  type = "success",
  action,
  className,
  inset,
  positionSm,
  position,
  ...rest
}: ShowToastOptions): string | number {
  const insetClassName = inset
    ? [inset.top, inset.right, inset.bottom, inset.left].filter(Boolean).join(" ")
    : undefined;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;
  const resolvedPosition = isMobile && positionSm ? positionSm : position;

  return toast.custom(
    (id) =>
      createElement(CustomToast, {
        id,
        title,
        description,
        type,
        action,
        className,
        insetClassName,
      }),
    {
      duration: type === "loading" ? Infinity : 4000,
      position: resolvedPosition,
      ...rest,
    },
  );
}

// ─── Convenience helpers ──────────────────────────────────────────────────────

export const showSuccessToast = (
  title: string,
  options?: Omit<ShowToastOptions, "title" | "type">,
) => showToast({ title, type: "success", ...options });

export const showErrorToast = (title: string, options?: Omit<ShowToastOptions, "title" | "type">) =>
  showToast({ title, type: "error", ...options });

export const showInfoToast = (title: string, options?: Omit<ShowToastOptions, "title" | "type">) =>
  showToast({ title, type: "info", ...options });

export const showWarningToast = (
  title: string,
  options?: Omit<ShowToastOptions, "title" | "type">,
) => showToast({ title, type: "warning", ...options });

export const showLoadingToast = (
  title: string,
  options?: Omit<ShowToastOptions, "title" | "type">,
) => showToast({ title, type: "loading", ...options });

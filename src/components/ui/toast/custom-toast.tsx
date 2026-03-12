"use client";

import { BanIcon, InfoIcon, Loader2Icon, TriangleAlertIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@lib/utils/cn";
import Icon from "@/components/shared/icon-base";
import { SuccessAlert } from "@/components/shared/icon-base/constant";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "warning" | "loading";

export interface CustomToastAction {
  label: string;
  onClick: () => void;
}

export interface CustomToastProps {
  id: string | number;
  title: string;
  description?: string;
  type?: ToastType;
  action?: CustomToastAction;
  /** Tailwind classes for per-toast positioning, supports responsive modifiers */
  insetClassName?: string;
  /** Additional Tailwind classes for the toast card (width, shadow, etc.) */
  className?: string;
}

// ─── Config Map ──────────────────────────────────────────────────────────────

const toastConfig = {
  success: {
    icon: (props: { className?: string }) => <Icon icon={SuccessAlert} {...props} />,
    containerClass: "bg-success-100 dark:bg-success-300",
    iconClass: "text-success-400 bg-success-100",
    titleClass: "md:text-neutral-950",
    descriptionClass: "text-neutral-800 dark:text-neutral-200",
  },
  error: {
    icon: BanIcon,
    containerClass: "bg-danger-100 dark:bg-danger-200",
    iconClass: "text-danger-500 bg-danger-100 dark:bg-danger-200",
    titleClass: "text-danger-500  md:text-neutral-950",
    descriptionClass: "text-neutral-600",
  },
  info: {
    icon: InfoIcon,
    containerClass: "bg-primary-50 border-primary-200",
    iconClass: "text-primary-500 bg-primary-100",
    titleClass: "text-primary-500",
    descriptionClass: "text-primary-400",
  },
  warning: {
    icon: TriangleAlertIcon,
    containerClass: "bg-warning-100 border-warning-200",
    iconClass: "text-warning-500 bg-warning-200",
    titleClass: "text-neutral-800",
    descriptionClass: "text-neutral-600",
  },
  loading: {
    icon: Loader2Icon,
    containerClass: "bg-popover border-border",
    iconClass: "text-primary-500 bg-primary-50",
    titleClass: "text-foreground",
    descriptionClass: "text-muted-foreground",
  },
} satisfies Record<
  ToastType,
  {
    icon: React.ComponentType<{ className?: string }>;
    containerClass: string;
    iconClass: string;
    titleClass: string;
    descriptionClass: string;
  }
>;

// ─── Component ───────────────────────────────────────────────────────────────

export function CustomToast({
  id,
  title,
  description,
  type = "info",
  action,
  insetClassName,
  className,
}: CustomToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <article
      className={cn(
        "relative flex w-full items-center gap-2 rounded-md border p-3 font-sans shadow-lg",
        config.containerClass,
        insetClassName,
        className,
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full",
          config.iconClass,
        )}
        aria-hidden="true"
      >
        <Icon
          className={cn("size-6 md:size-7", type === "loading" && "animate-spin")}
          focusable={false}
          aria-hidden="true"
        />
      </span>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-0.5">
        <p className={cn("font-medium max-md:text-sm md:text-h5", config.titleClass)}>{title}</p>
        {description && (
          <p className={cn("text-xs leading-relaxed", config.descriptionClass)}>{description}</p>
        )}
        {action && (
          <button
            type="button"
            className={cn(
              "mt-1.5 self-start text-xs font-medium underline-offset-2 hover:underline",
              config.titleClass,
            )}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        aria-label="Dismiss toast"
        className={cn(
          "shrink-0 cursor-pointer rounded-full p-1 text-neutral-400 opacity-60 transition-opacity hover:opacity-100",
          config.titleClass,
        )}
        onClick={() => toast.dismiss(id)}
      >
        <XIcon className="size-[20px]" focusable={false} aria-hidden="true" />
      </button>
    </article>
  );
}

import Link from "next/link";
import { X } from "lucide-react";

// Components
import { buttonVariants } from "@/components/ui/button";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";
import { cn } from "@/lib/utils/cn";
import { cacheLife } from "next/cache";

interface AuthCloseButtonProps {
  href: string;
  ariaLabel: string;
  className?: string;
  rounded?: "full" | "md";
  variant?: "arrow" | "close";
}

/**
 * AuthCloseButton
 *
 * A reusable close button used in centered card layouts for authentication/authorization flows.
 * Positions itself absolutely at the top-start of its relative parent.
 *
 * @param variant - "arrow" (default) or "close" (X icon)
 */
export async function AuthCloseButton({
  href,
  ariaLabel,
  className,
  rounded = "md",
  variant = "arrow",
}: AuthCloseButtonProps) {
  "use cache";
  cacheLife("days");
  return (
    <div
      className={`absolute ${variant === "arrow" ? "start-4 md:start-6" : "end-4 md:end-6"} top-4 z-10 md:top-6`}
    >
      <Link
        href={href}
        aria-label={ariaLabel}
        className={buttonVariants({
          variant: "ghost",
          size: "icon-sm",
          className: cn(
            "h-[40px] w-[40px] border border-primary-50 dark:border-primary-400",
            rounded === "full" ? "rounded-full" : "rounded-md",
            className,
          ),
        })}
      >
        {variant === "arrow" ? (
          <Icon
            icon={ArrowIcon}
            className="h-4 w-4 text-neutral-300 ltr:rotate-180 dark:text-neutral-50"
          />
        ) : (
          <X className="h-4 w-4 text-neutral-300 dark:text-neutral-50" />
        )}
        <span className="sr-only">{ariaLabel}</span>
      </Link>
    </div>
  );
}

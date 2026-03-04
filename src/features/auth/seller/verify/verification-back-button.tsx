import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";
import { cn } from "@lib/utils/cn";

interface VerificationBackButtonProps {
  label: string;
  locale: string;
}

/**
 * VerificationBackButton
 *
 * A Server Component that renders a back link.
 * Uses Link for better caching compatibility with 'use cache'.
 */
export async function VerificationBackButton({ label, locale }: VerificationBackButtonProps) {
  "use cache";
  return (
    <Link
      href={`/${locale}/seller/start`}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon", rounded: "sm" }),
        "flex items-center justify-center",
      )}
      aria-label={label}
    >
      <Icon icon={ArrowIcon} className="text-neutral-300 ltr:rotate-180 dark:text-neutral-50" />
    </Link>
  );
}

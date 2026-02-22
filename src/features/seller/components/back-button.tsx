"use client";

import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import Icon from "@components/shared/icon-base";
import { ArrowIcon } from "@components/shared/icon-base/constant";
import { cn } from "@/lib/utils/cn";

interface BackButtonProps {
  className?: string;
}

/**
 * BackButton
 *
 * A reusable client component that provides a "Back" button
 * Styled to match the authentication layout headers.
 */
export function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      rounded="md"
      size="icon"
      onClick={() => router.back()}
      className={cn("hover:bg-white/20", className)}
    >
      <Icon icon={ArrowIcon} className="text-white ltr:rotate-180" />
    </Button>
  );
}

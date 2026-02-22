import type { LucideIcon } from "lucide-react";
import { User, Package, Zap } from "lucide-react";
import { cn } from "@lib/utils/cn";
import { Card } from "@/components/ui/card";

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  isLast: boolean;
  variant: "vertical" | "horizontal";
}

const ICONS: Record<number, LucideIcon> = {
  1: User,
  2: Package,
  3: Zap,
};

/**
 * StepItem component
 * Supports two layouts:
 * - vertical: used on mobile (Number & Icon & Line on right - RTL)
 * - horizontal: used on desktop (Card based, Number/Icon on top)
 */
export function StepItem({ number, title, description, isLast, variant }: StepItemProps) {
  const Icon = ICONS[number] || User;

  if (variant === "horizontal") {
    return (
      <Card className="group relative flex min-h-[300px] max-w-[300px] flex-1 flex-col items-center rounded-xl border-2 border-primary-100 bg-card transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-200/40 dark:border-primary-800 dark:hover:border-primary-600 dark:hover:shadow-primary-900/50">
        {/* Number Badge - Overlapping top border */}
        <div className="absolute top-[-28px] z-20">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-secondary-500 text-h3 font-semibold text-primary-500 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
            {number}
          </div>
        </div>
        {/* Card Content */}
        <div className="flex w-full flex-1 flex-col items-center rounded-xl p-4 py-7 text-center">
          {/* Icon Container */}
          <div className="mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-primary-50 text-primary-500 transition-colors duration-300 group-hover:bg-primary-100 dark:bg-primary-700 dark:group-hover:bg-primary-700">
            <Icon
              size={32}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:scale-110 dark:text-primary-100"
            />
          </div>
          <h3 className="mb-3 text-h3 font-bold text-primary-500 dark:text-primary-100">{title}</h3>
          <p className="min-w-[250px] text-body leading-relaxed text-neutral-600 md:text-h5 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </Card>
    );
  }

  // Vertical Layout (Mobile)
  return (
    <div className="group relative -mx-2 flex gap-4 rounded-xl px-2 transition-colors duration-200 hover:bg-primary-50/30 active:bg-primary-50/40 md:gap-6 dark:hover:bg-primary-900/10 dark:active:bg-primary-900/20">
      {/* Right side: Number and Dashed Line */}
      <div className="flex w-12 flex-shrink-0 flex-col items-center md:w-14">
        <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-500 text-h4 font-semibold text-primary-500 transition-shadow duration-200 group-hover:shadow-md group-active:shadow-lg md:h-14 md:w-14">
          {number}
        </div>
        {!isLast && (
          <div className="mt-2 w-[1px] flex-1 border-l border-dashed border-primary-200 dark:border-primary-800/50" />
        )}
      </div>

      {/* Middle: Icon */}
      <div className="flex flex-shrink-0 flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-500 transition-colors duration-200 group-hover:bg-primary-100 group-active:bg-primary-200/60 md:h-14 md:w-14 dark:bg-primary-700 dark:group-hover:bg-primary-700 dark:group-active:bg-primary-600">
          <Icon
            size={24}
            strokeWidth={1.5}
            className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95 dark:text-primary-100"
          />
        </div>
      </div>

      {/* Left side: Text */}
      <div className={cn("flex-1 pt-1 text-start", !isLast && "pb-8")}>
        <h3 className="mb-1 text-body font-bold text-primary-500 transition-colors duration-200 group-hover:text-primary-600 dark:text-primary-100 dark:group-hover:text-white">
          {title}
        </h3>
        <p className="text-tag leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}

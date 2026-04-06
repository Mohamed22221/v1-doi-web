import * as React from "react";
import { HistoryIcon } from "lucide-react";

/**
 * RecentSearches — Dynamic Component (can be Server or Client).
 * For this exercise, it simulates a user-specific fetch.
 */
export async function RecentSearches({
  label,
  items: initialItems,
}: {
  label: string;
  items?: string[];
}) {
  // Simulate delay for PPR/Suspense demonstration
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data if not provided
  const items = initialItems || ["آيفون", "سماعات", "ساعة أبل"];

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <h3 className="text-xs font-light text-primary-400 sm:text-sm ltr:text-start rtl:text-start">
        {label}
      </h3>
      <div className="flex flex-col gap-3 md:gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-start text-sm font-medium text-foreground transition-colors hover:text-primary-500"
          >
            <HistoryIcon
              className="size-4 shrink-0 text-primary-400 md:size-5"
              aria-hidden="true"
              focusable="false"
            />
            <span className="flex-1 cursor-pointer text-xs font-thin tracking-wide text-primary-700 sm:text-sm dark:text-primary-100">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

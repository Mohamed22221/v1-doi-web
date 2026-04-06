import * as React from "react";
import { Suspense } from "react";
import { SearchNavIcon as SearchIcon } from "@components/shared/icon-base/constant";
import { RecentSearches } from "./recent-searches";
import { RecentSearchesSkeleton } from "./recent-searches-skeleton";

interface SearchDropdownProps {
  recentLabel: string;
  suggestionsLabel: string;
}

/**
 * SearchDropdown — Server Component.
 * Implements the multi-column layout for the search popover.
 * PPR Strategy:
 * - Suggestions (Global/Static) are pre-rendered.
 * - Recent Searches (User-Specific) are dynamic and wrapped in <Suspense>.
 */
export function SearchDropdown({ recentLabel, suggestionsLabel }: SearchDropdownProps) {
  // Static Mock Suggestions
  const suggestionsCol1 = ["لابتوب ماك بوك", "آيفون 14 برو", "سماعات AirPods"];
  const suggestionsCol2 = ["آيفون 15", "آيفون 14 برو", "سماعات AirPods"];

  return (
    <div className="grid w-full grid-cols-2 items-start justify-start gap-x-6 lg:grid-cols-3">
      {/* Column 1: Recent Searches (Dynamic Hole) */}
      <div className="flex flex-col gap-3 md:gap-4">
        <Suspense fallback={<RecentSearchesSkeleton />}>
          <RecentSearches label={recentLabel} />
        </Suspense>
      </div>

      {/* Column 2: Suggestions (Visible on all screens) */}
      <div className="flex flex-col gap-3 md:gap-4">
        <h3 className="text-xs font-light text-primary-400 sm:text-sm ltr:text-start rtl:text-start">
          {suggestionsLabel}
        </h3>
        <SuggestionsList items={suggestionsCol1} label={suggestionsLabel} showLabel={false} />
      </div>

      {/* Column 3: Suggestions (Visible on Desktop only) - Following Figma mobile 2-col vs Desktop 3-col */}
      <div className="hidden flex-col gap-3 md:gap-4 lg:flex">
        <h3 className="text-xs font-light text-primary-400 sm:text-sm ltr:text-start rtl:text-start">
          {suggestionsLabel}
        </h3>
        <SuggestionsList items={suggestionsCol2} label={suggestionsLabel} showLabel={false} />
      </div>
    </div>
  );
}

function SuggestionsList({
  items,
  label,
  showLabel,
}: {
  items: string[];
  label: string;
  showLabel: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {showLabel && (
        <h3 className="text-start text-xs font-light text-muted-foreground sm:text-sm">{label}</h3>
      )}
      <div className="flex flex-col gap-3 md:gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-start text-sm font-medium text-foreground transition-colors hover:text-primary-500"
          >
            <SearchIcon
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

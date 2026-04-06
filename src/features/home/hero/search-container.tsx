"use client";

import * as React from "react";
import { Button } from "@components/ui/button";
import { SearchNavIcon, LocationIcon } from "@components/shared/icon-base/constant";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "@components/ui/popover";

interface SearchContainerProps {
  searchPlaceholder: string;
  locationLabel: string;
  searchLabel: string;
  dropdownContent: React.ReactNode;
}

/**
 * SearchContainer — "use client" micro-component.
 * Handles the interactive search bar and location selector in the Hero Section.
 * All visual layout uses Tailwind logical properties (ps-, pe-, ms-, me-)
 * for RTL/LTR support.
 */
export function SearchContainer({
  searchPlaceholder,
  locationLabel,
  searchLabel,
  dropdownContent,
}: SearchContainerProps) {
  const [query, setQuery] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative w-full max-w-[1000px]">
      <Popover open={isFocused && query.length >= 2}>
        <PopoverAnchor asChild>
          <div
            className="flex w-full items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-sm sm:gap-4 sm:px-4"
            role="search"
            aria-label={searchLabel}
          >
            {/* Text input area */}
            <div className="flex min-w-0 flex-[1.5] items-center gap-1.5 text-start sm:flex-1 sm:gap-2">
              <label htmlFor="hero-search-input" className="sr-only">
                {searchPlaceholder}
              </label>
              <PopoverTrigger asChild>
                <input
                  id="hero-search-input"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-start text-[10px] text-neutral-500 outline-none placeholder:text-neutral-400 sm:text-base dark:text-neutral-50"
                  autoComplete="off"
                />
              </PopoverTrigger>
            </div>
            <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />

            {/* Location selector section */}
            <button
              type="button"
              className="flex flex-1 items-center justify-start gap-1 text-start text-primary hover:opacity-80 sm:gap-2"
              aria-label={locationLabel}
            >
              <LocationIcon
                className="size-4 shrink-0 text-primary-400 sm:size-7"
                aria-hidden="true"
                focusable="false"
              />
              <span className="text-[10px] font-bold tracking-wide sm:text-base">
                {locationLabel}
              </span>
            </button>

            {/* Vertical divider */}
            <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />
            <SearchNavIcon
              className="size-5 shrink-0 text-primary-500 sm:hidden"
              aria-hidden="true"
              focusable="false"
            />

            {/* Search Button (Hidden on mobile) */}
            <Button
              variant="default"
              rounded="md"
              size="default"
              type="submit"
              aria-label={searchLabel}
              className="hidden shrink-0 items-center gap-2 sm:flex sm:px-4 sm:py-5"
            >
              <SearchNavIcon className="size-6 shrink-0" aria-hidden="true" focusable="false" />
              <span className="hidden lg:inline">{searchLabel}</span>
            </Button>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-(--radix-popover-trigger-width) border-none bg-card p-4 shadow-xl focus:outline-none md:p-8"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {dropdownContent}
        </PopoverContent>
      </Popover>
    </div>
  );
}

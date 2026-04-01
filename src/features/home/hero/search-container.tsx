"use client";

import * as React from "react";
import { Button } from "@components/ui/button";
import { SearchNavIcon, LocationIcon } from "@components/shared/icon-base/constant";

interface SearchContainerProps {
  searchPlaceholder: string;
  locationLabel: string;
  searchLabel: string;
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
}: SearchContainerProps) {
  const [query, setQuery] = React.useState("");

  return (
    <div
      className="flex w-full max-w-[1000px] items-center gap-4 rounded-2xl border border-border bg-card px-4 py-1 shadow-sm"
      role="search"
      aria-label={searchLabel}
    >
      {/* Text input */}
      <div className="flex min-w-0 flex-1 items-center text-start">
        <label htmlFor="hero-search-input" className="sr-only">
          {searchPlaceholder}
        </label>
        <input
          id="hero-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent text-start text-base text-neutral-500 outline-none placeholder:text-neutral-400 dark:text-neutral-50"
          autoComplete="off"
        />
      </div>
      <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />

      {/* Location selector */}
      <button
        type="button"
        className="flex flex-1 items-center justify-start gap-2 text-start text-primary hover:opacity-80"
        aria-label={locationLabel}
      >
        <LocationIcon
          className="size-7 shrink-0 text-primary-400"
          aria-hidden="true"
          focusable="false"
        />
        <span className="text-base font-bold tracking-wide">{locationLabel}</span>
      </button>

      {/* Vertical divider */}
      <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />

      {/* Search Button */}
      <Button
        variant="default"
        rounded="md"
        size="default"
        type="submit"
        aria-label={searchLabel}
        className="flex shrink-0 items-center gap-2 px-4 py-5"
      >
        <SearchNavIcon className="size-6 shrink-0" aria-hidden="true" focusable="false" />
        <span className="hidden sm:inline">{searchLabel}</span>
      </Button>
    </div>
  );
}

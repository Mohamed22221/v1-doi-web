import { TrendingUpIcon } from "@components/shared/icon-base/hero-icons";

interface TrendingTag {
  label: string;
  href: string;
}

interface TrendingSearchesProps {
  tags: TrendingTag[];
  label: string;
}

/**
 * TrendingSearches — Server Component.
 * Renders the popular search tags row.
 * Uses logical properties (me-, ms-, ps-, pe-) for RTL/LTR support.
 */
export function TrendingSearches({ tags, label }: TrendingSearchesProps) {
  return (
    <div className="flex max-w-[1100px] flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 md:w-full ltr:gap-2">
      {/* "Most searched" label */}
      <p className="hidden shrink-0 text-sm font-normal tracking-wide text-primary-200 sm:block sm:text-lg">
        {label}
      </p>
      {/* Tags list */}
      <div
        className="grid grid-cols-2 flex-wrap items-center justify-center gap-2 sm:flex sm:w-auto sm:gap-[18px]"
        aria-label={label}
      >
        {tags.map((tag) => (
          <a
            key={tag.label}
            href={tag.href}
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-primary-50 px-2 py-1.5 text-sm text-primary-400 transition-colors hover:bg-primary-100 sm:gap-2 sm:px-6 sm:py-3 sm:text-base dark:bg-primary-600 dark:text-foreground dark:hover:bg-primary-500"
          >
            <TrendingUpIcon className="size-5.5 shrink-0 pb-1 text-primary-400 sm:size-8 dark:text-foreground" />
            <span className="font-thin tracking-wide">{tag.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

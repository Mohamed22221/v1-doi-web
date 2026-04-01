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
    <div className="flex w-full max-w-[1000px] items-center justify-center gap-8">
      {/* "Most searched" label */}
      <p className="shrink-0 text-lg font-normal tracking-wide text-primary-200">{label}</p>
      {/* Tags list */}
      <div className="flex flex-wrap items-center justify-center gap-[18px]" aria-label={label}>
        {tags.map((tag) => (
          <a
            key={tag.label}
            href={tag.href}
            className="flex items-center gap-2 rounded-2xl bg-primary-50 px-6 py-3 text-base text-primary-400 transition-colors hover:bg-primary-100 dark:bg-primary-600 dark:text-foreground dark:hover:bg-primary-500"
          >
            <TrendingUpIcon className="size-7 shrink-0 text-primary-400 dark:text-foreground" />
            <span className="font-thin tracking-wide">{tag.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

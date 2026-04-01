import { Suspense } from "react";
import { TrendingSearches } from "@/features/home/hero/trending-searches";
import { TagsSkeleton } from "@/features/home/hero/tags-skeleton";

interface TrendingSearchesWrapperProps {
  tags: Array<{ label: string; href: string }>;
  mostSearchedLabel: string;
}

/**
 * TrendingSearchesWrapper — Server Component.
 * Wraps <TrendingSearches> in a <Suspense> boundary per PPR rules.
 * The Suspense boundary lets the static Hero shell stream first while tags load.
 */
export function TrendingSearchesWrapper({ tags, mostSearchedLabel }: TrendingSearchesWrapperProps) {
  return (
    <Suspense fallback={<TagsSkeleton />}>
      <TrendingSearches tags={tags} label={mostSearchedLabel} />
    </Suspense>
  );
}

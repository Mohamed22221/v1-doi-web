import { use } from "react";
import Icon from "@/components/shared/icon-base";
import { ArrowIcon, LocationIcon } from "@/components/shared/icon-base/constant";

interface SellerGreetingData {
  greeting: string;
  location: string;
  changeLocationLabel: string;
}

interface SellerGreetingProps {
  dataPromise: Promise<SellerGreetingData>;
}

interface LocationButtonProps {
  location: string;
  ariaLabel: string;
}

/**
 * SellerGreeting
 *
 * A Server Component that displays a personalised greeting.
 * Accepts a dataPromise to support Partial Prerendering (PPR) without blocking the shell.
 */
export function SellerGreeting({ dataPromise }: SellerGreetingProps) {
  const { greeting, location, changeLocationLabel } = use(dataPromise);

  return (
    <header className="card gap-3 rounded-md p-4 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none">
      <h1 className="text-xl font-bold text-primary-900 md:text-h2 dark:text-primary-50">
        {greeting}
      </h1>
      <LocationButton location={location} ariaLabel={changeLocationLabel} />
    </header>
  );
}

/**
 * LocationButton
 *
 * A Client Component to handle the interactive part of the seller greeting.
 * Isolates the client-side interaction to keep the parent as a Server Component.
 */
function LocationButton({ location, ariaLabel }: LocationButtonProps) {
  "use client";

  return (
    <button
      type="button"
      className="md:text--400 flex items-center gap-1 text-sm text-neutral-800 md:text-h5 md:text-primary-10 dark:text-neutral-300 md:dark:text-primary-400"
      aria-label={ariaLabel}
    >
      <Icon icon={LocationIcon} className="h-4 w-4 shrink-0" />
      <span>{location}</span>
      <Icon icon={ArrowIcon} className="h-3 w-3 shrink-0 rtl:rotate-90" />
    </button>
  );
}

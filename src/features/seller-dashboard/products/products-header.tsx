import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { ROUTES } from "@components/routes";
import { cn } from "@utils/cn";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";

/**
 * ProductCountSkeleton
 * Fallback UI for the product count while it's loading.
 */
function ProductCountSkeleton() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      (<Skeleton className="h-1 w-6 animate-pulse rounded-md bg-neutral-100" />)
    </span>
  );
}

/**
 * ProductCount
 * A dynamic server component that fetches the product count.
 * This will be streamed via PPR.
 */
async function ProductCount() {
  // Simulate a database/API fetch delay to demonstrate PPR
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real application, this would fetch from an API
  const count = 0;

  return (
    <span className="text-body font-medium whitespace-nowrap text-neutral-800 md:text-h2 md:text-primary-800 dark:text-neutral-200 md:dark:text-primary-100">
      ({count})
    </span>
  );
}

/**
 * ProductsHeader
 * Header for the products page with static title and actions,
 * and a dynamic product count using PPR.
 */
export default async function ProductsHeader({ locale }: { locale: Locale }) {
  const { t } = await getTranslation(locale, "home");

  return (
    <header className="mt-1 flex w-full items-center justify-between">
      <h1 className="flex items-center gap-1.5 text-body font-bold text-neutral-800 md:text-h2 md:text-primary-800 dark:text-neutral-200 md:dark:text-primary-200">
        <span>{t("seller_dashboard.products_list.title")}</span>
        <Suspense fallback={<ProductCountSkeleton />}>
          <ProductCount />
        </Suspense>
      </h1>

      <Link
        href={ROUTES.DASHBOARD.SELLER.PRODUCTS + "/add"}
        aria-label={t("seller_dashboard.quick_actions.add")}
        className={cn(
          buttonVariants({ variant: "default", rounded: "sm" }),
          "hidden transition-all md:inline-flex md:h-10 md:w-auto md:px-5",
        )}
      >
        <span className="hidden text-sm font-semibold md:inline">
          {t("seller_dashboard.quick_actions.add")}
        </span>
      </Link>
      <Link
        href={ROUTES.DASHBOARD.SELLER.PRODUCTS + "/add"}
        aria-label={t("seller_dashboard.quick_actions.add")}
        className="block rounded-full border border-neutral-50 bg-transparent px-3 py-3 md:hidden"
      >
        <Plus className="size-5" aria-hidden="true" role="presentation" />
      </Link>
    </header>
  );
}

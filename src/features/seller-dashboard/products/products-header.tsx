import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@components/ui/button";
import { ROUTES } from "@/config/routes";
import { cn } from "@utils/cn";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import ProductCount from "./product-count";
import { Suspense } from "react";

/**
 * ProductsHeader
 * Header for the products page with static title and actions,
 * and a dynamic product count that updates in real-time.
 *
 * This is a Server Component. It must NOT export Client-only components
 * or be imported by Client Components to avoid i18n build errors.
 */
export default async function ProductsHeader({
  locale,
  searchParams,
}: {
  locale: Locale;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { t } = await getTranslation(locale, "home");

  return (
    <header className="mt-1 flex w-full items-center justify-between px-4 md:px-0">
      <h1 className="flex items-center gap-1.5 text-body font-bold text-neutral-800 md:text-h2 md:text-primary-800 dark:text-neutral-200 md:dark:text-primary-200">
        <span>{t("seller_dashboard.products_list.title")}</span>
        <Suspense>
          <ProductCount searchParams={searchParams} />
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
        className="block rounded-full border border-neutral-50 bg-transparent px-2 py-2 text-primary-400 md:hidden"
      >
        <Plus className="size-6" aria-hidden="true" role="presentation" />
      </Link>
    </header>
  );
}

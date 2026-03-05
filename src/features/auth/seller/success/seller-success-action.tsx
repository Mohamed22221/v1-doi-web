import { cacheLife } from "next/cache";
import Link from "next/link";

// i18n
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";

// Components
import { buttonVariants } from "@components/ui/button";

interface SellerSuccessActionProps {
  locale: Locale;
}

/**
 * SellerSuccessAction
 *
 * Provides action buttons for the seller success page:
 * 1. Add first product (Primary)
 * 2. Back to home (Secondary)
 *
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function SellerSuccessAction({ locale }: SellerSuccessActionProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  return (
    <section className="flex w-full flex-col-reverse items-center gap-3 md:mx-auto md:max-w-md md:flex-row-reverse md:justify-center md:gap-4">
      <Link
        href={`/${locale}/seller`}
        className={buttonVariants({
          variant: "secondary",
          size: "lg",
          className:
            "h-[50px] w-full text-label font-bold text-primary-500 md:flex-1 md:px-0 md:text-body tablet:h-[50px] xl:h-[56px] xl:text-h5",
        })}
      >
        {t("seller-success.secondary")}
      </Link>
      <Link
        href={`/${locale}/seller/products/new`}
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className:
            "h-[50px] w-full text-label font-bold md:flex-1 md:px-0 md:text-body tablet:h-[50px] xl:h-[56px] xl:text-h5",
        })}
      >
        {t("seller-success.submit")}
      </Link>
    </section>
  );
}

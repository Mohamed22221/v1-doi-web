import { cacheLife } from "next/cache";
import Link from "next/link";

// i18n
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";

// Components
import { buttonVariants } from "@components/ui/button";

interface SellerRejectedActionProps {
  locale: Locale;
}

/**
 * SellerRejectedAction
 *
 * Provides action buttons for the rejected verification screen:
 * 1. Retry (Primary) - Redirects back to the verification start page.
 * 2. Contact Support (Secondary) - Redirects to the homepage or support.
 *
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function SellerRejectedAction({ locale }: SellerRejectedActionProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  return (
    <section className="flex w-full flex-col-reverse items-center gap-3 md:mx-auto md:max-w-md md:flex-row-reverse md:justify-center md:gap-4">
      {/* Retry Button (Primary) */}
      <Link
        href={`/${locale}/seller/start`}
        className={buttonVariants({
          variant: "secondary",
          size: "lg",
          className:
            "h-[50px] w-full text-label font-bold text-primary-500 md:flex-1 md:px-0 md:text-body tablet:h-[50px] xl:h-[56px] xl:text-h5",
        })}
      >
        {t("seller-rejected.submit")}
      </Link>

      {/* Contact Support Button (Secondary) */}
      <Link
        href={`/${locale}/seller`}
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className:
            "h-[50px] w-full text-label font-bold md:flex-1 md:px-0 md:text-body tablet:h-[50px] xl:h-[56px] xl:text-h5",
        })}
      >
        {t("seller-rejected.secondary")}
      </Link>
    </section>
  );
}

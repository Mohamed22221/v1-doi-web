import { cacheLife } from "next/cache";
import Link from "next/link";

// i18n
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";

// Components
import { buttonVariants } from "@components/ui/button";

interface SellerStartActionProps {
  locale: Locale;
}

/**
 * SellerStartAction
 *
 * Provides the primary action button to begin the identity verification process.
 *
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function SellerStartAction({ locale }: SellerStartActionProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  return (
    <section className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600 md:text-h5 dark:text-neutral-400">
        {t("seller-start.helper")}
      </p>
      <Link
        href={`/${locale}/seller/verify`}
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className:
            "h-[50px] w-full text-label font-bold tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-h5",
        })}
      >
        {t("seller-start.submit")}
      </Link>
    </section>
  );
}

import Link from "next/link";
import { cacheLife } from "next/cache";

// UI Components
import { Card } from "@components/ui/card";
import { BuyerSocialActions } from "./buyer-social-actions";

// i18n
import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

interface BuyerLoginSocialProps {
  locale: Locale;
}

/**
 * BuyerLoginSocial
 *
 * Server Component that renders the social login section.
 * Using "use cache" if applicable (not here as it depends on locale/params).
 * The interactive parts are moved to BuyerSocialActions client component.
 */
export default async function BuyerLoginSocial({ locale }: BuyerLoginSocialProps) {
  const { t } = await getTranslation(locale, "auth");

  return (
    <Card className="w-full p-6 tablet:max-w-[550px] xl:max-w-[600px]">
      <p className="text-center text-label text-neutral-400 tablet:text-h5 dark:text-neutral-300">
        {t("buyer-login.form.orContinueWith")}
      </p>

      <BuyerSocialActions locale={locale} />

      <div className="mt-1 text-center text-label text-neutral-400 tablet:text-body xl:text-h5 dark:text-neutral-300">
        {t("buyer-login.form.noAccount")}{" "}
        <Link
          href={`/${locale}/buyer/register`}
          className="mx-1 font-bold text-primary-500 hover:underline dark:text-primary-300"
        >
          {t("buyer-login.form.registerNow")}
        </Link>
      </div>
    </Card>
  );
}


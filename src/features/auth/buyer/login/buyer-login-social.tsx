"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/shared/icon";
import { AppleIcon, GoogleIcon } from "@/components/shared/icon/constant";

// i18n
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

export default function BuyerLoginSocial() {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslation(locale as Locale, "auth");

  return (
    <Card className="w-full p-6 tablet:max-w-[550px] xl:max-w-[600px]">
      <p className="text-center text-label text-neutral-400 tablet:text-h5 dark:text-neutral-300">
        {t("buyer-login.form.orContinueWith")}
      </p>

      <div className="flex w-full flex-col items-center justify-center gap-4 tablet:flex-row">
        <Button
          variant="outline"
          className="h-[48px] min-w-full text-label tablet:h-[50px] tablet:min-w-[240px] tablet:text-body xl:h-[56px] xl:text-h5"
          rounded="xl"
        >
          <Icon icon={GoogleIcon} />
          <span className="font-semibold text-primary-800 dark:text-neutral-50">Google</span>
        </Button>
        <Button
          variant="outline"
          className="h-[48px] min-w-full text-label tablet:h-[50px] tablet:min-w-[240px] tablet:text-body xl:h-[56px] xl:text-h5"
          rounded="xl"
        >
          <Icon icon={AppleIcon} className="text-neutral-950 dark:text-neutral-50" />
          <span className="font-semibold text-primary-800 dark:text-neutral-50">Apple</span>
        </Button>
      </div>

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

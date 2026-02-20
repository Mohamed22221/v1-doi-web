import { Button } from "@components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";
import { cacheLife } from "next/cache";
import Link from "next/link";

interface ResetSuccessActionProps {
  locale: Locale;
}

export default async function ResetSuccessAction({ locale }: ResetSuccessActionProps) {
  "use cache";
  cacheLife("days");
  const { t } = await getTranslation(locale, "auth");
  return (
    <Link href={`/${locale}/buyer/login`} className="w-full">
      <Button
        className="h-[48px] w-full text-label font-bold tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
        size="lg"
      >
        {t("buyer-reset-password-success.submit")}
      </Button>
    </Link>
  );
}

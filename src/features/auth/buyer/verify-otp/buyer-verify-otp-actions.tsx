"use client";

import { useParams } from "next/navigation";

// UI Components
import { Card } from "@components/ui/card";
import { Button } from "@components/ui/button";

// i18n
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

interface BuyerVerifyOtpActionsProps {
  timeLeft: number;
  onResend: () => void;
  formId: string;
}

export default function BuyerVerifyOtpActions({
  timeLeft,
  onResend,
  formId,
}: BuyerVerifyOtpActionsProps) {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslation(locale as Locale, "auth");

  return (
    <Card className="flex w-full flex-col gap-5 p-6 tablet:max-w-[550px] xl:max-w-[600px]">
      {/* Confirm Button moved here to match image */}
      <Button
        type="submit"
        form={formId}
        className="h-[48px] w-full text-label font-bold tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
        size="lg"
      >
        {t("buyer-verify-otp.confirm")}
      </Button>

      {/* Footer Actions */}
      <div className="flex items-center justify-center gap-2 text-label tablet:text-body">
        <span className="text-neutral-400 dark:text-neutral-300">
          {t("buyer-verify-otp.noCodeReceived")}
        </span>
        <button
          type="button"
          onClick={onResend}
          disabled={timeLeft > 0}
          className={`font-bold transition-colors ${timeLeft > 0
            ? "cursor-not-allowed text-neutral-300 dark:text-neutral-600"
            : "text-primary-500 hover:text-primary-600 dark:text-primary-300"
            }`}
        >
          {t("buyer-verify-otp.resendNow")}
        </button>
      </div>
    </Card>
  );
}

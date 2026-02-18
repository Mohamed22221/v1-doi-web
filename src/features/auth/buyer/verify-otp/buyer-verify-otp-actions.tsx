"use client"

import { useParams } from "next/navigation"

// UI Components
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// i18n
import { useTranslation } from "@/lib/i18n/client"
import type { Locale } from "@/lib/i18n/config"

interface BuyerVerifyOtpActionsProps {
    timeLeft: number
    onResend: () => void
    formId: string
}

export default function BuyerVerifyOtpActions({ timeLeft, onResend, formId }: BuyerVerifyOtpActionsProps) {
    const params = useParams()
    const locale = params.locale as string
    const { t } = useTranslation(locale as Locale, "auth")

    return (
        <Card className="p-6 tablet:max-w-[550px] xl:max-w-[600px] w-full flex flex-col gap-5">
            {/* Confirm Button moved here to match image */}
            <Button
                type="submit"
                form={formId}
                className="w-full tablet:h-[50px] xl:h-[56px] h-[48px] tablet:text-body xl:text-lg text-label font-bold"
                size="lg"
            >
                {t("buyer-verify-otp.confirm")}
            </Button>

            {/* Footer Actions */}
            <div className="flex items-center justify-center gap-2 tablet:text-body text-label">
                <span className="text-neutral-400 dark:text-neutral-300">
                    {t("buyer-verify-otp.noCodeReceived")}
                </span>
                <button
                    type="button"
                    onClick={onResend}
                    disabled={timeLeft > 0}
                    className={`font-bold transition-colors ${timeLeft > 0
                            ? "text-neutral-300 cursor-not-allowed dark:text-neutral-600"
                            : "text-primary-500 hover:text-primary-600 dark:text-primary-300"
                        }`}
                >
                    {t("buyer-verify-otp.resendNow")}
                </button>
            </div>
        </Card>
    )
}

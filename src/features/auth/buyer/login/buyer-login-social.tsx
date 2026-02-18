"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

// UI Components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Icon from "@/components/shared/Icon"
import { AppleIcon, GoogleIcon } from "@/components/shared/Icon/constant"

// i18n
import { useTranslation } from "@/lib/i18n/client"
import type { Locale } from "@/lib/i18n/config"

export default function BuyerLoginSocial() {
    const params = useParams()
    const locale = params.locale as string
    const { t } = useTranslation(locale as Locale, "auth")

    return (
        <Card className="p-6 tablet:max-w-[550px] xl:max-w-[600px] w-full">
            <p className="text-center text-neutral-400 dark:text-neutral-300 tablet:text-h5 text-label">
                {t("buyer-login.form.orContinueWith")}
            </p>

            <div className="flex tablet:flex-row flex-col items-center justify-center gap-4 w-full">
                <Button
                    variant="outline"
                    className="tablet:min-w-[240px] min-w-full h-[48px] tablet:h-[50px] xl:h-[56px] tablet:text-body xl:text-h5 text-label"
                    rounded="xl"
                >
                    <Icon icon={GoogleIcon} />
                    <span className="font-semibold text-primary-800 dark:text-neutral-50">Google</span>
                </Button>
                <Button
                    variant="outline"
                    className="tablet:min-w-[240px] min-w-full h-[48px] tablet:h-[50px] xl:h-[56px] tablet:text-body xl:text-h5 text-label"
                    rounded="xl"
                >
                    <Icon icon={AppleIcon} className="text-neutral-950 dark:text-neutral-50" />
                    <span className="font-semibold text-primary-800 dark:text-neutral-50">Apple</span>
                </Button>
            </div>

            <div className="text-center tablet:text-body xl:text-h5 text-label text-neutral-400 dark:text-neutral-300 mt-1">
                {t("buyer-login.form.noAccount")}{" "}
                <Link
                    href={`/${locale}/buyer/register`}
                    className="text-primary-500 font-bold hover:underline mx-1 dark:text-primary-300"
                >
                    {t("buyer-login.form.registerNow")}
                </Link>
            </div>
        </Card>
    )
}

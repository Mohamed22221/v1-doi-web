import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n/config"
import { getTranslation } from "@/lib/i18n/server"
import { cacheLife } from "next/cache"
import Link from "next/link"

interface ResetSuccessActionProps {
    locale: Locale
}

export default async function ResetSuccessAction({ locale }: ResetSuccessActionProps) {
    'use cache'
    cacheLife("days")
    const { t } = await getTranslation(locale, 'auth')
    return (
        <Link href={`/${locale}/buyer/login`} className="w-full">
            <Button
                className="w-full tablet:h-[50px] xl:h-[56px] h-[48px] tablet:text-body xl:text-lg text-label font-bold"
                size="lg"
            >
                {t('buyer-reset-password-success.submit')}
            </Button>
        </Link>
    )
}
"use client"

import * as React from "react"
import { useParams } from "next/navigation"
// i18n
import { useTranslation } from "@/lib/i18n/client"
import type { Locale } from "@/lib/i18n/config"

/**
 * RegisterRedirectCard
 * 
 * Displays the "Redirecting..." message in the secondary card of the success page.
 */
export default function RegisterRedirectCard() {
    const params = useParams()
    const locale = params.locale as Locale
    const { t } = useTranslation(locale, 'auth')

    return (
        <div className="flex items-center justify-center py-1">
            <p className="text-caption md:text-body text-neutral-400 dark:text-neutral-300 font-medium">
                {t('buyer-register-success.redirect')}
            </p>
        </div>
    )
}

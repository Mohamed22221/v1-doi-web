import { cacheLife } from 'next/cache'
import Image from 'next/image'

// i18n
import type { Locale } from '@/lib/i18n/config'
import { getTranslation } from '@/lib/i18n/server'

// Components
import Logo from '@/components/template/nav/logo'
import HeaderSidebar from '@/features/auth/components/header-sidebar'
import { Button } from '@/components/ui/button'

interface ResetSuccessContentProps {
    locale: Locale
}

/**
 * ResetSuccessContent
 * 
 * Displays a success message after a user successfully resets their password.
 * Includes a celebratory illustration and a link to return to the login page.
 * 
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function ResetSuccessContent({ locale }: ResetSuccessContentProps) {
    'use cache'
    cacheLife("days")

    const { t } = await getTranslation(locale, 'auth')

    return (
        <div className="flex flex-col items-center text-center gap-6">
            {/* Brand Logo */}
            <Logo imgClass="w-[100px] h-[56px]" className="mb-2" />

            {/* Illustration */}
            <div className="relative w-full max-w-[375px] max-h-[375px] aspect-square">
                <Image
                    src="/img/authentication-bro.png"
                    alt="Success illustration"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Success Message */}
            <HeaderSidebar
                title={t('buyer-reset-password-success.title')}
                subtitle={t('buyer-reset-password-success.subtitle')}
                className='mt-0 space-y-1 !pt-1 md:!pt-2' classHeader="!text-primary-500 md:!text-primary-500 text-h3 md:text-h2" />

        </div>
    )
}


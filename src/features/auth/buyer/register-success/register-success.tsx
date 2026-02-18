import { cacheLife } from 'next/cache'
import Image from 'next/image'

// i18n
import type { Locale } from '@/lib/i18n/config'
import { getTranslation } from '@/lib/i18n/server'

// Components
import Logo from '@/components/template/nav/logo'
import HeaderSidebar from '@/features/auth/components/header-sidebar'
import { Button } from '@/components/ui/button'

interface RegisterSuccessProps {
    locale: Locale
}

/**
 * RegisterSuccess
 * 
 * Displays a success message after a user successfully registers.
 * Includes a celebratory illustration and a link to return to the login page.
 * 
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function RegisterSuccess({ locale }: RegisterSuccessProps) {
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
                    src="/img/Confirmed-bro.png"
                    alt="Success illustration"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Success Message */}
            <HeaderSidebar
                title={t('buyer-register-success.title')}
                subtitle={t('buyer-register-success.subtitle')}
                className='mt-0 space-y-2 !pt-0'
                classHeader="!text-primary-500 dark:!text-primary-400 text-[24px] md:text-[32px]"
            />
        </div>
    )
}


import type { Locale } from "@/lib/i18n/config"

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout"
import BuyerSidebar from "@/features/auth/buyer/BuyerSidebar"
import BuyerLoginPasswordForm from "@/features/auth/buyer/login/BuyerLoginPasswordForm"

interface PageProps {
    params: Promise<{ locale: string }>
}

/**
 * BuyerLoginPasswordPage
 * 
 * Page for buyers to login using their phone number and password.
 * Uses the same split layout and sidebar as the main login page.
 */
export default async function BuyerLoginPasswordPage({ params }: PageProps) {
    const { locale } = await params

    return (
        <AuthSplitLayout
            formContent={<BuyerLoginPasswordForm />}
            sidebarContent={
                <BuyerSidebar
                    locale={locale as Locale}
                    variant="buyer-login"
                />
            }
        />
    )
}

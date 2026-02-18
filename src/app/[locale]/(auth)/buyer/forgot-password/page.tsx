import type { Locale } from "@/lib/i18n/config"

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout"
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar"
import BuyerForgotPasswordForm from "@/features/auth/buyer/forgot-password/buyer-forgot-password-form"

interface PageProps {
    params: Promise<{ locale: string }>
}

/**
 * BuyerForgotPasswordPage
 * 
 * The entry point for the buyer forgot password route. 
 * Assembles the `AuthSplitLayout` with `BuyerForgotPasswordForm` and `BuyerSidebar`.
 */
export default async function BuyerForgotPasswordPage({ params }: PageProps) {
    const { locale } = await params

    return (
        <AuthSplitLayout
            // Form Area: The forgot password form
            formContent={<BuyerForgotPasswordForm />}

            // Sidebar Area: Using the same buyer-login variant for consistency
            sidebarContent={
                <BuyerSidebar
                    locale={locale as Locale}
                    variant="buyer-login"
                />
            }
        />
    )
}

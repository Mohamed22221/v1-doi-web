import type { Locale } from "@/lib/i18n/config"

// Layouts & Components
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout"
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar"
import BuyerResetPasswordForm from "@/features/auth/buyer/reset-password/buyer-reset-password-form"

interface PageProps {
    params: Promise<{ locale: string }>
}

/**
 * BuyerResetPasswordPage
 * 
 * The entry point for the buyer reset password route. 
 * Assembles the `AuthSplitLayout` with `BuyerResetPasswordForm` and `BuyerSidebar`.
 */
export default async function BuyerResetPasswordPage({ params }: PageProps) {
    const { locale } = await params

    return (
        <AuthSplitLayout
            // Form Area: The reset password form
            formContent={<BuyerResetPasswordForm />}

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

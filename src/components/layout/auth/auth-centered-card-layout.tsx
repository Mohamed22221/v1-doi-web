import type { ReactNode } from "react"
import { cn } from "@/lib/utils/cn"
import { PageContainer } from "@/components/template/container/page-container"
import { Card } from "@/components/ui/card"

export interface AuthCenteredCardLayoutProps {
    children: ReactNode
    actionContent?: ReactNode
    className?: string
    cardClassName?: string
    actionCardClassName?: string
}

/**
 * AuthCenteredCardLayout
 * 
 * A reusable layout for authentication-related pages that require a centered card structure
 * (e.g., Success pages, Email verification, etc.).
 * 
 * Note: This component is a Server Component and uses 'use cache' for static delivery.
 * 
 * @param {AuthCenteredCardLayoutProps} props
 */
export function AuthCenteredCardLayout({
    children,
    actionContent,
    className,
    cardClassName,
    actionCardClassName,
}: AuthCenteredCardLayoutProps) {

    return (
        <PageContainer
            variant="auth"
            className={cn(
                "flex flex-col items-center justify-center pb-10 px-3 pt-6 sm:p-6 lg:p-5 ",
                className
            )}
        >
            <div className="w-full flex flex-col gap-4 tablet:gap-6 items-center max-w-[600px]">
                {/* Main Content Card */}
                <Card
                    className={cn(
                        "w-full p-6 tablet:p-10 flex flex-col items-center relative overflow-hidden",
                        cardClassName
                    )}
                >
                    <div className="w-full">
                        {children}
                    </div>
                </Card>

                {/* Secondary Action Card (Optional) */}
                {actionContent && (
                    <Card className={cn("w-full p-4 tablet:p-6 flex flex-col items-center", actionCardClassName)}>
                        <div className="w-full">
                            {actionContent}
                        </div>
                    </Card>
                )}
            </div>
        </PageContainer>
    )
}

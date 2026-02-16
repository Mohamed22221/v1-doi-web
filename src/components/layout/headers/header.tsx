import Logo from "@components/template/nav/logo"
import { HeaderActions } from "./header-actions"
import { DeliveryLocation } from "@components/template/nav/delivery-location"
import { HeaderActionRole } from "@config/header-actions-config"
import { cn } from "@utils/cn"
import { PageContainer } from "@components/template/container/page-container"

interface HeaderProps {
    role: HeaderActionRole
    showDelivery?: boolean
    className?: string
}

export function Header({ role, showDelivery = true, className }: HeaderProps) {
    return (
        <header className={cn(
            "fixed top-0 inset-x-0 md:relative z-50 bg-neutral-10 md:bg-primary-400 rounded-b-2xl md:rounded-none dark:bg-card md:dark:bg-primary-700 text-neutral-90 md:text-white h-[72px] md:h-[90px] flex items-center transition-all duration-300",
            className
        )}>
            <PageContainer variant="full" className="h-full w-full flex items-center justify-between">

                <div className="flex items-center gap-7">
                    <div className="md:hidden">
                        <Logo width={53} height={30} />
                    </div>
                    <div className="hidden md:block">
                        <Logo width={76} height={40} mode="dark" />
                    </div>
                    {/* Center: Delivery Location (Optional) */}
                    {showDelivery && (
                        <div className="hidden md:block">
                            <DeliveryLocation />
                        </div>
                    )}

                </div>
                {/* Left Side: Dynamic Actions */}
                <HeaderActions role={role} variant="mobile" className="md:hidden " />
                <HeaderActions role={role} variant="desktop" className="hidden md:flex" />
                {/* Right Side: Logo */}

            </PageContainer>
        </header>
    )
}

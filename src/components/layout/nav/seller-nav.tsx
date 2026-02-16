import type { Role } from "@defs/nav"
import type { Locale } from "@lib/i18n/config"
import { NavLinksContainer } from "./nav-links-container"

import { BellIcon } from "@components/shared/Icon/constant"
import Icon from "@components/shared/Icon"
import Logo from "@components/template/nav/logo"
import { Button } from "@components/ui/button"
import { UserAvatar } from "@components/template/nav/user-avatar"
import { PageContainer } from "@components/template/container/page-container"

interface SellerNavProps {
    roles: Role[]
    locale: Locale
}

export function SellerNav({ roles, locale }: SellerNavProps) {
    return (
        <header className="fixed top-0 inset-x-0 z-40 h-[85px] border-b bg-neutral-10 dark:bg-card transition-colors hidden md:block">
            <PageContainer variant="full" className="h-full flex items-center justify-between">
                {/* Right Side: Logo (Appears right in RTL) */}
                <div className="flex items-center">
                    <Logo width={76} height={40} />
                </div>

                <nav className="flex items-center gap-2">
                    <NavLinksContainer roles={roles} locale={locale} variant="desktop" />
                </nav>
                <div className="flex items-center gap-4">

                    <Button variant="outline" size="icon" className="size-[48px] border border-neutral-20 hover:bg-primary-200 text-neutral-400  dark:hover:bg-primary-500  " rounded="full" >
                        <Icon icon={BellIcon} className="size-[24px] dark:text-white" />
                    </Button>
                    <UserAvatar href="/seller/profile" src="/avatars/thumb-2.jpg" size="48px" />
                </div>

            </PageContainer>
        </header>
    )
}

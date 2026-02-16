import type { Role } from "@defs/nav"
import type { Locale } from "@lib/i18n/config"
import { NavLinksContainer } from "./nav-links-container"
interface BuyerNavProps {
    roles: Role[]
    locale: Locale
}

export async function BuyerNav({ roles, locale }: BuyerNavProps) {
    return (
        <nav className="sticky top-0 z-30 bg-neutral-10 dark:bg-card border-b shadow-sm hidden md:block transition-all duration-300">
            <div className="max-w-[1500px] mx-auto flex items-center justify-center h-[85px] px-8">
                <div className="flex items-center gap-6">
                    <NavLinksContainer roles={roles} locale={locale} variant="desktop" />
                </div>
            </div>
        </nav>
    )
}

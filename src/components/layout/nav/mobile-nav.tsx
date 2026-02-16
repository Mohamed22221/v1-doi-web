import type { Role } from "@defs/nav"
import type { Locale } from "@lib/i18n/config"
import { NavLinksContainer } from "./nav-links-container"

interface MobileNavProps {
    roles: Role[]
    locale: Locale
}

export async function MobileNav({ roles, locale }: MobileNavProps) {

    return (
        <nav className="fixed bottom-0 inset-x-0 z-40  border-t rounded-t-2xl bg-neutral-10 dark:bg-card backdrop-blur-[100px] transition-colors pb-[env(safe-area-inset-bottom)] md:hidden">
            <div className="flex items-center justify-around h-16 px-2">

                <NavLinksContainer roles={roles} locale={locale} variant="mobile" />

            </div>
        </nav>
    )
}

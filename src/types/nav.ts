
export type Role = "guest" | "buyer" | "seller" | "admin"

export interface NavItemRules {
    roles?: Role[]
    hideOn?: string[] // Paths to hide this specific item
    showOn?: string[] // Paths to show this specific item (if roles match)
    requiresAuth?: boolean
    exact?: boolean // Match pathname exactly
}

export interface NavItem {
    id: string
    href: string
    translationKey: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    rules?: NavItemRules
    badgeKey?: string // Key to fetch badge count (e.g. 'cart')
}

export interface NavVisibilityRules {
    hideNavbarOn: string[] // Path prefixes where navbar should be completely hidden
}

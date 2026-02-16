import { BellIcon, ShoppingBagIcon, UserIcon } from "@components/shared/Icon/constant"

export type HeaderActionType = 'link' | 'button'
export type HeaderActionRole = 'buyer' | 'seller' | 'guest'
export type HeaderActionVisibility = 'mobile' | 'desktop' | 'both'

export interface HeaderAction {
    id: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    roleIcons?: Partial<Record<HeaderActionRole, React.ComponentType<React.SVGProps<SVGSVGElement>>>>
    translationKey: string
    roles: HeaderActionRole[]
    visibility: HeaderActionVisibility
    type: HeaderActionType
    href?: string
    variant?: 'outline' | 'ghost'
}

export const HEADER_ACTIONS: HeaderAction[] = [

    {
        id: 'notifications',
        icon: BellIcon,
        translationKey: 'header.notifications',
        roles: ['buyer', 'seller'],
        visibility: 'both',
        type: 'button',
        variant: 'outline'
    },
    {
        id: 'cart',
        icon: ShoppingBagIcon,
        translationKey: 'header.cart',
        roles: ['buyer'],
        visibility: 'both',
        type: 'link',
        href: '/cart',
        variant: 'outline'
    },
    {
        id: 'profile',
        icon: UserIcon,
        translationKey: 'header.profile',
        roles: ['buyer'],
        visibility: 'both',
        type: 'link',
        href: '/buyer/profile',
        variant: 'outline'
    },
    {
        id: 'profile',
        icon: UserIcon,
        translationKey: 'header.profile',
        roles: ['seller'],
        visibility: 'both',
        type: 'link',
        href: '/seller/profile',
        variant: 'outline'
    },
]

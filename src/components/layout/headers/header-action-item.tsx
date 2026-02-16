import Link from "next/link"
import { HeaderAction, HeaderActionRole } from "@config/header-actions-config"
import { ClientActionItem } from "./client-action-item"
import { UserAvatar } from "@components/template/nav/user-avatar"
import Icon from "@components/shared/Icon"
import { cn } from "@utils/cn"
import { cva } from "class-variance-authority"

const headerActionVariants = cva(
    "flex items-center justify-center size-[38px] md:size-11 rounded-full transition-colors shrink-0",
    {
        variants: {
            theme: {
                glass: "md:border-none md:bg-white/20 md:text-white md:hover:bg-white/30 dark:md:bg-white/10 dark:md:hover:bg-white/20",
                system: "border border-neutral-20 hover:bg-primary-200 text-neutral-400 dark:border-neutral-700 dark:hover:bg-primary-200 dark:text-white",
            },
            actionType: {
                outline: "hover:text-primary-700",
                ghost: "",
            },
            sizeType: {
                base: "",
                profile: "size-[38px] md:size-[48px]"
            }
        },
        defaultVariants: {
            theme: "system",
            actionType: "ghost",
            sizeType: "base"
        }
    }
)

interface HeaderActionItemProps {
    action: HeaderAction
    role: HeaderActionRole
    variant: 'mobile' | 'desktop'
    className?: string
}

export function HeaderActionItem({ action, role, variant, className }: HeaderActionItemProps) {
    const { id, type, href, variant: actionVariant } = action
    const iconComponent = action.roleIcons?.[role] || action.icon

    const baseStyles = cn(
        headerActionVariants({
            theme: (variant === 'desktop' && role === 'buyer') ? "glass" : "system",
            actionType: actionVariant === 'outline' ? "outline" : "ghost",
            sizeType: id === 'profile' ? "profile" : "base"
        }),
        className
    )

    // 1. Profile Case (Always a Link with UserAvatar)
    if (id === 'profile' && href) {
        return (
            <UserAvatar
                src="/avatars/thumb-2.jpg"
                className={cn(baseStyles, (variant === 'desktop' && role === 'buyer') && "md:border-none")}
                href={href}
            />
        )
    }

    // 2. Link Case (For SEO and Nav links)
    if (type === 'link' && href) {
        return (
            <Link href={href} className={baseStyles}>
                <Icon icon={iconComponent} className="size-[20px] md:size-6" />
                <span className="sr-only">{id}</span>
            </Link>
        )
    }

    // 3. Button Case (For interactive client actions like Notifications)
    return (
        <ClientActionItem
            id={id}
            variant={actionVariant}
            className={baseStyles}
        >
            <Icon icon={iconComponent} className="size-[20px] md:size-6" />
        </ClientActionItem>
    )
}

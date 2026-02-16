import Image from "next/image"
import { cn } from "@/lib/utils/cn"
import Link from "next/link"

interface UserAvatarProps {
    src?: string
    alt?: string
    size?: string
    className?: string
    href?: string
}

export function UserAvatar({ src, alt = "User avatar", size, className, href }: UserAvatarProps) {
    if (!src) {
        return (
            <div
                className={cn(
                    "rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center font-bold text-primary-600 dark:text-primary-400 shrink-0 aspect-square",
                    !size && "size-12",
                    className
                )}
                style={size ? { width: size, height: size } : undefined}
            >
                P
            </div>
        )
    }

    return (
        <Link
            className={cn("relative rounded-full overflow-hidden border border-neutral-20 dark:border-neutral-700 shrink-0 aspect-square",
                !size && "size-12",
                className)}
            style={size ? { width: size, height: size } : undefined}
            href={href || "/profile"}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />
        </Link>
    )
}

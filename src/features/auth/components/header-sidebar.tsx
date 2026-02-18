import { cn } from "@/lib/utils/cn"

interface PropsHeader {
    title: string
    subtitle: string
    className?: string
    classHeader?: string
}

/**
 * HeaderSidebar
 * 
 * Displays a title and subtitle, typically used in the authentication sidebar
 * or as a header for mobile views.
 */
export default function HeaderSidebar({ title, subtitle, className, classHeader }: PropsHeader) {
    return (
        <div className={cn("space-y-2 md:pt-7 pt-5", className)}>
            <h1 className={cn("text-[24px] md:text-[32px] font-[700] text-neutral-900 dark:text-neutral-50", classHeader)}>
                {title}
            </h1>
            <p className="md:text-lg text-caption text-neutral-600 dark:text-neutral-300 max-w-[600px]">
                {subtitle}
            </p>
        </div>
    )
}
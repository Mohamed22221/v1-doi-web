interface PropsHeader {
    title: string
    subtitle: string
}

/**
 * HeaderSidebar
 * 
 * Displays a title and subtitle, typically used in the authentication sidebar
 * or as a header for mobile views.
 */
export default function HeaderSidebar({ title, subtitle }: PropsHeader) {
    return (
        <div className="space-y-2 md:pt-7 pt-5">
            <h1 className="md:text-h1 text-h3 font-[700] tracking-[0.03em] text-neutral-900 dark:text-neutral-50">
                {title}
            </h1>
            <p className="md:text-lg text-caption text-neutral-600 dark:text-neutral-300 max-w-[600px]">
                {subtitle}
            </p>
        </div>
    )
}
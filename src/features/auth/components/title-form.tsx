
export default function TitleForm({ title, className }: { title: string, className?: string }) {
    return (

        <h2 className={`hidden tablet:block md:text-2xl font-bold text-center text-neutral-950 dark:text-neutral-50 ${className}`}>
            {title}
        </h2>
    )
}
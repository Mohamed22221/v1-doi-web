import { cn } from "@utils/cn";

interface PropsHeader {
  title: string;
  subtitle: string;
  className?: string;
  classHeader?: string;
}

/**
 * HeaderSidebar
 *
 * Displays a title and subtitle, typically used in the authentication sidebar
 * or as a header for mobile views.
 */
export default function HeaderSidebar({ title, subtitle, className, classHeader }: PropsHeader) {

  return (
    <div className={cn("space-y-2 pt-5 md:pt-7", className)}>
      <h1
        className={cn(
          "text-[24px] font-[700] text-neutral-900 md:text-[32px] dark:text-neutral-50",
          classHeader,
        )}
      >
        {title}
      </h1>
      <p className="max-w-[600px] text-caption text-neutral-600 md:text-lg dark:text-neutral-300">
        {subtitle}
      </p>
    </div>
  );
}

import { cn } from "@utils/cn";

interface PropsHeader {
  title: string;
  subtitle: string;
  className?: string;
  classHeader?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * HeaderSidebar
 *
 * Displays a title and subtitle, typically used in the authentication sidebar
 * or as a header for mobile views.
 */
export default function HeaderSidebar({
  title,
  subtitle,
  className,
  classHeader,
  as: Component = "h1",
}: PropsHeader) {
  return (
    <div className={cn("space-y-2 pt-5 md:pt-7", className)}>
      <Component
        className={cn(
          "text-h3 font-bold text-neutral-900 md:text-h2 dark:text-neutral-50",
          classHeader,
        )}
      >
        {title}
      </Component>
      <p className="max-w-[600px] text-caption text-neutral-600 md:text-lg dark:text-neutral-300">
        {subtitle}
      </p>
    </div>
  );
}

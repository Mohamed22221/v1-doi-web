import { cn } from "@/lib/utils/cn";

interface PageContainerProps {
    /**
     * Container variant determines max-width and spacing behavior
     * - dashboard: For seller/buyer dashboard pages (max-w-[1400px])
     * - auth: For authentication pages (max-w-[480px], centered)
     * - narrow: For content-focused pages (max-w-[800px], centered)
     * - full: Full-width container with padding only
     */
    variant?: "dashboard" | "auth" | "narrow" | "full";

    /**
     * Add top spacing to account for fixed header
     * Useful for dashboard layouts with sticky navigation
     */
    withTopSpacing?: boolean;

    /**
     * Additional CSS classes
     */
    className?: string;

    /**
     * Content to render inside the container
     */
    children: React.ReactNode;
}

/**
 * Unified page container component for consistent layouts across the app
 * Provides responsive padding, max-width constraints, and RTL/LTR support
 */
export function PageContainer({
    variant = "dashboard",
    withTopSpacing = false,
    className,
    children,
}: PageContainerProps) {
    return (
        <div
            className={cn(
                // Base responsive padding
                "px-4 sm:px-6 lg:px-8",

                // Top spacing for fixed headers
                withTopSpacing && "pt-27 md:pt-32",

                // Variant-specific max-width and centering
                {
                    // Dashboard: wide layout for data-heavy pages
                    "mx-auto max-w-[1400px]": variant === "dashboard",

                    // Auth: narrow centered layout for forms
                    "mx-auto max-w-[480px]": variant === "auth",

                    // Narrow: content-focused centered layout
                    "mx-auto max-w-[800px]": variant === "narrow",

                    // Full: no max-width constraint
                    "w-full": variant === "full",
                },

                // User-provided classes
                className
            )}
        >
            {children}
        </div>
    );
}

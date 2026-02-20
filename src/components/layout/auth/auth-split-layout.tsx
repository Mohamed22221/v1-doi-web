import { cn } from "@utils/cn";
import { PageContainer } from "@/components/template/container/page-container";
import type { AuthSplitLayoutProps, ChildernLayoutProps } from "@/types/auth-layout";

/**
 * AuthSplitLayout
 *
 * A specialized layout component for authentication pages (Login, Register, etc.).
 * It splits the screen into two main areas:
 * 1. Sidebar Content (typically branding, illustrations, or context).
 * 2. Form Content (the actual form or interaction area).
 *
 * @param {AuthSplitLayoutProps} props
 * @param {ReactNode} props.formContent - The content to be displayed in the form area.
 * @param {ReactNode} props.sidebarContent - The content to be displayed in the sidebar area.
 * @param {boolean} [props.reverse=false] - If true, reverses the order of sidebar and form on larger screens.
 * @param {string} [props.className] - Additional CSS classes for the container.
 */
export function AuthSplitLayout({
  formContent,
  sidebarContent,
  reverse = false,
  className,
  classType = false,
}: AuthSplitLayoutProps) {
  return (
    <PageContainer variant="dashboard" className={cn("px-3 pt-6 pb-10 sm:p-6 lg:pt-10", className)}>
      <div
        className={cn(
          `flex w-full flex-col tablet:flex-row ${classType ? "items-start justify-start" : "items-center justify-center"} gap-12 md:justify-between`,
          // Reverse layout direction on tablet+ screens if reverse prop is true
          reverse && "tablet:flex-row-reverse",
        )}
      >
        {/* Sidebar Section - Hidden on mobile, visible on tablet+ */}
        <AuthSidebarContent>{sidebarContent}</AuthSidebarContent>

        {/* Form Section - Main interaction area */}
        <AuthSplitFormArea>{formContent}</AuthSplitFormArea>
      </div>
    </PageContainer>
  );
}

// Helper Components

/**
 * AuthSidebarContent
 * Wrapper for the sidebar content.
 * Hidden on mobile screens, visible on tablet and larger.
 */
function AuthSidebarContent({ children }: ChildernLayoutProps) {
  return (
    <div className={cn("hidden text-center tablet:flex tablet:text-start")}>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}

/**
 * AuthSplitFormArea
 * Wrapper for the form content.
 * Centered and takes full width of its container.
 */
function AuthSplitFormArea({ children }: ChildernLayoutProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center tablet:w-[550px] tablet:max-w-[550px] xl:w-[600px] xl:max-w-[600px]">
      <div className="w-full">{children}</div>
    </div>
  );
}

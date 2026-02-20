import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "@/components/template/container/page-container";
import { Card } from "@/components/ui/card";

export interface AuthCenteredCardLayoutProps {
  children: ReactNode;
  actionContent?: ReactNode;
  className?: string;
  cardClassName?: string;
  actionCardClassName?: string;
}

/**
 * AuthCenteredCardLayout
 *
 * A reusable layout for authentication-related pages that require a centered card structure
 * (e.g., Success pages, Email verification, etc.).
 *
 * Note: This component is a Server Component and uses 'use cache' for static delivery.
 *
 * @param {AuthCenteredCardLayoutProps} props
 */
export function AuthCenteredCardLayout({
  children,
  actionContent,
  className,
  cardClassName,
  actionCardClassName,
}: AuthCenteredCardLayoutProps) {
  return (
    <PageContainer
      variant="auth"
      className={cn(
        "flex flex-col items-center justify-center px-3 pt-6 pb-10 sm:p-6 lg:p-5",
        className,
      )}
    >
      <div className="flex w-full max-w-[600px] flex-col items-center gap-4 tablet:gap-6">
        {/* Main Content Card */}
        <Card
          className={cn(
            "relative flex w-full flex-col items-center overflow-hidden p-6 tablet:p-10",
            cardClassName,
          )}
        >
          <div className="w-full">{children}</div>
        </Card>

        {/* Secondary Action Card (Optional) */}
        {actionContent && (
          <Card
            className={cn("flex w-full flex-col items-center p-4 tablet:p-6", actionCardClassName)}
          >
            <div className="w-full">{actionContent}</div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}

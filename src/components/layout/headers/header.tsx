import { Logo } from "@components/template/nav/logo";
import { HeaderActions } from "./header-actions";
import { DeliveryLocation } from "@components/template/nav/delivery-location";
import { HEADER_ACTIONS, type HeaderActionRole } from "@config/header-actions-config";
import { cn } from "@utils/cn";
import { PageContainer } from "@components/template/container/page-container";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";

interface HeaderProps {
  role: HeaderActionRole;
  showDelivery?: boolean;
  className?: string;
  locale?: Locale;
}

export async function Header({ role, showDelivery = true, className, locale }: HeaderProps) {
  // Resolve translation labels for text-link actions server-side
  let resolvedLabels: Record<string, string> | undefined;

  if (locale) {
    const textLinkActions = HEADER_ACTIONS.filter(
      (a) => a.type === "text-link" && a.translationKey && a.roles.includes(role),
    );

    if (textLinkActions.length > 0) {
      resolvedLabels = {};
      const { t } = await getTranslation(locale, "auth");
      for (const action of textLinkActions) {
        if (action.translationKey) {
          resolvedLabels[action.id] = t(action.translationKey as Parameters<typeof t>[0]);
        }
      }
    }
  }

  return (
    <header
      className={cn(
        "text-neutral-90 fixed inset-x-0 top-0 z-50 flex h-[72px] items-center rounded-b-2xl bg-neutral-10 transition-all duration-300 md:relative md:h-[90px] md:rounded-none md:bg-primary-400 md:text-white dark:bg-card md:dark:bg-primary-700",
        className,
      )}
    >
      <PageContainer variant="full" className="flex h-full w-full items-center justify-between">
        <div className="flex items-center gap-7">
          <div className="md:hidden">
            <Logo width={53} height={30} />
          </div>
          <div className="hidden md:block">
            <Logo width={76} height={40} mode="dark" />
          </div>
          {/* Center: Delivery Location (Optional) */}
          {showDelivery && (
            <div className="hidden md:block">
              <DeliveryLocation />
            </div>
          )}
        </div>
        {/* Left Side: Dynamic Actions */}
        <HeaderActions role={role} variant="mobile" className="md:hidden" resolvedLabels={resolvedLabels} locale={locale} />
        <HeaderActions role={role} variant="desktop" className="hidden md:flex" resolvedLabels={resolvedLabels} locale={locale} />
        {/* Right Side: Logo */}
      </PageContainer>
    </header>
  );
}

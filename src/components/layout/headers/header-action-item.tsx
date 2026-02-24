import Link from "next/link";
import type { HeaderAction, HeaderActionRole } from "@config/header-actions-config";
import { ClientActionItem } from "./client-action-item";
import { UserAvatar } from "@components/template/nav/user-avatar";
import Icon from "@components/shared/icon-base";
import { Button } from "@components/ui/button";
import { cn } from "@utils/cn";
import { cva } from "class-variance-authority";
import type { Locale } from "@lib/i18n/config";

const headerActionVariants = cva(
  "flex size-[38px] shrink-0 items-center justify-center rounded-full transition-colors md:size-11",
  {
    variants: {
      theme: {
        glass:
          "md:border-none md:bg-white/20 md:text-white md:hover:bg-white/30 dark:md:bg-white/10 dark:md:hover:bg-white/20",
        system:
          "border-neutral-20 border text-neutral-400 hover:bg-primary-200 dark:border-neutral-700 dark:text-white dark:hover:bg-primary-200",
      },
      actionType: {
        outline: "hover:text-primary-700",
        ghost: "",
      },
      sizeType: {
        base: "",
        profile: "size-[38px] md:size-[48px]",
      },
    },
    defaultVariants: {
      theme: "system",
      actionType: "ghost",
      sizeType: "base",
    },
  },
);

interface HeaderActionItemProps {
  action: HeaderAction;
  role: HeaderActionRole;
  variant: "mobile" | "desktop";
  className?: string;
  /** Pre-resolved label for text-link actions */
  resolvedLabel?: string;
  locale?: Locale;
}

/** Component mapping – renders any HeaderAction based on its `type` */
export function HeaderActionItem({
  action,
  role,
  variant,
  className,
  resolvedLabel,
  locale,
}: HeaderActionItemProps) {
  const { type, href: rawHref, variant: actionVariant } = action;
  const iconComponent = action.roleIcons?.[role] || action.icon;

  const href = locale && rawHref ? `/${locale}${rawHref}` : rawHref;

  const baseStyles = cn(
    headerActionVariants({
      theme: variant === "desktop" && role === "buyer" ? "glass" : "system",
      actionType: actionVariant === "outline" ? "outline" : "ghost",
      sizeType: type === "avatar" ? "profile" : "base",
    }),
    className,
  );

  // 1. Avatar type
  if (type === "avatar") {
    return (
      <UserAvatar
        src={action.src || "/avatars/thumb-2.jpg"}
        className={cn(baseStyles, variant === "desktop" && role === "buyer" && "md:border-none")}
        href={href || "/profile"}
      />
    );
  }

  // 2. Text-link type (e.g. Login button)
  if (type === "text-link" && href) {
    return (
      <Button
        asChild
        variant={actionVariant === "default" ? "default" : "outline"}
        className="h-9 px-3 text-tag md:h-[48px] md:px-8 md:text-lg"
        rounded="sm"
      >
        <Link href={href}>
          {resolvedLabel || action.label || action.translationKey || ""}
        </Link>
      </Button>
    );
  }

  // 3. Icon Link type (for SEO and Nav links)
  if (type === "link" && href && iconComponent) {
    return (
      <Link href={href} className={baseStyles}>
        <Icon icon={iconComponent} className="size-[20px] md:size-6" />
        <span className="sr-only">{action.id}</span>
      </Link>
    );
  }

  // 4. Button type (for interactive client actions like Notifications)
  if (iconComponent) {
    return (
      <ClientActionItem id={action.id} variant={actionVariant === "outline" ? "outline" : "ghost"} className={baseStyles}>
        <Icon icon={iconComponent} className="size-[20px] md:size-6" />
      </ClientActionItem>
    );
  }

  return null;
}

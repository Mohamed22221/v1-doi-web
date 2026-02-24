import { BellIcon, ShoppingBagIcon, UserIcon } from "@components/shared/icon-base/constant";

export type HeaderActionType = "link" | "button" | "avatar" | "text-link";
export type HeaderActionRole = "buyer" | "seller" | "guest";
export type HeaderActionVisibility = "mobile" | "desktop" | "both";

export interface HeaderAction {
  id: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roleIcons?: Partial<Record<HeaderActionRole, React.ComponentType<React.SVGProps<SVGSVGElement>>>>;
  translationKey?: string;
  roles: HeaderActionRole[];
  visibility: HeaderActionVisibility;
  type: HeaderActionType;
  href?: string;
  variant?: "outline" | "ghost" | "default";
  src?: string;
  label?: string;
}

export const HEADER_ACTIONS: HeaderAction[] = [
  // --- Buyer actions ---
  {
    id: "notifications",
    icon: BellIcon,
    translationKey: "header.notifications",
    roles: ["buyer", "seller", "guest"],
    visibility: "both",
    type: "link",
    href: "/notifications",
    variant: "outline",
  },
  {
    id: "cart",
    icon: ShoppingBagIcon,
    translationKey: "header.cart",
    roles: ["buyer", "guest"],
    visibility: "both",
    type: "link",
    href: "/cart",
    variant: "outline",
  },
  {
    id: "buyer-profile",
    icon: UserIcon,
    translationKey: "header.profile",
    roles: ["buyer"],
    visibility: "both",
    type: "link",
    href: "/buyer/profile",
    variant: "outline",
  },

  // --- Seller & Guest actions ---
  {
    id: "seller-profile",
    type: "avatar",
    href: "/seller/profile",
    src: "/avatars/thumb-2.jpg",
    roles: ["seller", "guest"],
    visibility: "both",
  },
  {
    id: "login",
    type: "text-link",
    href: "/buyer/login",
    translationKey: "buyer-register.form.loginNow",
    roles: ["guest"],
    visibility: "both",
    variant: "default",
  },
];

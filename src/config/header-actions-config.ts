import { ROUTES } from "@/components/routes";
import { BellIcon, ShoppingBagIcon, UserIcon } from "@components/shared/icon-base/constant";

export type HeaderActionType = "link" | "button" | "avatar" | "text-link";
export type HeaderActionRole = "buyer" | "seller" | "guest" | "buyer-auth";
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
    roles: ["buyer", "seller", "buyer-auth"],
    visibility: "both",
    type: "link",
    href: ROUTES.NOTIFICATIONS,
    variant: "outline",
  },
  {
    id: "cart",
    icon: ShoppingBagIcon,
    translationKey: "header.cart",
    roles: ["buyer", "buyer-auth"],
    visibility: "both",
    type: "link",
    href: ROUTES.CART,
    variant: "outline",
  },
  {
    id: "buyer-profile",
    icon: UserIcon,
    translationKey: "header.profile",
    roles: ["buyer", "buyer-auth"],
    visibility: "both",
    type: "link",
    href: ROUTES.DASHBOARD.BUYER.PROFILE,
    variant: "outline",
  },

  // --- Seller & Guest actions ---
  {
    id: "seller-profile",
    type: "avatar",
    href: ROUTES.DASHBOARD.SELLER.PROFILE,
    src: "/avatars/thumb-2.jpg",
    roles: ["seller"],
    visibility: "both",
  },
  {
    id: "login",
    type: "text-link",
    href: ROUTES.AUTH.LOGIN,
    translationKey: "buyer-register.form.loginNow",
    roles: ["guest"],
    visibility: "both",
    variant: "default",
  },
];

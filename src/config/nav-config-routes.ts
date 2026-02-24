import type { NavItem, NavVisibilityRules } from "@/types/nav";
import {
  HomeNavIcon,
  ProductsNavIcon,
  SellNavIcon,
  SearchNavIcon,
  PiddingNavIcon,
  ListNavIcon,
  BuyNavIcon,
  RatingsNavIcon,
} from "@components/shared/icon-base/constant";

export const NAV_VISIBILITY: NavVisibilityRules = {
  hideNavbarOn: ["/auth", "/login", "/register", "/checkout", "/notifications"],
};

export const NAV_ITEMS: NavItem[] = [
  //guest links
  {
    id: "home",
    href: "/",
    translationKey: "nav.home",
    icon: HomeNavIcon,
    rules: { roles: ["guest"] },
  },

  //buyer links
  {
    id: "buyer",
    href: "/dashboard/buyer",
    translationKey: "nav.home",
    icon: HomeNavIcon,
    rules: { roles: ["buyer"], requiresAuth: true },
  },
  {
    id: "search",
    href: "/dashboard/buyer/search",
    translationKey: "nav.search",
    icon: SearchNavIcon,
    rules: { roles: ["buyer", "guest"] },
  },
  {
    id: "sell",
    href: "/dashboard/buyer/sell",
    translationKey: "nav.sell",
    icon: SellNavIcon,
    rules: { roles: ["buyer", "guest"] },
  },
  {
    id: "pidding",
    href: "/dashboard/buyer/pidding",
    translationKey: "nav.pidding",
    icon: PiddingNavIcon,
    rules: { roles: ["buyer", "guest"] },
  },
  {
    id: "list",
    href: "/dashboard/buyer/list",
    translationKey: "nav.list",
    icon: ListNavIcon,
    rules: { roles: ["buyer", "guest"] },
  },
  //seller links
  {
    id: "home",
    href: "/dashboard/seller",
    translationKey: "nav.home",
    icon: HomeNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
  {
    id: "products",
    href: "/dashboard/seller/products",
    translationKey: "nav.products",
    icon: ProductsNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
  {
    id: "buy",
    href: "/dashboard/seller/buy",
    translationKey: "nav.buy",
    icon: BuyNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
  {
    id: "ratings",
    href: "/dashboard/seller/ratings",
    translationKey: "nav.ratings",
    icon: RatingsNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
  {
    id: "list",
    href: "/dashboard/seller/list",
    translationKey: "nav.list",
    icon: ListNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
];

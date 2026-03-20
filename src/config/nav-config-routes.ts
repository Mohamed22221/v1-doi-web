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
import { ROUTES } from "@config/routes";

export const NAV_VISIBILITY: NavVisibilityRules = {
  hideNavbarOn: [ROUTES.AUTH.LOGIN, ROUTES.AUTH.REGISTER, "/checkout", "/notifications"],
};

export const NAV_ITEMS: NavItem[] = [
  //guest links
  {
    id: "home",
    href: ROUTES.PUBLIC.HOME,
    translationKey: "nav.home",
    icon: HomeNavIcon,
    rules: { roles: ["guest", "buyer-auth"] },
  },

  //buyer links
  {
    id: "buyer",
    href: ROUTES.DASHBOARD.BUYER.ROOT,
    translationKey: "nav.home",
    icon: HomeNavIcon,
    rules: { roles: ["buyer"], exact: true },
  },
  {
    id: "search",
    href: ROUTES.DASHBOARD.BUYER.SEARCH,
    translationKey: "nav.search",
    icon: SearchNavIcon,
    rules: { roles: ["buyer", "guest", "buyer-auth"] },
  },
  {
    id: "sell",
    href: ROUTES.DASHBOARD.SELLER.ROOT,
    translationKey: "nav.sell",
    icon: SellNavIcon,
    rules: { roles: ["buyer", "guest", "buyer-auth"] },
  },
  {
    id: "pidding",
    href: ROUTES.DASHBOARD.BUYER.PIDDING,
    translationKey: "nav.pidding",
    icon: PiddingNavIcon,
    rules: { roles: ["buyer", "guest", "buyer-auth"] },
  },
  {
    id: "list",
    href: ROUTES.DASHBOARD.BUYER.LIST,
    translationKey: "nav.list",
    icon: ListNavIcon,
    rules: { roles: ["buyer", "guest", "buyer-auth"] },
  },
  //seller links
  {
    id: "home",
    href: ROUTES.DASHBOARD.SELLER.ROOT,
    translationKey: "nav.home",
    icon: HomeNavIcon,
    rules: { roles: ["seller"], requiresAuth: true, exact: true },
  },
  {
    id: "products",
    href: ROUTES.DASHBOARD.SELLER.PRODUCTS,
    translationKey: "nav.products",
    icon: ProductsNavIcon,
    rules: { roles: ["seller"] },
  },
  {
    id: "buy",
    href: ROUTES.DASHBOARD.BUYER.ROOT,
    translationKey: "nav.buy",
    icon: BuyNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
  {
    id: "ratings",
    href: ROUTES.DASHBOARD.SELLER.RATINGS,
    translationKey: "nav.ratings",
    icon: RatingsNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
  {
    id: "list",
    href: ROUTES.DASHBOARD.SELLER.LIST,
    translationKey: "nav.list",
    icon: ListNavIcon,
    rules: { roles: ["seller"], requiresAuth: true },
  },
];

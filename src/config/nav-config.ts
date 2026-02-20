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
    {
        id: "buyerHome",
        href: "/buyer",
        translationKey: "nav.products",
        icon: ProductsNavIcon,
        rules: { roles: ["guest"] },
    },
    {
        id: "sellerHome",
        href: "/seller",
        translationKey: "nav.sell",
        icon: SellNavIcon,
        rules: { roles: ["guest"] },
    },
    //buyer links
    {
        id: "buyer",
        href: "/buyer",
        translationKey: "nav.home",
        icon: HomeNavIcon,
        rules: { roles: ["buyer"], requiresAuth: true },
    },
    {
        id: "search",
        href: "/buyer/search",
        translationKey: "nav.search",
        icon: SearchNavIcon,
        rules: { roles: ["buyer"], requiresAuth: true },
    },
    {
        id: "sell",
        href: "/buyer/sell",
        translationKey: "nav.sell",
        icon: SellNavIcon,
        rules: { roles: ["buyer"], requiresAuth: true },
    },
    {
        id: "pidding",
        href: "/buyer/pidding",
        translationKey: "nav.pidding",
        icon: PiddingNavIcon,
        rules: { roles: ["buyer"], requiresAuth: true },
    },
    {
        id: "list",
        href: "/buyer/list",
        translationKey: "nav.list",
        icon: ListNavIcon,
        rules: { roles: ["buyer"], requiresAuth: true },
    },
    //seller links
    {
        id: "home",
        href: "/seller",
        translationKey: "nav.home",
        icon: HomeNavIcon,
        rules: { roles: ["seller"], requiresAuth: true },
    },
    {
        id: "products",
        href: "/seller/products",
        translationKey: "nav.products",
        icon: ProductsNavIcon,
        rules: { roles: ["seller"], requiresAuth: true },
    },
    {
        id: "buy",
        href: "/seller/buy",
        translationKey: "nav.buy",
        icon: BuyNavIcon,
        rules: { roles: ["seller"], requiresAuth: true },
    },
    {
        id: "ratings",
        href: "/seller/ratings",
        translationKey: "nav.ratings",
        icon: RatingsNavIcon,
        rules: { roles: ["seller"], requiresAuth: true },
    },
    {
        id: "list",
        href: "/seller/list",
        translationKey: "nav.list",
        icon: ListNavIcon,
        rules: { roles: ["seller"], requiresAuth: true },
    },
];

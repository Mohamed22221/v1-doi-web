/**
 * Centralized route constants for the application.
 * Use these constants instead of hardcoded strings for hrefs and links.
 */
export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    SELLER: "/seller",
  },
  AUTH: {
    LOGIN: "/auth/login",
    LOGIN_PASSWORD: "/auth/login-password",
    REGISTER: "/auth/register",
    REGISTER_SUCCESS: "/auth/register-success",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    RESET_PASSWORD_SUCCESS: "/auth/reset-password-success",
    VERIFY_OTP: "/auth/verify-otp",
    SELLER: {
      START: "/seller/start",
      VERIFY: "/seller/verify",
      PAYMENT: "/seller/payment",
      PENDING: "/seller/pending",
      SUCCESS: "/seller/success",
      REJECTED: "/seller/rejected",
    },
  },
  NOTIFICATIONS: "/notifications",
  CART: "/cart",
  DASHBOARD: {
    BUYER: {
      ROOT: "/dashboard/buyer",
      SEARCH: "/dashboard/buyer/search",
      SELL: "/dashboard/buyer/pidding",
      PIDDING: "/dashboard/buyer/pidding",
      LIST: "/dashboard/buyer/list",
      PROFILE: "/buyer/profile",
    },
    SELLER: {
      ROOT: "/dashboard/seller",
      PRODUCTS: "/dashboard/seller/products",
      BUY: "/dashboard/seller/buy",
      RATINGS: "/dashboard/seller/ratings",
      LIST: "/dashboard/seller/list",
      PROFILE: "/seller/profile",
    },
  },
} as const;

export const AUTH_ALL = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.LOGIN_PASSWORD,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.REGISTER_SUCCESS,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD_SUCCESS,
  ROUTES.AUTH.VERIFY_OTP,
];

export const AUTH_SELLER = [
  ROUTES.AUTH.SELLER.START,
  ROUTES.AUTH.SELLER.VERIFY,
  ROUTES.AUTH.SELLER.PAYMENT,
  ROUTES.AUTH.SELLER.PENDING,
  ROUTES.AUTH.SELLER.SUCCESS,
  ROUTES.AUTH.SELLER.REJECTED,
];
export const PROTECTED_SELLER = [
  ROUTES.DASHBOARD.SELLER.ROOT,
  ROUTES.DASHBOARD.SELLER.PRODUCTS,
  ROUTES.DASHBOARD.SELLER.BUY,
  ROUTES.DASHBOARD.SELLER.RATINGS,
  ROUTES.DASHBOARD.SELLER.LIST,
  ROUTES.DASHBOARD.SELLER.PROFILE,
];

export const PROTECTED_BUYER = [
  ROUTES.DASHBOARD.BUYER.ROOT,
  ROUTES.DASHBOARD.BUYER.SEARCH,
  ROUTES.DASHBOARD.BUYER.SELL,
  ROUTES.DASHBOARD.BUYER.PIDDING,
  ROUTES.DASHBOARD.BUYER.LIST,
  ROUTES.DASHBOARD.BUYER.PROFILE,
];

/**
 * Exported type for Next.js internal route validation and typed routes.
 * DO NOT RENAME THIS TYPE as it is expected by the build process.
 */
export type AppRoutes = typeof ROUTES;

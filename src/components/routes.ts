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

export type AppRoutes = typeof ROUTES;

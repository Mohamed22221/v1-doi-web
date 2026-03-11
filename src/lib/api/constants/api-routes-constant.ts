const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    VERIFY_OTP: "/buyer/verify-otp",
    RESEND_OTP: "/buyer/resend-otp",
    FORGOT_PASSWORD: "/buyer/forgot-password",
    CHANGE_PASSWORD: "/buyer/change-password",
    RESET_PASSWORD: "/buyer/reset-password",
    LOGOUT: "/buyer/logout",
    REGISTER_SUCCESS: "/buyer/register-success",
    RESET_PASSWORD_SUCCESS: "/buyer/reset-password-success",
  },
  BUYER: {
    HOME: "/",
    DASH_HOME: "/dashboard/buyer",
  },
} as const;

export default API_ROUTES;

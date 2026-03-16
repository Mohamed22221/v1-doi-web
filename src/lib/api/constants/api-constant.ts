export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_FORGOT_OTP: "/auth/verify-forgot-otp",
    RESET_PASSWORD: "/auth/reset-password",
  },
  STORAGE: {
    UPLOAD: "/storage/uploads",
  },
} as const;

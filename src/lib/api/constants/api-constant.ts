import { API_BASE_URL, ENV } from "@/config/env";

export { API_BASE_URL };

export const TOKEN_TYPE = "Bearer";

export const TOKEN_KEYS = {
  ACCESS: ENV.ACCESS_TOKEN_KEY,
  REFRESH: ENV.REFRESH_TOKEN_KEY,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
} as const;

/**
 * Environment variables centralization.
 * Next.js note: Variables prefixed with NEXT_PUBLIC_ are available on the client.
 * Using default values from the provided .env logic.
 */

export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "https://doueh.com/api",
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || process.env.VITE_API_VERSION || "v1",
  ACCESS_TOKEN_KEY:
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || process.env.VITE_ACCESS_TOKEN_KEY || "access_token",
  REFRESH_TOKEN_KEY:
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY ||
    process.env.VITE_REFRESH_TOKEN_KEY ||
    "refresh_token",
} as const;

export const API_BASE_URL = `${ENV.API_URL}/${ENV.API_VERSION}`;

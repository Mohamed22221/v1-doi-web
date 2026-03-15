/**
 * Environment variables centralization.
 * Next.js note: Variables prefixed with NEXT_PUBLIC_ are available on the client.
 * Using default values from the provided .env logic.
 */

export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || "",
  ACCESS_TOKEN_KEY: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || "",
  REFRESH_TOKEN_KEY: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "",
  TOKEN_TYPE: process.env.NEXT_PUBLIC_TOKEN_TYPE || "",
} as const;

export const API_BASE_URL = `${ENV.API_URL}/${ENV.API_VERSION}`;

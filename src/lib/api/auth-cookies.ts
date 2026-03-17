import { cookies } from "next/headers";
import { ENV } from "@/config/env";
import { decodeUserToken } from "@/lib/utils/jwt";

const IS_PROD = process.env.NODE_ENV === "production";
const REFRESH_MAX_AGE_FALLBACK = 60 * 60 * 24 * 30; // 30 days

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  role: string,
  accountStatus: string,
) {
  const cookieStore = await cookies();

  // 1. Decode tokens to get real exp
  const accessPayload = decodeUserToken(accessToken);
  const refreshPayload = decodeUserToken(refreshToken);

  const now = Math.floor(Date.now() / 1000);

  // 2. Calculate MaxAge (seconds)
  const accessMaxAge = accessPayload?.exp ? Math.max(accessPayload.exp - now, 0) : 60 * 15;
  const refreshMaxAge = refreshPayload?.exp
    ? Math.max(refreshPayload.exp - now, 0)
    : REFRESH_MAX_AGE_FALLBACK;

  const shared = {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax" as const,
    path: "/",
  };

  cookieStore.set(ENV.ACCESS_TOKEN_KEY, accessToken, {
    ...shared,
    maxAge: accessMaxAge,
  });
  cookieStore.set(ENV.REFRESH_TOKEN_KEY, refreshToken, {
    ...shared,
    maxAge: refreshMaxAge,
  });
  cookieStore.set("user_role", role, {
    ...shared,
    maxAge: refreshMaxAge,
  });
  cookieStore.set("account_status", accountStatus, {
    ...shared,
    maxAge: refreshMaxAge,
  });
}

export async function updateAccountStatus(accountStatus: string) {
  const cookieStore = await cookies();
  const refreshKey = ENV.REFRESH_TOKEN_KEY || "refresh_token";
  const refreshToken = cookieStore.get(refreshKey);

  // Use the expiry of the refresh token if available, otherwise default to 30d
  const maxAge = refreshToken ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 30;

  cookieStore.set("account_status", accountStatus, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ENV.ACCESS_TOKEN_KEY);
  cookieStore.delete(ENV.REFRESH_TOKEN_KEY);
  cookieStore.delete("user_role");
  cookieStore.delete("account_status");
}

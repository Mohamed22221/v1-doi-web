import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ENV } from "./config/env";
import { cookieName, getLocaleFromPath, detectLocale } from "./lib/i18n/config";
import { decodeUserToken } from "./lib/utils/jwt";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Extract the current locale from the URL
  let locale = getLocaleFromPath(pathname);

  if (!locale) {
    // 2. If the locale in the URL is invalid, detect it (from cookies or browser)
    locale = detectLocale(request.cookies, request.headers.get("accept-language"));

    // Remove any invalid locale-like prefix to prevent duplication (e.g. /it/ or /ens/)
    let cleanPath = pathname;
    const invalidLocaleMatch = pathname.match(/^\/[a-zA-Z]{2,3}(?:\/|$)/);
    if (invalidLocaleMatch) {
      cleanPath = pathname.replace(invalidLocaleMatch[0], "/");
    }

    if (!cleanPath.startsWith("/")) {
      cleanPath = `/${cleanPath}`;
    }

    const newPath = cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;

    const response = NextResponse.redirect(new URL(`${newPath}${search}`, request.url));

    response.cookies.set(cookieName, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // 4. If the locale exists in the URL, ensure cookies are synchronized
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-language", locale);

  // 5. Lightweight Token Expiry Detection (Background Refresh Signal)
  handleTokenRotation(request, requestHeaders);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale !== locale) {
    response.cookies.set(cookieName, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }

  // Set header on the response as well, making it accessible on the client if needed
  response.headers.set("x-language", locale);

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internal paths and static files
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

function handleTokenRotation(request: NextRequest, headers: Headers) {
  const accessKey = ENV.ACCESS_TOKEN_KEY || "access_token";
  const refreshKey = ENV.REFRESH_TOKEN_KEY || "refresh_token";

  const accessToken = request.cookies.get(accessKey)?.value;
  const refreshToken = request.cookies.get(refreshKey)?.value;

  if (!refreshToken) return;

  if (!accessToken) {
    headers.set("x-should-refresh", "true");
    return;
  }

  const payload = decodeUserToken(accessToken);
  if (!payload || !payload.exp) return;

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = payload.exp - now;

  if (timeUntilExpiry < 300) {
    headers.set("x-should-refresh", "true");
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ENV } from "./config/env";
import { cookieName, getLocaleFromPath, detectLocale } from "./lib/i18n/config";
import { decodeUserToken } from "./lib/utils/jwt";

export async function proxy(request: NextRequest) {
  const { pathname, search: _search } = request.nextUrl;

  // 1. Extract the current locale from the URL
  const locale = getLocaleFromPath(pathname);

  // 2. Handle missing locale with redirection
  if (!locale) {
    return handleMissingLocale(request);
  }

  // 3. Prepare headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-language", locale);

  // 4. Lightweight Token Expiry Detection
  handleTokenRotation(request, requestHeaders);

  // 5. Account Status RBAC Guards
  const guardRedirect = handleAccountStatusGuards(request, pathname, locale);
  if (guardRedirect) return guardRedirect;

  // 6. Proceed with next response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 7. Synchronize locale cookie if needed
  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale !== locale) {
    response.cookies.set(cookieName, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }

  // Set header on the response as well
  response.headers.set("x-language", locale);

  return response;
}

/**
 * Handles redirection when locale is missing from the pathname.
 */
function handleMissingLocale(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const locale = detectLocale(request.cookies, request.headers.get("accept-language"));

  // Clean path from invalid locale prefixes
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

/**
 * Enforces RBAC rules based on the account_status cookie.
 */
function handleAccountStatusGuards(request: NextRequest, pathname: string, locale: string) {
  const accountStatus = request.cookies.get("account_status")?.value;
  const isSellerDashboard = pathname.includes("/dashboard/seller");
  const isSellerOnboarding = pathname.includes("/seller") && !pathname.endsWith("/seller");

  if (!isSellerDashboard && !isSellerOnboarding) return null;

  // Rule: seller-approved in onboarding flow is forced to /seller/success
  if (accountStatus === "seller-approved") {
    if (isSellerOnboarding && !pathname.includes("/seller/success")) {
      return NextResponse.redirect(new URL(`/${locale}/seller/success`, request.url));
    }
  }

  // Rule: seller-rejected can access onboarding but NOT dashboard
  if (accountStatus === "seller-rejected") {
    if (isSellerDashboard) {
      return NextResponse.redirect(new URL(`/${locale}/seller/rejected`, request.url));
    }
  }

  // Rule: seller-pending can access onboarding but not dashboard
  if (accountStatus === "seller-pending") {
    if (isSellerDashboard) {
      return NextResponse.redirect(new URL(`/${locale}/seller/pending`, request.url));
    }
  }

  // Rule: buyer-approved cannot access dashboard
  if (accountStatus === "buyer-approved") {
    if (isSellerDashboard) {
      return NextResponse.redirect(new URL(`/${locale}/seller`, request.url));
    }
  }

  return null;
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

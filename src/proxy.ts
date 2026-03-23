import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ENV } from "./config/env";
import { cookieName, getLocaleFromPath, detectLocale } from "./lib/i18n/config";
import { ROUTES, AUTH_ALL, AUTH_SELLER, PROTECTED_SELLER } from "@/config/routes";
import { decodeUserToken } from "./lib/utils/jwt";
import { performRefresh } from "./lib/api/refresh-token";

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

  // 4. Lightweight Token Expiry Detection & Rotation
  const rotationResponse = await handleTokenRotation(request, requestHeaders);
  if (rotationResponse) return rotationResponse;

  // 5. Auth Guards (Protected Routes)
  const authRedirect = handleAuthGuards(request, pathname, locale);
  if (authRedirect) return authRedirect;

  // 6. Account Status RBAC Guards
  const guardRedirect = handleAccountStatusGuards(request, pathname, locale);
  if (guardRedirect) return guardRedirect;

  // 7. Proceed with next response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 8. Handle Token Updates from rotation
  const newAccessToken = requestHeaders.get("x-refresh-access-token");
  const newRefreshToken = requestHeaders.get("x-refresh-refresh-token");

  if (newAccessToken && newRefreshToken) {
    const payload = decodeUserToken(newAccessToken);

    // 1. Determine role: payload -> existing cookie -> default
    const existingRole = request.cookies.get("user_role")?.value;
    const role = payload?.role || existingRole || "buyer";

    // 2. Determine account status: existing cookie -> default
    // We preserve the existing status as we can't easily re-verify in middleware
    const accountStatus = request.cookies.get("account_status")?.value || "buyer-approved";

    const IS_PROD = process.env.NODE_ENV === "production";
    const shared = {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax" as const,
      path: "/",
    };

    // Calculate MaxAge
    const now = Math.floor(Date.now() / 1000);
    const accessExp = payload?.exp ? Math.max(payload.exp - now, 0) : 60 * 15;

    // Use 30 days for refresh-related cookies
    const refreshMaxAge = 60 * 60 * 24 * 30;

    response.cookies.set(ENV.ACCESS_TOKEN_KEY, newAccessToken, { ...shared, maxAge: accessExp });
    response.cookies.set(ENV.REFRESH_TOKEN_KEY, newRefreshToken, {
      ...shared,
      maxAge: refreshMaxAge,
    });
    response.cookies.set("user_role", role, { ...shared, maxAge: refreshMaxAge });
    response.cookies.set("account_status", accountStatus, { ...shared, maxAge: refreshMaxAge });

    // Clean up internal headers
    response.headers.delete("x-refresh-access-token");
    response.headers.delete("x-refresh-refresh-token");
  }

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
 * Enforces authentication for protected routes.
 */
function handleAuthGuards(request: NextRequest, pathname: string, locale: string) {
  const refreshKey = ENV.REFRESH_TOKEN_KEY || "refresh_token";
  const accessKey = ENV.ACCESS_TOKEN_KEY || "access_token";

  const isLoggedIn =
    !!request.cookies.get(refreshKey)?.value || !!request.cookies.get(accessKey)?.value;
  const accountStatus = request.cookies.get("account_status")?.value;

  // Get path without locale prefix for matching
  const cleanPath = pathname.replace(new RegExp(`^/${locale}`), "");

  // Check if current path starts with any restricted route
  const isAuthAllRoute = AUTH_ALL.some((route) => cleanPath.startsWith(route));
  const isAuthSellerRoute = AUTH_SELLER.some((route) => cleanPath.startsWith(route));
  const isProtectedSellerRoute = PROTECTED_SELLER.some((route) => cleanPath.startsWith(route));
  // const isPublicSellerLanding = cleanPath.startsWith(ROUTES.PUBLIC.SELLER);

  // Case 1: Logged in users trying to access login/register pages
  if (isLoggedIn && isAuthAllRoute) {
    // Specific redirect for approved buyers
    if (
      accountStatus === "buyer-approved" ||
      accountStatus === "seller-rejected" ||
      accountStatus === "seller-pending"
    ) {
      return NextResponse.redirect(
        new URL(`/${locale}${ROUTES.DASHBOARD.BUYER.ROOT}`, request.url),
      );
    }
    // // Specific redirect for approved sellers
    if (accountStatus === "seller-approved") {
      return NextResponse.redirect(
        new URL(`/${locale}${ROUTES.DASHBOARD.SELLER.ROOT}`, request.url),
      );
    }
    return NextResponse.redirect(new URL(`/${locale}${ROUTES.PUBLIC.HOME}`, request.url));
  }

  // // Case 2: Approved sellers trying to access the public seller landing page
  // if (isLoggedIn && accountStatus === "seller-approved" && isPublicSellerLanding) {
  //   return NextResponse.redirect(new URL(`/${locale}${ROUTES.DASHBOARD.SELLER.ROOT}`, request.url));
  // }

  // Case 3: Logged out users trying to access protected seller routes
  if (!isLoggedIn && (isAuthSellerRoute || isProtectedSellerRoute)) {
    return NextResponse.redirect(new URL(`/${locale}${ROUTES.AUTH.LOGIN}`, request.url));
  }

  return null;
}

/**
 * Enforces RBAC rules based on the account_status cookie.
 */
function handleAccountStatusGuards(request: NextRequest, pathname: string, locale: string) {
  const accountStatus = request.cookies.get("account_status")?.value;

  // Get path without locale prefix for matching against our route constants
  const cleanPath = pathname.replace(new RegExp(`^/${locale}`), "");

  const isSellerDashboard = cleanPath.startsWith(ROUTES.DASHBOARD.SELLER.ROOT);
  const isSellerOnboarding = AUTH_SELLER.some((route) => cleanPath.startsWith(route));

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

  // Rule: seller-pending must be on the pending page
  if (accountStatus === "seller-pending") {
    if (!pathname.includes(ROUTES.AUTH.SELLER.PENDING)) {
      return NextResponse.redirect(new URL(`/${locale}${ROUTES.AUTH.SELLER.PENDING}`, request.url));
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

async function handleTokenRotation(request: NextRequest, headers: Headers) {
  const accessKey = ENV.ACCESS_TOKEN_KEY || "access_token";
  const refreshKey = ENV.REFRESH_TOKEN_KEY || "refresh_token";

  const accessToken = request.cookies.get(accessKey)?.value;
  const refreshToken = request.cookies.get(refreshKey)?.value;

  if (!refreshToken) return null;

  let shouldRefresh = false;

  if (!accessToken) {
    shouldRefresh = true;
  } else {
    const payload = decodeUserToken(accessToken);
    if (!payload || !payload.exp) {
      shouldRefresh = true;
    } else {
      const now = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - now;
      if (timeUntilExpiry < 300) {
        shouldRefresh = true;
      }
    }
  }

  if (shouldRefresh) {
    const data = await performRefresh(refreshToken);
    if (data?.access_token) {
      const newAccessToken = data.access_token;
      const newRefreshToken = data.refresh_token;

      // Update request headers for the current request
      headers.set("Authorization", `${ENV.TOKEN_TYPE} ${newAccessToken}`);

      // We need to return the new tokens in cookies, but since we are in middleware
      // and want to proceed to the next response, we have a few options.
      // The most reliable way for middleware to set cookies and proceed is to
      // let the standard flow continue and attach cookies to the FINAL response.
      // However, handleTokenRotation is called early.

      // Let's add a custom header that we can pick up at the end of proxy()
      // to set the cookies on the response.
      headers.set("x-refresh-access-token", newAccessToken);
      headers.set("x-refresh-refresh-token", newRefreshToken);
    }
  }

  return null;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, cookieName, isValidLocale } from "./lib/i18n/config";
import type { Locale } from "./lib/i18n/config";
import { API_ENDPOINTS } from "./lib/api/constants";
import { isTokenExpired } from "./lib/utils/jwt";
import { ROUTES, AUTH_ALL, AUTH_SELLER, PROTECTED_SELLER } from "@components/routes";
import { API_BASE_URL, ENV } from "./config/env";

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale as Locale;
  return defaultLocale;
}

function clearAuth(
  request: NextRequest,
  response: NextResponse = NextResponse.next(),
): NextResponse {
  response.cookies.delete(ENV.ACCESS_TOKEN_KEY);
  response.cookies.delete(ENV.REFRESH_TOKEN_KEY);
  response.cookies.delete("user_role");
  return response;
}

function clearAuthAndRedirect(request: NextRequest, url: string): NextResponse {
  const response = NextResponse.redirect(new URL(url, request.url));
  return clearAuth(request, response);
}

async function tryRefreshToken(
  request: NextRequest,
  refreshToken: string,
  redirectPath: string,
  shouldRedirect: boolean,
): Promise<NextResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!res.ok) {
      return shouldRedirect ? clearAuthAndRedirect(request, redirectPath) : clearAuth(request);
    }

    const json = await res.json();
    const access_token = json.data?.access_token || json.access_token;

    if (!access_token)
      return shouldRedirect ? clearAuthAndRedirect(request, redirectPath) : clearAuth(request);

    const nextRes = NextResponse.next();
    nextRes.cookies.set(ENV.ACCESS_TOKEN_KEY, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });
    return nextRes;
  } catch {
    return shouldRedirect ? clearAuthAndRedirect(request, redirectPath) : clearAuth(request);
  }
}

// ─── RBAC Logic ────────────────────────────────────────────────────────────

function handleRBAC(
  request: NextRequest,
  pathWithoutLocale: string,
  locale: Locale,
  userRole: string,
  isDashboardRoute: boolean,
  finalRes: NextResponse,
): NextResponse | null {
  const isSellerRole = userRole === "Individual Seller" || userRole === "Business Seller";
  const isBuyerRole = userRole === "Buyer";

  if (!isSellerRole && !isBuyerRole) {
    return isDashboardRoute
      ? clearAuthAndRedirect(request, `/${locale}${ROUTES.AUTH.LOGIN}`)
      : clearAuth(request, finalRes);
  }

  const path = pathWithoutLocale as RoutePath;

  // Buyer Logic: Blocked from PROTECTED_SELLER
  if (isBuyerRole && (PROTECTED_SELLER as readonly string[]).includes(path)) {
    return NextResponse.redirect(new URL(`/${locale}${ROUTES.DASHBOARD.BUYER.ROOT}`, request.url));
  }

  // Seller Logic: Blocked from AUTH_SELLER and PUBLIC.SELLER
  const isSellerLandingPage = path === ROUTES.PUBLIC.SELLER || path === `${ROUTES.PUBLIC.SELLER}/`;
  if (isSellerRole && ((AUTH_SELLER as readonly string[]).includes(path) || isSellerLandingPage)) {
    return NextResponse.redirect(new URL(`/${locale}${ROUTES.DASHBOARD.SELLER.ROOT}`, request.url));
  }

  return null;
}

// ─── Main Proxy Function (Optimized & One-Stop Redirect) ────────────────

function handleAuthenticatedAuthRoute(
  request: NextRequest,
  locale: Locale,
  userRole: string | undefined,
  pathWithoutLocale: string,
  loginUrl: string,
): NextResponse {
  if (!userRole) return clearAuthAndRedirect(request, loginUrl);

  const isSellerRole = userRole === "Individual Seller" || userRole === "Business Seller";
  const isBuyerRole = userRole === "Buyer";
  const path = pathWithoutLocale as RoutePath;

  // Block both roles from general Auth routes (Login, Register, etc.)
  if ((AUTH_ALL as readonly string[]).includes(path)) {
    if (isSellerRole) {
      return NextResponse.redirect(
        new URL(`/${locale}${ROUTES.DASHBOARD.SELLER.ROOT}`, request.url),
      );
    }
    if (isBuyerRole) {
      return NextResponse.redirect(
        new URL(`/${locale}${ROUTES.DASHBOARD.BUYER.ROOT}`, request.url),
      );
    }
  }

  // For other auth routes (like AUTH_SELLER), let handleRBAC decide if it's not a general auth route
  return NextResponse.next();
}

async function handleTokenRefresh(
  request: NextRequest,
  refreshToken: string,
  loginUrl: string,
  isDashboardRoute: boolean,
): Promise<{
  finalRes: NextResponse;
  accessToken: string | undefined;
  isExpired: boolean;
  redirect?: true;
}> {
  const refreshRes = await tryRefreshToken(request, refreshToken, loginUrl, isDashboardRoute);

  if (refreshRes.status >= 300 && refreshRes.status < 400) {
    if (isDashboardRoute)
      return { finalRes: refreshRes, accessToken: undefined, isExpired: true, redirect: true };
    return { finalRes: refreshRes, accessToken: undefined, isExpired: true };
  }

  const newAccessToken = refreshRes.cookies.get(ENV.ACCESS_TOKEN_KEY)?.value;
  return { finalRes: refreshRes, accessToken: newAccessToken, isExpired: false };
}

// ─── Main Proxy Function (Optimized & One-Stop Redirect) ────────────────

// Define common type for paths to avoid repeating 'any'
type RoutePath = string;

function handleUnauthenticatedGuard(
  isDashboardRoute: boolean,
  loginUrl: string,
  request: NextRequest,
  finalRes: NextResponse,
): NextResponse {
  if (isDashboardRoute) {
    return clearAuthAndRedirect(request, loginUrl);
  }
  // Allow guest access to /seller and /seller/start (if guest)
  return finalRes;
}

// ─── Main Proxy Function (Optimized & One-Stop Redirect) ────────────────

async function initializeAuthState(
  request: NextRequest,
  isDashboardRoute: boolean,
  loginUrl: string,
): Promise<{
  finalRes: NextResponse;
  authState: { accessToken?: string; refreshToken?: string; userRole?: string };
  isExpired: boolean;
  redirectRes?: NextResponse;
}> {
  const authState = {
    accessToken: request.cookies.get(ENV.ACCESS_TOKEN_KEY)?.value,
    refreshToken: request.cookies.get(ENV.REFRESH_TOKEN_KEY)?.value,
    userRole: request.cookies.get("user_role")?.value,
  };

  let isExpired = authState.accessToken ? isTokenExpired(authState.accessToken) : true;
  let finalRes = NextResponse.next();

  if (isExpired && authState.refreshToken) {
    const refreshResult = await handleTokenRefresh(
      request,
      authState.refreshToken,
      loginUrl,
      isDashboardRoute,
    );
    if (refreshResult.redirect)
      return {
        finalRes: refreshResult.finalRes,
        authState,
        isExpired,
        redirectRes: refreshResult.finalRes,
      };

    finalRes = refreshResult.finalRes;
    authState.accessToken = refreshResult.accessToken;
    isExpired = refreshResult.isExpired;
  }

  return { finalRes, authState, isExpired };
}

// ─── Main Proxy Function (Optimized & One-Stop Redirect) ────────────────

async function handleSessionAndRBAC(
  request: NextRequest,
  locale: Locale,
  pathWithoutLocale: string,
  isDashboardRoute: boolean,
  isAuthRoute: boolean,
): Promise<NextResponse> {
  const path = pathWithoutLocale as RoutePath;
  const loginUrl = `/${locale}${ROUTES.AUTH.LOGIN}`;

  const init = await initializeAuthState(request, isDashboardRoute, loginUrl);
  if (init.redirectRes) return init.redirectRes;

  const { finalRes, authState, isExpired } = init;
  const isAuthenticated = !!authState.accessToken && !isExpired;
  const userRole = authState.userRole;

  if (isAuthRoute) {
    if (isAuthenticated) {
      const authRedirect = handleAuthenticatedAuthRoute(request, locale, userRole, path, loginUrl);
      if (authRedirect.status >= 300 && authRedirect.status < 400) return authRedirect;
    } else {
      return finalRes;
    }
  }

  // 6. Unauthenticated Guard
  if (!isAuthenticated) {
    return handleUnauthenticatedGuard(isDashboardRoute, loginUrl, request, finalRes);
  }

  // 7. RBAC One-Stop Logic
  if (!userRole) {
    return isDashboardRoute ? clearAuthAndRedirect(request, loginUrl) : finalRes;
  }

  const rbacRedirect = handleRBAC(request, path, locale, userRole, isDashboardRoute, finalRes);
  if (rbacRedirect) {
    return rbacRedirect;
  }

  // 8. Inject refreshed token header if applicable
  if (authState.accessToken) {
    finalRes.headers.set("x-access-token", authState.accessToken);
  }

  return finalRes;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Locale Extraction (بسيطة ومباشرة)
  let locale: Locale;
  const pathLocaleMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);

  if (pathLocaleMatch && isValidLocale(pathLocaleMatch[1])) {
    locale = pathLocaleMatch[1] as Locale;
  } else {
    // If no valid locale in URL, detect it and redirect immediately
    locale = detectLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, request.url));
  }

  // 2. Extract Route Info
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const path = pathWithoutLocale as string;
  const isDashboardRoute = pathWithoutLocale.startsWith("/dashboard");
  const isSellerLandingPage =
    path === ROUTES.PUBLIC.SELLER || path === `${locale}${ROUTES.PUBLIC.SELLER}`;
  const isSellerAuthPage = (AUTH_SELLER as readonly string[]).includes(path);
  const isAuthRoute = pathWithoutLocale.startsWith("/auth") || isSellerAuthPage;

  const requiresAuthContext =
    isDashboardRoute || isSellerAuthPage || isSellerLandingPage || isAuthRoute;
  if (!requiresAuthContext) {
    return NextResponse.next();
  }

  return handleSessionAndRBAC(request, locale, pathWithoutLocale, isDashboardRoute, isAuthRoute);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en|fr|de|es|tr|fa|ur)/dashboard/:path*",
    "/(ar|en|fr|de|es|tr|fa|ur)/seller/:path*",
    "/(ar|en|fr|de|es|tr|fa|ur)/auth/:path*",
    "/dashboard/:path*",
    "/seller/:path*",
    "/auth/:path*",
  ],
};

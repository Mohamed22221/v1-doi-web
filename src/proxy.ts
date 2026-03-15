import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, cookieName, isValidLocale } from "./lib/i18n/config";
import type { Locale } from "./lib/i18n/config";
import { API_BASE_URL, API_ENDPOINTS } from "./lib/api/constants";
import { TOKEN_KEYS } from "./lib/api/constants/api-constant";
import { isTokenExpired } from "./lib/utils/jwt";
import { ROUTES } from "@components/routes";

// ─── Helpers ──────────────────────────────────────────────────────────────

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    const best = acceptLanguage
      .split(",")
      .map((part) => {
        const [lang, quality] = part.split(";q=");
        return {
          code: lang.split("-")[0].trim().toLowerCase(),
          priority: quality ? parseFloat(quality) : 1.0,
        };
      })
      .sort((a, b) => b.priority - a.priority)
      .find((l) => isValidLocale(l.code));

    if (best) return best.code as Locale;
  }

  return defaultLocale;
}

async function tryRefreshToken(
  request: NextRequest,
  refreshToken: string,
  _locale: Locale,
  redirectPath: string,
  shouldRedirectOnFailure: boolean = true,
): Promise<NextResponse> {
  const refreshUrl = `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`;

  try {
    const res = await fetch(refreshUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!res.ok) {
      // If protected route, redirect. Otherwise, clear cookies and continue.
      let response: NextResponse;
      if (shouldRedirectOnFailure) {
        response = NextResponse.redirect(new URL(redirectPath, request.url));
      } else {
        response = NextResponse.next();
      }

      response.cookies.delete(TOKEN_KEYS.ACCESS);
      response.cookies.delete(TOKEN_KEYS.REFRESH);
      return response;
    }

    const json = await res.json();

    // Support both flat response and wrapped response
    const access_token = json.data?.access_token || json.access_token;

    if (!access_token) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    const nextRes = NextResponse.next();

    // Set the new access token in cookies
    nextRes.cookies.set(TOKEN_KEYS.ACCESS, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 min
    });

    // Pass the new token to Server Components
    nextRes.headers.set("x-access-token", access_token);
    return nextRes;
  } catch (_error) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
}

// ─── Main Middleware ───────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const locale = detectLocale(request);

  // 1. Locale handling — Redirect if no locale prefix
  const pathnameHasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );

  if (!pathnameHasLocale) {
    const redirectUrl = new URL(`/${locale}${pathname}${search}`, request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Persist locale manually if not already set
    if (!request.cookies.get(cookieName)) {
      response.cookies.set(cookieName, locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
        sameSite: "lax",
      });
    }
    return response;
  }

  // 2. Global Token Check & Refresh
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
  const isDashboardRoute =
    pathWithoutLocale.startsWith(ROUTES.DASHBOARD.BUYER.ROOT) ||
    pathWithoutLocale.startsWith(ROUTES.DASHBOARD.SELLER.ROOT);

  const accessToken = request.cookies.get(TOKEN_KEYS.ACCESS)?.value;
  const refreshToken = request.cookies.get(TOKEN_KEYS.REFRESH)?.value;
  const isExpired = accessToken ? isTokenExpired(accessToken) : true;

  const isSeller = pathWithoutLocale.startsWith(ROUTES.DASHBOARD.SELLER.ROOT);
  const loginPath = isSeller
    ? `/${locale}${ROUTES.AUTH.SELLER.START}`
    : `/${locale}${ROUTES.AUTH.LOGIN}`;

  if (isExpired && refreshToken) {
    return tryRefreshToken(request, refreshToken, locale, loginPath, isDashboardRoute);
  }

  // ── Auth Protection — Handling /dashboard routes specifically ───────────
  if (isDashboardRoute) {
    // No credentials at all or refresh failed/expired previously
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    // We have a valid access token
    if (accessToken && !isExpired) {
      const response = NextResponse.next();
      response.headers.set("x-access-token", accessToken);
      return response;
    }
  } else if (accessToken && !isExpired) {
    // Inject x-access-token for public pages too if available
    const response = NextResponse.next();
    response.headers.set("x-access-token", accessToken);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webm)$).*)",
  ],
};

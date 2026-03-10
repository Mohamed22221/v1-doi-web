import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, cookieName, isValidLocale } from "./lib/i18n/config";
import type { Locale } from "./lib/i18n/config";
import { API_ENDPOINTS } from "./lib/api/constants";
import { TOKEN_KEYS } from "./lib/api/constants/api-constant";

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
  locale: Locale,
  redirectPath: string,
): Promise<NextResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://doueh.com/api/v1";

  try {
    const res = await fetch(`${apiUrl}${API_ENDPOINTS.AUTH.REFRESH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      const response = NextResponse.redirect(new URL(redirectPath, request.url));
      response.cookies.delete(TOKEN_KEYS.ACCESS);
      response.cookies.delete(TOKEN_KEYS.REFRESH);
      return response;
    }

    const data = (await res.json()) as { access_token: string };
    const nextRes = NextResponse.next();

    // Set the new access token in cookies for the browser
    nextRes.cookies.set(TOKEN_KEYS.ACCESS, data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 min
    });

    // Pass the new token to Server Components via header
    nextRes.headers.set("x-access-token", data.access_token);
    return nextRes;
  } catch {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
}

// ─── Main Middleware ───────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
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

  // 2. Auth Protection — Handling /dashboard routes
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
  const isDashboardRoute = pathWithoutLocale.startsWith("/dashboard");

  if (isDashboardRoute) {
    const accessToken = request.cookies.get(TOKEN_KEYS.ACCESS)?.value;
    const refreshToken = request.cookies.get(TOKEN_KEYS.REFRESH)?.value;

    const isSeller = pathWithoutLocale.startsWith("/dashboard/seller");
    const loginPath = isSeller ? `/${locale}/seller/start` : `/${locale}/buyer/login`;

    // ── Case A: No credentials at all ───────────────────────────────────────
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    }

    // ── Case B: Access token expired but we have a refresh token ─────────────
    if (!accessToken && refreshToken) {
      return tryRefreshToken(request, refreshToken, locale, loginPath);
    }

    // ── Case C: We have an access token ──────────────────────────────────────
    // If we have an access token, we let them pass.
    // We also set a custom header so Server Components can access the token
    // without reading cookies again if they want (optional optimization).
    if (accessToken) {
      const response = NextResponse.next();
      response.headers.set("x-access-token", accessToken);
      return response;
    }
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

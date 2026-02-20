import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, cookieName, isValidLocale } from "./lib/i18n/config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from:
  // 1. Cookie (user choice)
  // 2. Accept-Language header (browser/mobile)
  // 3. Fallback to default

  let locale = defaultLocale;

  // Check cookie first
  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Check Accept-Language header
    const acceptLanguage = request.headers.get("Accept-Language");
    if (acceptLanguage) {
      // Parse Accept-Language header: "en-US,en;q=0.9,ar-EG;q=0.8"
      // Split by comma, then parse each part for lang and quality
      const parsedLanguages = acceptLanguage.split(",").map((part) => {
        const [lang, quality] = part.split(";q=");
        return {
          code: lang.split("-")[0].trim().toLowerCase(),
          priority: quality ? parseFloat(quality) : 1.0,
        };
      });

      // Sort by priority descending
      parsedLanguages.sort((a, b) => b.priority - a.priority);

      // Find first matching supported locale
      for (const langObj of parsedLanguages) {
        if (isValidLocale(langObj.code)) {
          locale = langObj.code;
          break;
        }
      }
    }
  }

  // Redirect to /{locale}{pathname}
  const redirectUrl = new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url);

  const response = NextResponse.redirect(redirectUrl);

  // Set cookie if not already set
  if (!cookieLocale) {
    response.cookies.set(cookieName, locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webm)$).*)",
  ],
};

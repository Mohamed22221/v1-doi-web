import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieName, getLocaleFromPath, detectLocale } from "./lib/i18n/config";

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

    // Build the new correct URL
    const newPath = cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;

    // Redirect
    const response = NextResponse.redirect(new URL(`${newPath}${search}`, request.url));

    // 3. Synchronize cookies
    response.cookies.set(cookieName, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // 4. If the locale exists in the URL, ensure cookies are synchronized
  const response = NextResponse.next();
  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale !== locale) {
    response.cookies.set(cookieName, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internal paths and static files
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

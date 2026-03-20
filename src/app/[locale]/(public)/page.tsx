import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { NavLinks } from "@/components/layout/nav/nav-links";
import { MobileNav } from "@/components/layout/nav/mobile-nav";
import { Header } from "@/components/layout/headers/header";
import { cookies } from "next/headers";
import type { HeaderActionRole } from "@config/header-actions-config";
import { ROUTES } from "@config/routes";
import { ENV } from "@/config/env";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "home",
    pathname: "",
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "common");

  // Detect user status from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ENV.ACCESS_TOKEN_KEY)?.value;
  const role: HeaderActionRole = accessToken ? "buyer-auth" : "guest";

  return (
    <>
      <Header role={role} showDelivery={false} className="md:hidden" locale={locale as Locale} />
      <NavLinks config={role} locale={locale as Locale} />

      <main className="container mx-auto px-4 py-25">
        <h1 className="mb-6 text-2xl font-bold">{t("auth-dashboard.dev-nav")}</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Buyer Auth Links */}
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 border-b pb-2 text-xl font-semibold">
              {t("auth-dashboard.sections.buyer")}
            </h2>
            <Link
              href={`/${locale}${ROUTES.AUTH.LOGIN}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.login-phone")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.LOGIN_PASSWORD}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.login-password")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.REGISTER}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.register")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.REGISTER_SUCCESS}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.reg-success")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.FORGOT_PASSWORD}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.forgot")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.RESET_PASSWORD}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.reset")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.RESET_PASSWORD_SUCCESS}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.reset-success")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.VERIFY_OTP}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.verify")}
            </Link>
          </div>

          {/* Seller Auth Links */}
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 border-b pb-2 text-xl font-semibold">
              {t("auth-dashboard.sections.seller")}
            </h2>
            <Link
              href={`/${locale}${ROUTES.AUTH.SELLER.START}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-start")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.SELLER.VERIFY}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-verify")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.SELLER.PAYMENT}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-payment")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.SELLER.PENDING}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-pending")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.SELLER.SUCCESS}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-success")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.AUTH.SELLER.REJECTED}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-rejected")}
            </Link>
          </div>

          {/* Dashboards & Public Links */}
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 border-b pb-2 text-xl font-semibold">
              {t("auth-dashboard.sections.dashboard")}
            </h2>
            <Link
              href={`/${locale}${ROUTES.PUBLIC.HOME}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.home-public")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.PUBLIC.SELLER}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-public")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.DASHBOARD.BUYER.ROOT}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.buyer-dashboard")}
            </Link>
            <Link
              href={`/${locale}${ROUTES.DASHBOARD.SELLER.ROOT}`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.seller-dashboard")}
            </Link>
          </div>
        </div>
      </main>

      <MobileNav roles={[role]} locale={locale as Locale} />
    </>
  );
}

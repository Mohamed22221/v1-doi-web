import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { NavLinks } from "@/components/layout/nav/nav-links";
import { MobileNav } from "@/components/layout/nav/mobile-nav";
import { Header } from "@/components/layout/headers/header";

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

  return (
    <>
      <Header role="guest" showDelivery={false} className="md:hidden" locale={locale as Locale} />
      <NavLinks config="guest" locale={locale as Locale} />

      <main className="container mx-auto px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">{t("auth-dashboard.dev-nav")}</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Buyer Auth Links */}
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 border-b pb-2 text-xl font-semibold">
              {t("auth-dashboard.sections.buyer")}
            </h2>
            <Link href={`/${locale}/buyer/login`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.login-phone")}
            </Link>
            <Link
              href={`/${locale}/buyer/login-password`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.login-password")}
            </Link>
            <Link href={`/${locale}/buyer/register`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.register")}
            </Link>
            <Link
              href={`/${locale}/buyer/register-success`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.reg-success")}
            </Link>
            <Link
              href={`/${locale}/buyer/forgot-password`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.forgot")}
            </Link>
            <Link
              href={`/${locale}/buyer/reset-password`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.reset")}
            </Link>
            <Link
              href={`/${locale}/buyer/reset-password-success`}
              className="text-primary-500 hover:underline"
            >
              {t("auth-dashboard.links.reset-success")}
            </Link>
            <Link href={`/${locale}/buyer/verify-otp`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.verify")}
            </Link>
          </div>

          {/* Seller Auth Links */}
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 border-b pb-2 text-xl font-semibold">
              {t("auth-dashboard.sections.seller")}
            </h2>
            <Link href={`/${locale}/seller/start`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-start")}
            </Link>
            <Link href={`/${locale}/seller/verify`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-verify")}
            </Link>
            <Link href={`/${locale}/seller/payment`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-payment")}
            </Link>
            <Link href={`/${locale}/seller/pending`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-pending")}
            </Link>
            <Link href={`/${locale}/seller/success`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-success")}
            </Link>
            <Link href={`/${locale}/seller/rejected`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-rejected")}
            </Link>
          </div>

          {/* Dashboards & Public Links */}
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 border-b pb-2 text-xl font-semibold">
              {t("auth-dashboard.sections.dashboard")}
            </h2>
            <Link href={`/${locale}/`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.home-public")}
            </Link>
            <Link href={`/${locale}/seller`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-public")}
            </Link>
            <Link href={`/${locale}/dashboard/buyer`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.buyer-dashboard")}
            </Link>
            <Link href={`/${locale}/dashboard/seller`} className="text-primary-500 hover:underline">
              {t("auth-dashboard.links.seller-dashboard")}
            </Link>
          </div>
        </div>
      </main>

      <MobileNav roles={["guest"]} locale={locale as Locale} />
    </>
  );
}

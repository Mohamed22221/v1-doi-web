import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
// import { getTranslation } from "@/lib/i18n/server";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { NavLinks } from "@/components/layout/nav/nav-links";
import { MobileNav } from "@/components/layout/nav/mobile-nav";
import { Header } from "@/components/layout/headers/header";
import { cookies } from "next/headers";
import type { HeaderActionRole } from "@config/header-actions-config";
import { ENV } from "@/config/env";
import HeroSection from "@/features/home/hero/hero-section";

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
  // const { t } = await getTranslation(locale as Locale, "common");

  // Detect user status from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ENV.ACCESS_TOKEN_KEY)?.value;
  const role: HeaderActionRole = accessToken ? "buyer-auth" : "guest";

  return (
    <>
      <Header role={role} showDelivery={false} className="md:hidden" locale={locale as Locale} />
      <NavLinks config={role} locale={locale as Locale} />
      <div className="pt-21">
        <HeroSection locale={locale as Locale} />
      </div>

      <MobileNav roles={[role]} locale={locale as Locale} />
    </>
  );
}

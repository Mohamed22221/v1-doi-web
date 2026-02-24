import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
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

  return <>
    <Header role="guest" showDelivery={false} className="md:hidden" locale={locale as Locale} />
    <NavLinks config="guest" locale={locale as Locale} />

    <MobileNav roles={["guest"]} locale={locale as Locale} />
  </>;
}

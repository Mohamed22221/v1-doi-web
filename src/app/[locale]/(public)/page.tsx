import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
import { HomeClient } from "@/features/home/components/home-client";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

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

  return <HomeClient locale={locale as Locale} />;
}

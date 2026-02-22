import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    return generateLocalizedMetadata({
        locale: locale as Locale,
        pageKey: "buyer-landing",
        pathname: "/buyer",
    });
}

/**
 * BuyerLandingPage
 *
 * The main entry point for the buyer landing route.
 */
export default async function BuyerLandingPage() {
    return <>BuyerLandingPage</>;
}

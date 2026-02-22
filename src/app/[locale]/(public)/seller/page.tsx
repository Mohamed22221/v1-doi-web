import type { Metadata } from "next";
import { SellerHeader } from "@/features/seller/home/seller-header";
import type { Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    return generateLocalizedMetadata({
        locale: locale as Locale,
        pageKey: "seller-landing",
        pathname: "/seller",
    });
}

/**
 * SellerLandingPage
 *
 * The main entry point for the seller landing route.
 */
export default async function SellerLandingPage({ params }: PageProps) {
    const { locale: rawLocale } = await params;
    const locale = rawLocale as Locale;

    return (
        <>
            <SellerHeader locale={locale} />
        </>
    );
}

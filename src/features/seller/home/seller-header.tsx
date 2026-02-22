import { cacheLife } from "next/cache";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import { PageContainer } from "@/components/template/container/page-container";
import { Button } from "@/components/ui/button";
import { Logo } from "@components/template/nav/logo";

const BackButton = dynamic(() => import("../components/back-button").then((mod) => mod.BackButton), {
    ssr: true,
});

interface SellerHeaderProps {
    locale: Locale;
}

/**
 * SellerHeader
 *
 * Hero section for the Seller Landing Page.
 * Features a background image with a specific gradient overlay and centered content.
 * Cached as a Server Component for optimal performance.
 */
export async function SellerHeader({ locale }: SellerHeaderProps) {
    "use cache";
    cacheLife("days");

    const { t } = await getTranslation(locale, "home");

    return (
        <div className="px-3 md:px-0">
            <section className="relative my-3 flex h-[200px] min-h-[200px] w-full items-end justify-center overflow-hidden rounded-md md:my-0 md:min-h-[100vh] md:rounded-[0rem] md:bg-transparent 3xl:min-h-[80vh]">
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* Hero Image */}
                    <Image
                        src="/img/hero-seller.jpg"
                        alt="Seller Hero Background"
                        fill
                        priority
                        quality={90}
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    {/* Custom Gradient Overlay matching #2A3D5D - Refactored to Tailwind */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-primary-500 dark:to-primary-800" />
                </div>

                {/* Top Navigation Layer (Logo & Back Button) - Hidden on mobile */}
                <div className="absolute top-0 right-0 left-0 z-20 hidden items-start justify-between p-6 md:flex md:p-10">
                    {/* Logo - Centered absolute but placed in flex for layout context if needed */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2">
                        <Logo mode="dark" imgClass="w-[100px] h-[56px] " />
                    </div>

                    {/* Back Button - Top Right (RTL aware) */}
                    <div className="me-auto">
                        <BackButton className="h-[45px] w-[45px]" />
                    </div>
                </div>

                {/* Content */}
                <PageContainer
                    variant="dashboard"
                    className="relative z-10 w-full px-0 pb-4 text-center md:py-24"
                >
                    <div className="mx-auto space-y-4 px-1 md:space-y-10">
                        <div className="space-y-2 md:space-y-5">
                            <h1 className="text-lg leading-[1.2] font-extrabold tracking-tight text-neutral-10 md:text-h1">
                                {t("seller_landing.header.title")}
                            </h1>
                            <p className="mx-auto max-w-3xl text-tag leading-relaxed font-medium text-neutral-100 opacity-90 md:text-h4 md:leading-normal">
                                {t("seller_landing.header.subtitle")}
                            </p>
                        </div>

                        <div className="flex justify-center pt-0 md:pt-1">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="px-8 py-5 text-label font-bold md:px-32 md:py-5 md:text-h5"
                            >
                                {t("seller_landing.header.cta")}
                            </Button>
                        </div>
                    </div>
                </PageContainer>
            </section>
        </div>
    );
}

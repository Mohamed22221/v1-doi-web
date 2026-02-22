import { cacheLife } from "next/cache";
import Image from "next/image";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import { PageContainer } from "@/components/template/container/page-container";
import { Button } from "@/components/ui/button";
import { Logo } from "@components/template/nav/logo";
import { BackButton } from "../components/back-button";

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
            <section className="relative w-full overflow-hidden h-[200px] min-h-[200px] 3xl:min-h-[80vh] md:min-h-[100vh] flex items-end justify-center rounded-md md:rounded-[0rem] my-3  md:my-0 md:bg-transparent">
                {/* Background Image Container */}
                <div
                    className="absolute inset-0 z-0 overflow-hidden"
                    aria-hidden="true"
                >
                    {/* Hero Image */}
                    <Image
                        src="/img/hero-seller.jpg"
                        alt="Seller Hero Background"
                        fill
                        priority
                        className="object-cover object-center"
                    />

                    {/* Custom Gradient Overlay matching #2A3D5D - Refactored to Tailwind */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-primary-500 dark:to-primary-800"
                    />
                </div>

                {/* Top Navigation Layer (Logo & Back Button) - Hidden on mobile */}
                <div className="absolute top-0 left-0 right-0 z-20 p-6 md:p-10 hidden md:flex items-start justify-between">
                    {/* Logo - Centered absolute but placed in flex for layout context if needed */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-10">
                        <Logo mode="dark" imgClass="w-[100px] h-[56px] " />
                    </div>

                    {/* Back Button - Top Right (RTL aware) */}
                    <div className="me-auto">
                        <BackButton className="w-[45px] h-[45px]" />
                    </div>
                </div>

                {/* Content */}
                <PageContainer variant="dashboard" className="relative z-10 w-full text-center pb-4 px-0 md:py-24">
                    <div className="max-w-3xl mx-auto space-y-4 md:space-y-10 px-1">
                        <div className="space-y-2 md:space-y-5">
                            <h1 className="text-lg md:text-h1 font-extrabold text-neutral-10 tracking-tight leading-[1.2]">
                                {t("seller_landing.header.title")}
                            </h1>
                            <p className="text-tag md:text-h4 text-neutral-100 max-w-3xl mx-auto leading-relaxed md:leading-normal font-medium opacity-90">
                                {t("seller_landing.header.subtitle")}
                            </p>
                        </div>

                        <div className="pt-0 md:pt-1 flex justify-center">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="px-8 py-5 md:px-32 md:py-5 text-label md:text-h5 font-bold "
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

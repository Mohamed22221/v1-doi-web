import { cacheLife } from "next/cache";
import Link from "next/link";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import { PageContainer } from "@/components/template/container/page-container";
import { Button } from "@/components/ui/button";

interface SellerCtaProps {
    locale: Locale;
}

/**
 * SellerCta
 *
 * Unified CTA banner section for the seller landing page.
 * Uses Tailwind CSS responsive classes to handle design differences between mobile and desktop.
 * Mobile: Dark rounded card, single button.
 * Desktop: Light background, two buttons, helper note.
 *
 * Cached Server Component – content does not depend on request-time data.
 */
export async function SellerCta({ locale }: SellerCtaProps) {
    "use cache";
    cacheLife("days");

    const { t } = await getTranslation(locale, "home");

    return (
        <section
            aria-labelledby="cta-section-title"
            className="px-3 py-2 md:px-0 md:py-16"
        >
            <PageContainer
                variant="dashboard"
                className="flex flex-col items-center gap-6 rounded-2xl px-6 py-4 text-center bg-primary-800 md:bg-transparent md:px-0 md:py-0 md:rounded-none"
            >
                {/* Title & Subtitle */}
                <div className="space-y-3">
                    <h2
                        id="cta-section-title"
                        className="text-h4 font-extrabold tracking-tight text-secondary-400 md:text-h1 md:text-primary-800 dark:text-secondary-300 dark:md:text-primary-100"
                    >
                        {t("seller_landing.cta.title")}
                    </h2>
                    <p
                        className="text-caption font-medium text-primary-100 md:text-h4 md:text-neutral-400 dark:text-primary-100 dark:md:text-neutral-400 md:font-bold"
                    >
                        {t("seller_landing.cta.subtitle")}
                    </p>
                </div>

                {/* Buttons Group */}
                <div className="flex flex-row-reverse items-center gap-4">



                    {/* Secondary CTA: Visible only on Desktop */}
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="hidden md:px-17 md:py-6 text-h5 font-bold md:flex md:text-primary-800 md:dark:text-primary-100"
                    >
                        <Link href="#terms">{t("seller_landing.cta.secondary_cta")}</Link>
                        {/* Primary CTA: Dark/Default on desktop, Outline white on mobile */}
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="default"
                        className="px-6 text-label font-bold md:bg-primary-800 md:hover:text-primary-50 bg-primary-50 md:px-18 md:py-6 md:text-h5 md:hover:bg-primary-700  text-primary-800 hover:bg-primary-100 hover:text-primary-800 dark:border-neutral-10 dark:text-primary-50 dark:bg-primary-700 md:text-neutral-10 md:dark:bg-primary-700 md:dark:hover:bg-primary-600 md:dark:border-transparent md:shadow-sm md:border md:border-transparent"
                    >
                        <Link href="#activate">{t("seller_landing.cta.primary_cta")}</Link>
                    </Button>
                </div>

                {/* Helper note: Visible only on Desktop */}
                <p className="hidden text-h5 text-neutral-400 md:block dark:text-neutral-300">
                    {t("seller_landing.cta.note")}
                </p>
            </PageContainer>
        </section>
    );
}

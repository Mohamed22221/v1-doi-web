import { cacheLife } from "next/cache";
import { Users, Gavel, Wallet, Star } from "lucide-react";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import { PageContainer } from "@/components/template/container/page-container";

interface SellerFeaturesProps {
    locale: Locale;
}

interface FeatureData {
    title: string;
    description: string;
}

// Ordered icon set – easy to swap with custom SVGs later
const featureIcons = [Users, Gavel, Wallet, Star];

/**
 * SellerFeatures
 *
 * Desktop: full-width dark-gradient background, 2×2 horizontal glass cards.
 * Mobile:  white rounded card container, 2-column vertical feature tiles.
 *
 * Cached Server Component – content does not depend on request-time data.
 */
export async function SellerFeatures({ locale }: SellerFeaturesProps) {
    "use cache";
    cacheLife("days");

    const { t } = await getTranslation(locale, "home");
    const features = t("seller_landing.cash.items", {
        returnObjects: true,
    }) as FeatureData[];

    if (!Array.isArray(features)) {
        return null;
    }

    return (
        <section
            aria-labelledby="cash-section-title"
            className=" px-3 py-4 md:bg-linear-to-l md:from-primary-800 md:to-primary-500 md:px-0 md:py-14"
        >
            <PageContainer variant="dashboard" className="rounded-2xl bg-card shadow-sm md:rounded-none md:shadow-none md:bg-transparent">

                <div className="mb-1 pt-4 md:pt-0 space-y-2 text-center md:mb-10 md:space-y-3">
                    <h2
                        id="cash-section-title"
                        className="text-h4 font-extrabold tracking-tight text-primary-500 md:text-h1 md:text-neutral-10 dark:text-primary-100"
                    >
                        {t("seller_landing.cash.title")}
                    </h2>
                    <p className="text-caption text-neutral-400 md:text-h3 md:font-semibold md:text-primary-200 dark:text-neutral-300">
                        {t("seller_landing.cash.subtitle")}
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="px-1 py-8 md:px-4 md:py-6 md:bg-transparent md:p-0 md:shadow-none">
                    <ul
                        className="grid grid-cols-2 gap-4 md:gap-6"
                        role="list"
                    >
                        {features.map((feature, index) => {
                            const Icon = featureIcons[index % featureIcons.length];
                            return (
                                <li
                                    key={index}
                                    className="group flex flex-col items-start gap-4 rounded-xl text-start
                                                transition-all duration-300 ease-out
                                                md:flex-row md:items-center md:justify-start md:gap-6
                                                md:rounded-2xl md:border md:border-white/15 md:bg-white/10
                                                md:p-6 md:text-start md:backdrop-blur-sm
                                                md:hover:-translate-y-1 md:hover:border-white/30 md:hover:bg-white/15
                                                md:hover:shadow-xl md:hover:shadow-primary-900/40"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="flex size-[45px] shrink-0 items-center justify-center rounded-full bg-primary-50
                                                transition-colors duration-300
                                                group-hover:bg-primary-100
                                                md:size-[75px] md:bg-secondary-500/20
                                                md:group-hover:bg-secondary-500/35
                                                dark:bg-primary-700 dark:group-hover:bg-primary-600"
                                    >
                                        <Icon
                                            className="size-[24px] text-primary-500 md:size-8 md:text-secondary-200 dark:text-primary-100
                                                    transition-transform duration-300 group-hover:scale-110"
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    {/* Text block */}
                                    <div className="space-y-1">
                                        <p className="text-label font-bold text-primary-500
                                                    transition-colors duration-300
                                                    md:text-h3 md:font-extrabold md:text-neutral-10
                                                    md:group-hover:text-white
                                                    dark:text-primary-100 dark:group-hover:text-white">
                                            {feature.title}
                                        </p>
                                        <p className="text-tag text-neutral-400 md:text-h5 md:text-primary-100 dark:text-neutral-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </PageContainer>
        </section>
    );
}

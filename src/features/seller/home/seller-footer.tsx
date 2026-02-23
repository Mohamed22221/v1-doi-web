import { cacheLife } from "next/cache";
import Link from "next/link";
import { HelpCircle, Headphones, FileText } from "lucide-react";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import { PageContainer } from "@/components/template/container/page-container";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface SellerFooterProps {
    locale: Locale;
}

/**
 * SellerFooter
 *
 * Responsive footer for the seller landing page.
 * Mobile:  Light bg-card, centered logo, mission, and stacked links.
 * Desktop: Dark bg-primary-800, split layout with logo/mission on one side and links on the other.
 */
export async function SellerFooter({ locale }: SellerFooterProps) {
    "use cache";
    cacheLife("days");

    const { t } = await getTranslation(locale, "home");
    const year = new Date().getFullYear();

    return (
        <footer className="px-3 pb-5 pt-3 md:px-0 md:pb-0">
            <div
                className="rounded-md bg-card px-2 py-5 text-center shadow-sm md:rounded-none md:bg-primary-800 md:p-12 md:text-start md:shadow-none"
            >
                <PageContainer variant="dashboard" className="px-0">
                    <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0">
                        {/* Logo & Mission */}
                        <div className="flex flex-col items-center space-y-2 md:items-start">
                            <Image
                                className={cn("h-full w-full object-contain", "h-[25px] w-[44px] md:h-10 md:w-auto")}
                                src={`/img/logo-secound.png`}
                                alt={`Doi-web logo`}
                                width={87}
                                height={50}

                            />
                            <p className="text-label md:font-bold text-primary-800 dark:text-primary-100 md:text-neutral-10 md:dark:text-neutral-10">
                                {t("seller_landing.footer.mission")}
                            </p>
                        </div>
                        {/* Links */}
                        <nav
                            aria-label="Footer links"
                            className="flex flex-wrap justify-center gap-4 md:gap-5"
                        >
                            <Link
                                href="#terms"
                                className=" flex items-center gap-2 text-label font-bold text-primary-800
                                transition-colors hover:text-primary-600
                                md:text-neutral-10 md:hover:text-neutral-200
                                dark:text-primary-100 dark:md:text-neutral-10"
                            >
                                <FileText className="size-5" />
                                {t("seller_landing.footer.terms")}
                            </Link>
                            <Link
                                href="#faq"
                                className=" flex items-center gap-2 text-label font-bold text-primary-800
                                transition-colors hover:text-primary-600
                                md:text-neutral-10 md:hover:text-neutral-200
                                dark:text-primary-100 dark:md:text-neutral-10"
                            >
                                <HelpCircle className="size-5" />
                                {t("seller_landing.footer.faq")}
                            </Link>
                            <Link
                                href="#support"
                                className="flex items-center gap-2 text-label font-bold text-primary-800
                                transition-colors hover:text-primary-600
                                md:text-neutral-10 md:hover:text-neutral-200
                                dark:text-primary-100 dark:md:text-neutral-10"
                            >
                                <Headphones className="size-5" />
                                {t("seller_landing.footer.support")}
                            </Link>
                        </nav>


                    </div>

                    {/* Copyright */}
                    <div className="mt-1  pt-3 text-center md:mt-10 ">
                        <p className="text-caption font-medium text-primary-400 md:text-primary-200 dark:text-neutral-400 md:dark:text-primary-300">
                            {t("seller_landing.footer.copyright", { year })}
                        </p>
                    </div>
                </PageContainer>
            </div>
        </footer>
    );
}



import { PageContainer } from "@components/template/container/page-container";
import { cn } from "@utils/cn";
import { cacheLife } from "next/cache";
import Link from "next/link";
import Icon from "@/components/shared/icon-base";
import { ArrowIcon } from "@/components/shared/icon-base/constant";

/**
 * SellerMobileHeader
 *
 * A sticky header exclusively for the seller landing page on mobile devices.
 * Design matched to the main dynamic header: white background, rounded bottom corners.
 */
export async function SellerMobileHeader() {

    "use cache";
    cacheLife("days");

    return (
        <header
            className={cn(
                "sticky inset-x-0 top-0 z-50 flex h-[65px] items-center rounded-b-2xl bg-neutral-10 shadow-sm md:hidden dark:bg-card"
            )}
        >
            <PageContainer variant="full" className="flex h-full w-full items-center justify-between">
                <Link
                    href="/"
                >
                    <Icon icon={ArrowIcon} className="text-neutral-400 ltr:rotate-180 mx-2" />
                </Link>
            </PageContainer>
        </header>
    );
}

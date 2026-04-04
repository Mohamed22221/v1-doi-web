import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";
import { PageContainer } from "@/components/template/container/page-container";

/**
 * Shop illustration — uses bidding-war.png (public/img/home/).
 * TODO: Replace with the exported shop SVG illustration from Figma node 706:7659
 * once the asset is available in the design handoff package.
 */
const SHOP_ILLUSTRATION = "/img/home/shop.png";

interface SellPromoSectionProps {
  locale: Locale;
}

/**
 * SellPromoSection — fully Static Server Component.
 *
 * Figma node 706:7657 — "ابدأ البيع" seller call-to-action banner.
 *
 * Design:
 *   - Beige/warm gradient background (linear from-[#f4e9e3] to-[#d4bca4])
 *   - Shop illustration on the start side (hidden on mobile)
 *   - Heading, body text, CTA button on the end side
 *   - Fully rounded container with 56px padding on desktop, 24px on mobile
 *
 * No Suspense needed — purely static, no data fetching.
 * Responsive: stacked on mobile, side-by-side on md+.
 */
export async function SellPromoSection({ locale }: SellPromoSectionProps) {
  const { t } = await getTranslation(locale, "home");

  return (
    <PageContainer ria-labelledby="sell-promo-heading" className="py-6 md:py-9">
      {/* ── Banner wrapper (gradient background matching Figma) ── */}
      <div className="relative flex min-h-fit w-full items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(to_right,#f4e9e3,#d4bca4)] px-6 py-5 md:min-h-[300px] md:justify-start md:rounded-3xl md:px-14 md:py-8 dark:bg-[linear-gradient(to_right,var(--color-primary-700),var(--color-primary-800))]">
        {/* ── Content block (end side) ── */}
        <div className="flex w-full flex-col items-center gap-4 text-center sm:w-auto md:items-start md:text-start">
          {/* Headline */}
          <h2
            id="sell-promo-heading"
            className="w-[372px] max-w-sm text-xl leading-snug font-bold tracking-wide text-primary md:w-[328px] md:text-3xl md:ltr:w-[488px]"
          >
            {t("sellPromo.headline")}
          </h2>

          {/* Body text */}
          <p className="max-w-[500px] text-sm leading-relaxed font-normal tracking-wide text-muted-foreground md:text-h4">
            {t("sellPromo.body")}
          </p>

          {/* CTA Button */}
          <Link
            href="/seller/register"
            className="mt-2 flex h-[50px] items-center justify-center rounded-2xl bg-primary px-6 text-sm font-bold tracking-wide text-white transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none md:h-14 md:px-8 md:text-base"
          >
            {t("sellPromo.cta")}
          </Link>
        </div>
        {/* ── Shop Illustration (start/left absolute, hidden on mobile) ── */}
        <div
          aria-hidden="true"
          className="absolute end-[75px] bottom-0 hidden size-[300px] overflow-hidden md:block"
        >
          <Image
            src={SHOP_ILLUSTRATION}
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="300px"
          />
        </div>
      </div>
    </PageContainer>
  );
}

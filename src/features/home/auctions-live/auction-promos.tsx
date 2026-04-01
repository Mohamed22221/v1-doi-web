import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/template/container/page-container";
import Image from "next/image";

interface AuctionPromosProps {
  locale: Locale;
}

/**
 * AuctionPromos — Server Component
 *
 * Figma node 949:15341 — Two side-by-side banners, gap-8, h-[250px] each.
 *
 * Banner 1 (Navy gradient) — 949:15342
 *   bg: linear-gradient(to-r, #202e46 → #2a3d5d)
 *   Text: white title (24px bold), muted body (#a0aec0), discover CTA (bg #edf1f7, text #202e46)
 *   Illustration: person holding paddle, bottom-start absolute
 *
 * Banner 2 (Warm beige gradient) — 949:15346
 *   bg: linear-gradient(to-r, #f4e9e3 → #d4bca4)
 *   Text: dark title (24px bold, #101723), dark body (#3e2723), browse CTA (bg #2a3d5d, text white)
 *   Illustration: stacked product photos (laptop, watch, phone), bottom-start
 */
export async function AuctionPromos({ locale }: AuctionPromosProps) {
  const { t } = await getTranslation(locale, "home");

  return (
    <PageContainer
      variant="dashboard"
      className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2"
    >
      {/* ── Banner 2: Fixed Price (Warm Beige gradient) ── */}
      <div
        className="relative flex h-[250px] w-full flex-col items-start overflow-hidden rounded-3xl p-9"
        style={{ background: "linear-gradient(to right, #f4e9e3, #d4bca4)" }}
      >
        {/* Text content — right-aligned (end) */}
        <div className="relative z-10 flex flex-col items-start gap-4 text-start">
          <p className="text-2xl font-bold tracking-wide text-primary-900">
            {t("auctions.promos.fixedPriceTitle")}
          </p>
          <p className="text-base text-[#3e2723]">{t("auctions.promos.fixedPriceBody")}</p>
          <Button className="h-14 rounded-2xl px-8 text-base font-bold text-white">
            {t("auctions.promos.browseProducts")}
          </Button>
        </div>

        {/* Illustration: stacked product images — bottom-start corner */}
        <div className="absolute end-0 bottom-0 h-[275px] w-[289.62469482421875px]">
          {/* Real image: <Image src="/img/home/promo-products.png" alt="" fill className="object-contain object-bottom" /> */}
          {/* Placeholder product stack */}
          <Image
            src="/img/home/icon-auction.png"
            alt=""
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>
      {/* ── Banner 1: Continuous Auctions (Dark Navy gradient) ── */}
      <div
        className="relative flex h-[250px] w-full flex-col items-start overflow-hidden rounded-3xl p-9"
        style={{ background: "linear-gradient(to right, #202e46, #2a3d5d)" }}
      >
        {/* Text content — right-aligned (end) */}
        <div className="relative z-10 flex flex-col items-start gap-4 text-start">
          <p className="text-2xl font-bold tracking-wide text-white">
            {t("auctions.promos.continuousTitle")}
          </p>
          <p className="text-base text-primary-100">{t("auctions.promos.continuousBody")}</p>
          <Button className="h-14 rounded-2xl bg-primary-50 px-8 text-base font-bold text-primary-800 hover:bg-white">
            {t("auctions.promos.discoverNow")}
          </Button>
        </div>

        <div className="absolute end-0 bottom-0 h-[330px] w-[330px]">
          {/* Real image: <Image src="/img/home/promo-products.png" alt="" fill className="object-contain object-bottom" /> */}
          {/* Placeholder product stack */}
          <Image src="/img/home/bidding-war.png" alt="" fill className="object-contain" />
        </div>
      </div>
    </PageContainer>
  );
}

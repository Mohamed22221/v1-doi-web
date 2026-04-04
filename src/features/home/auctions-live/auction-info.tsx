import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { AuctionTimer } from "@/features/home/auctions-live/auction-timer";
import { Button } from "@/components/ui/button";

interface AuctionInfoProps {
  locale: Locale;
}

/**
 * AuctionInfo - Server Component
 *
 */
export async function AuctionInfo({ locale }: AuctionInfoProps) {
  const { t } = await getTranslation(locale, "home");

  return (
    <div className="flex flex-col items-start gap-2 text-start md:gap-6">
      {/* 1. Badges */}
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        {/* "مباشر الآن" — Figma bg: #fbe9e9, text: #e24b4b */}

        <div className="flex items-center gap-2 rounded-full bg-danger-100 px-3.5 py-2 dark:bg-danger-400/20">
          <span className="size-2 rounded-sm bg-danger-400" aria-hidden="true" />
          <span className="text-xs text-danger-400">{t("auctions.liveNow")}</span>
        </div>
        {/* "الترتيب يتجدد كل 15 دقائق" — Figma bg: white, text: neutral/600 */}
        <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1 dark:bg-primary-900">
          <span className="size-2 rounded-sm bg-success-400" aria-hidden="true" />
          <span className="text-xs text-[#676765] dark:text-primary-300">
            {t("auctions.renewedEvery15Min")}
          </span>
        </div>
      </div>

      {/* 2. Headline — Figma: text-[40px], bold, text-[#343432] */}
      <h2
        id="auctions-heading"
        className="px-1 py-2 text-2xl leading-snug font-bold text-neutral-800 md:py-0 md:text-h1 md:leading-tight md:ltr:text-2xl dark:text-primary-50"
      >
        {t("auctions.headlinePrimary")}
        <br />
        {t("auctions.headlineSecondary")}
      </h2>

      {/* 3. Sub-label */}
      <p className="px-2 text-sm text-neutral-400 md:px-0 dark:text-primary-300">
        {t("auctions.nextAuctionIn")}
      </p>

      {/* 4. Timer — Figma: Montserrat Bold 40px, color #2a3d5d */}
      <AuctionTimer
        minutesLabel={t("auctions.time.minutes")}
        secondsLabel={t("auctions.time.seconds")}
      />

      {/* 5. CTA Buttons — Figma: h-[56px], rounded-[16px], flex full-width */}
      <div className="flex w-full items-center gap-4">
        {/* Primary: انضم للمزاد — bg #2a3d5d */}
        <Button className="h-[50px] flex-1 rounded-2xl bg-primary-500 text-label font-bold text-white hover:bg-primary-500/90 md:h-14 md:text-base dark:bg-primary-400 dark:hover:bg-primary-400/90">
          {t("auctions.joinAuction")}
        </Button>
        {/* Secondary: عرض الصالة — bg #edf1f7 */}
        <Button
          variant="ghost"
          className="h-[50px] flex-1 rounded-2xl bg-primary-50 text-label font-bold text-primary-800 hover:bg-primary-50/80 md:h-14 md:text-base dark:bg-primary-800 dark:text-primary-100 dark:hover:bg-primary-700"
        >
          {t("auctions.viewHall")}
        </Button>
      </div>
    </div>
  );
}

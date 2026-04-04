import Image from "next/image";
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";
import { PageContainer } from "@/components/template/container/page-container";
import { AppStoreIcon, PlayStoreIcon } from "@/components/shared/icon-base/hero-icons";

const PHONE_FRAME_1 = "/img/home/phone-frame.png";
const PHONE_FRAME_2 = "/img/home/phone-frame2.png";

interface AppDownloadSectionProps {
  locale: Locale;
}

/**
 * AppDownloadSection — fully Static Server Component.
 *
 * Figma nodes:
 *   - Desktop: 1109:8856
 *   - Mobile: 1325:24846
 *
 * Features:
 *   - Light blue background (#D9E4FB)
 *   - Two overlapping phone frames
 *   - App Store and Play Store download buttons
 *   - Multi-language support (RTL/LTR)
 */
export async function AppDownloadSection({ locale }: AppDownloadSectionProps) {
  const { t } = await getTranslation(locale, "home");

  return (
    <PageContainer aria-labelledby="app-download-heading" className="py-6 md:py-9">
      <div className="relative flex w-full flex-col overflow-hidden rounded-3xl bg-[#D9E4FB] px-6 py-4 md:flex-row md:items-center md:justify-between md:px-14 md:py-0 dark:bg-primary-800">
        {/* ── Text Content Block ── */}
        <div className="relative z-10 flex flex-col items-start gap-4 text-start md:order-2 md:py-1">
          <h2
            id="app-download-heading"
            className="text-2xl font-bold tracking-wide text-primary-900 md:text-4xl dark:text-white"
          >
            {t("appDownload.headline")}
          </h2>

          <p className="max-w-[580px] text-base leading-relaxed text-primary-600 md:text-lg dark:text-primary-100">
            {t("appDownload.body")}
          </p>

          {/* Download Buttons */}
          <div className="mt-1 flex flex-wrap justify-center gap-3 md:mt-4 md:justify-start">
            {/* App Store */}
            <a
              href="#"
              className="flex h-14 min-w-[145px] items-center gap-3 rounded-sm border border-white/20 bg-white px-3 text-primary-900 transition-colors hover:bg-primary-300/90 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none dark:bg-primary-700 dark:text-white"
              aria-label={t("appDownload.appStore")}
            >
              <AppStoreIcon className="size-6 shrink-0" aria-hidden="true" />
              <div className="mt-1 flex flex-col leading-none">
                <span className="text-[10px] opacity-80">{t("appDownload.downloadOn")}</span>
                <span className="text-sm font-bold">{t("appDownload.appStore")}</span>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              className="flex h-14 min-w-[145px] items-center gap-3 rounded-sm border border-white/20 bg-white px-3 text-primary-900 transition-colors hover:bg-primary-300/90 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none dark:bg-primary-700 dark:text-white"
              aria-label={t("appDownload.googlePlay")}
            >
              <div className="size-6 shrink-0" aria-hidden="true">
                <PlayStoreIcon className="size-full fill-current" />
              </div>
              <div className="mt-1 flex flex-col leading-none">
                <span className="text-[10px] opacity-80">{t("appDownload.downloadOn")}</span>
                <span className="text-sm font-bold">{t("appDownload.googlePlay")}</span>
              </div>
            </a>
          </div>
        </div>
        {/* ── Phone Frames Visual Block ── */}
        <div className="relative mt-3 flex h-[220px] w-full items-end justify-end md:order-2 md:mt-0 md:h-[400px] md:w-1/2 md:justify-end">
          {/* Secondary smaller phone (overlapping) */}
          <div className="absolute start-[0%] bottom-0 z-10 h-[85%] w-[186px] md:start-[17%] md:w-[280px]">
            <Image
              src={PHONE_FRAME_2}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 180px, 280px"
            />
          </div>
          {/* Main larger phone */}
          <div className="relative z-0 h-full w-[213px] md:w-[320px]">
            <Image
              src={PHONE_FRAME_1}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 200px, 320px"
              priority
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

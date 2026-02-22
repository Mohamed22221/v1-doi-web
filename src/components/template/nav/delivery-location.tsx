"use client";

import { LocationIcon, ChevronDownIcon } from "@components/shared/icon-base/constant";
import Icon from "@components/shared/icon-base";
import { useTranslation } from "@lib/i18n/client";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

export function DeliveryLocation() {
  const params = useParams();
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, "common");

  return (
    <div
      className="group flex cursor-pointer items-center gap-3 select-none"
      onClick={() => console.info("Change location clicked")}
    >
      {/* Icon Container with specific dot style */}
      <div className="relative shrink-0">
        <div className="flex size-[48px] items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm md:size-[52px]">
          <Icon icon={LocationIcon} className="size-6 md:size-7" />
        </div>
        {/* Dark dot at top-right (logical) */}
        <div className="inset-inline-end-[-0.5px] absolute -top-0.5 size-4 rounded-full border-2 border-primary-400 bg-primary-800 dark:border-primary-400 dark:bg-primary-700" />
      </div>

      {/* Text Container */}
      <div className="flex flex-col items-start leading-[1.3]">
        <span className="text-[13px] text-primary-100 md:text-body dark:text-white/60">
          {t("delivery.to")}
        </span>
        <span className="flex items-center gap-2 text-[15px] text-primary-500 md:text-h5 dark:text-neutral-200">
          {t("delivery.defaultLocation")}
          <Icon
            icon={ChevronDownIcon}
            className="mt-1 size-5 text-white/80 transition-transform group-hover:translate-y-0.5 dark:text-white/60"
          />
        </span>
      </div>

      {/* Arrow */}
    </div>
  );
}

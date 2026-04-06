"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { NotificationPreferences } from "@/utils/notification-cookies";
import Image from "next/image";

interface NotificationSettingsProps {
  onConfirm: (prefs: NotificationPreferences) => void;
  onLater: () => void;
}

export function NotificationSettings({ onConfirm, onLater }: NotificationSettingsProps) {
  const { t } = useTranslation();
  const [prefs, setPrefs] = React.useState<NotificationPreferences>({
    auctions: true,
    sales: true,
    general: true,
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* Top Section - Title & Illustration */}
      <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
        <h1 className="text-center text-xl font-bold text-neutral-800 md:text-h3 dark:text-neutral-100">
          {t("notification_modal.notification")}
        </h1>
        <div className="md:mt-50px flex h-[180px] w-[180px] items-center justify-center md:h-[200px] md:w-[200px]">
          <Image
            src="/img/notifications-bro.png"
            alt="Notification Icon"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 px-5 pt-2 pb-4 md:px-1 md:pt-0 md:pb-0">
        {/* Content Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-center text-xl font-bold tracking-tight text-primary-500 md:text-h4 dark:text-primary-100">
            {t("notification_modal.step2_title")}
          </h2>
          <p className="text-center text-tag leading-normal font-medium tracking-[0.54px] text-neutral-600 opacity-60 md:text-label dark:text-neutral-300">
            {t("notification_modal.step2_desc")}
          </p>
        </div>

        {/* Settings List */}
        <div className="flex w-full flex-col gap-1 md:py-0">
          <div className="flex items-center gap-3 py-0.5">
            {/* Toggle 1: Auctions */}
            <Switch
              size="lg"
              checked={prefs.auctions}
              onCheckedChange={() => handleToggle("auctions")}
              aria-label={t("notification_modal.toggle_auctions")}
            />
            <div className="flex flex-col gap-1 text-start">
              <span className="text-label font-thin text-neutral-800 md:text-body dark:text-neutral-100">
                {t("notification_modal.toggle_auctions")}
              </span>
              <span className="text-xs leading-relaxed text-neutral-400 md:text-tag">
                {t("notification_modal.toggle_auctions_desc")}
              </span>
            </div>
          </div>

          {/* Toggle 2: Sales */}
          <div className="flex items-center gap-3 py-0.5">
            <Switch
              size="lg"
              checked={prefs.sales}
              onCheckedChange={() => handleToggle("sales")}
              aria-label={t("notification_modal.toggle_sales")}
            />
            <div className="flex flex-col gap-1 text-start">
              <span className="text-label font-thin text-neutral-800 md:text-body dark:text-neutral-100">
                {t("notification_modal.toggle_sales")}
              </span>
              <span className="text-xs leading-relaxed text-neutral-400 md:text-tag">
                {t("notification_modal.toggle_sales_desc")}
              </span>
            </div>
          </div>

          {/* Toggle 3: General */}
          <div className="flex items-center gap-3 py-0.5">
            <Switch
              size="lg"
              checked={prefs.general}
              onCheckedChange={() => handleToggle("general")}
              aria-label={t("notification_modal.toggle_general")}
            />
            <div className="flex flex-col gap-1 text-start">
              <span className="text-label font-thin text-neutral-800 md:text-body dark:text-neutral-100">
                {t("notification_modal.toggle_general")}
              </span>
              <span className="text-xs leading-relaxed text-neutral-400 md:text-tag">
                {t("notification_modal.toggle_general_desc")}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-row justify-between gap-3 pt-2 pb-3 md:pb-0">
          <Button
            className="h-[40px] w-full flex-1 text-label font-bold text-neutral-10 md:h-[50px] md:min-w-[210px] md:flex-1"
            rounded="md"
            onClick={() => onConfirm(prefs)}
          >
            {t("notification_modal.confirm")}
          </Button>
          <Button
            variant="secondary"
            className="h-[40px] w-full flex-1 text-label font-bold text-neutral-500 md:h-[50px] md:min-w-[210px] md:flex-1"
            rounded="md"
            onClick={onLater}
          >
            {t("notification_modal.later")}
          </Button>
        </div>
      </div>
    </div>
  );
}

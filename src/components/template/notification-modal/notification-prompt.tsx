"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/ui/responsive-modal";
import Image from "next/image";

interface NotificationPromptProps {
  onAllow: () => void;
  onLater: () => void;
}

export function NotificationPrompt({ onAllow, onLater }: NotificationPromptProps) {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
        <h1 className="text-center text-xl font-bold text-neutral-800 md:text-h3 dark:text-neutral-100">
          {t("notification_modal.notification")}
        </h1>
        <div className="flex h-[220px] w-[220px] items-center justify-center md:h-[350px] md:w-[350px]">
          <Image
            src="/img/notifications-bro.png"
            alt="Notification Icon"
            width={350}
            height={350}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5 pt-2 pb-4 md:px-1 md:pt-0 md:pb-1">
        <ResponsiveModalHeader className="gap-2 px-0 py-0 text-center">
          <ResponsiveModalTitle className="text-center text-xl font-bold tracking-tight text-primary-500 md:text-h4 dark:text-primary-100">
            {t("notification_modal.step1_title")}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="text-center text-tag leading-normal font-bold tracking-[0.54px] text-neutral-600 opacity-70 md:text-label dark:text-neutral-300">
            {t("notification_modal.step1_desc")}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <div className="flex w-full flex-row justify-between gap-3 pt-2 pb-3 md:pb-0">
          <Button
            variant="secondary"
            className="h-[50px] w-full flex-1 text-label font-bold text-neutral-500 md:min-w-[210px] md:flex-1"
            rounded="md"
            onClick={onLater}
          >
            {t("notification_modal.later")}
          </Button>
          <Button
            className="h-[50px] w-full flex-1 text-label font-bold text-neutral-10 md:min-w-[210px] md:flex-1"
            rounded="md"
            onClick={onAllow}
          >
            {t("notification_modal.allow")}
          </Button>
        </div>
      </div>
    </div>
  );
}

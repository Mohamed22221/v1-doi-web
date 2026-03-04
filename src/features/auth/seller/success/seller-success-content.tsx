import { cacheLife } from "next/cache";
import Image from "next/image";

// i18n
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";

// Components
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";

interface SellerSuccessContentProps {
  locale: Locale;
}

/**
 * SellerSuccessContent
 *
 * Displays the success screen for sellers after account activation.
 * Includes a celebratory illustration and message.
 *
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function SellerSuccessContent({ locale }: SellerSuccessContentProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  return (
    <section className="flex flex-col items-center gap-4 text-center md:gap-4">
      {/* Brand Logo */}
      <Logo className="mb-2 hidden md:inline-block" imgClass="w-[90px] h-[50px]" />

      {/* Illustration */}
      <div className="relative aspect-square max-h-[325px] w-full max-w-[325px]">
        <Image
          src="/img/authentication-success.png"
          alt={t("seller-success.illustrationAlt")}
          fill
          className="object-contain"
          priority
        />
      </div>
      <div>
        <h1 className="text-h3 font-bold text-primary-500 md:text-h2 dark:text-primary-400">
          {t("seller-success.title")}
        </h1>

        {/* Message */}
        <HeaderSidebar
          title={t("seller-success.description")}
          subtitle={t("seller-success.helper")}
          as="h2"
          className="mt-0 gap-1 p-1 pt-0 text-neutral-600 md:pt-2 md:pb-2"
          classHeader="!text-primary-500 dark:!text-primary-400 text-h3 md:text-h2"
        />
      </div>
    </section>
  );
}

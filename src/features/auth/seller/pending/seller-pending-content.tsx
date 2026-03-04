import { cacheLife } from "next/cache";
import Image from "next/image";

// i18n
import type { Locale } from "@lib/i18n/config";
import { getTranslation } from "@lib/i18n/server";

// Components
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";

interface SellerPendingContentProps {
  locale: Locale;
}

/**
 * SellerPendingContent
 *
 * Displays the pending verification screen for sellers.
 * Includes the same illustration as the start screen but with updated messaging.
 *
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function SellerPendingContent({ locale }: SellerPendingContentProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  return (
    <section className="flex flex-col items-center gap-3 text-center md:gap-4">
      {/* Brand Logo */}
      <Logo className="hidden md:inline-block" imgClass="w-[90px] h-[50px]" />

      {/* Illustration */}
      <div className="relative aspect-square max-h-[325px] w-full max-w-[325px]">
        <Image
          src="/img/authentication-pending.png"
          alt={t("seller-pending.illustrationAlt")}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Message */}
      <HeaderSidebar
        title={t("seller-pending.title")}
        subtitle={t("seller-pending.description")}
        className="mt-0 space-y-1 pt-1 text-neutral-600 md:pt-2"
        classHeader="!text-primary-500 dark:!text-primary-400 text-h3 md:text-h2"
      />
    </section>
  );
}

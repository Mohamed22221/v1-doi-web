import { cacheLife } from "next/cache";
import Image from "next/image";

// i18n
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

// Components
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";

interface RegisterSuccessProps {
  locale: Locale;
}

/**
 * RegisterSuccess
 *
 * Displays a success message after a user successfully registers.
 * Includes a celebratory illustration and a link to return to the login page.
 *
 * Note: This component is a Server Component and uses 'use cache'.
 */
export default async function RegisterSuccess({ locale }: RegisterSuccessProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Brand Logo */}
      <Logo imgClass="w-[100px] h-[56px]" className="mb-2" />

      {/* Illustration */}
      <div className="relative aspect-square max-h-[325px] w-full max-w-[325px]">
        <Image
          src="/img/Confirmed-bro.png"
          alt="Success illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Success Message */}
      <HeaderSidebar
        title={t("buyer-register-success.title")}
        subtitle={t("buyer-register-success.subtitle")}
        className="mt-0 space-y-1 pt-0"
      />
    </div>
  );
}

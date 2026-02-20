import { cacheLife } from "next/cache";
import Image from "next/image";

// i18n
import type { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";

// Components
import Logo from "@/components/template/nav/logo";
import HeaderSidebar from "@/features/auth/components/header-sidebar";
import PointsSidebar from "@/features/auth/components/points-sidebar";

interface BuyerSidebarProps {
  locale: Locale;
  variant: "buyer-login" | "buyer-register";
}

/**
 * BuyerSidebar
 *
 * Displays the sidebar content for buyer authentication pages,
 * including validation points and an illustration.
 *
 * Note: This component is cached for 'days' as content is static.
 */
export default async function BuyerSidebar({ locale, variant }: BuyerSidebarProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  // Retrieve points array from translation file
  // Ensure casting as string[] since t() can return objects
  const points = t(`${variant}.sidebar.points`, { returnObjects: true }) as string[];

  const title = t(`${variant}.sidebar.title`, { defaultValue: t(`${variant}.title`) });
  const subtitle = t(`${variant}.sidebar.subtitle`, { defaultValue: t(`${variant}.subtitle`) });

  return (
    <div className="flex flex-col gap-6">
      {/* Brand Logo - Auto-switches based on theme */}
      <Logo imgClass="w-[100px] h-[56px]" />

      <HeaderSidebar title={title} subtitle={subtitle} />

      <PointsSidebar header={t(`${variant}.sidebar.heading`)} points={points} />

      {/* Bottom Illustration */}
      <div className="relative w-full overflow-hidden py-8">
        <Image
          src="/img/auth_illustration.png"
          alt={t(`${variant}.sidebar.illustrationAlt`)}
          width={594}
          height={345}
          className="object-contain object-bottom"
          priority
        />
      </div>
    </div>
  );
}

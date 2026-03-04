import { cacheLife } from "next/cache";
import Image from "next/image";

// i18n
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

// Components
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";
import PointsSidebar from "../../components/points-sidebar";

interface SellerVerificationSidebarProps {
  locale: Locale;
}

/**
 * SellerVerificationSidebar
 *
 * Displays the sidebar content for the seller verification page.
 * Cached for 'days' as content is static per locale.
 */
export default async function SellerVerificationSidebar({
  locale,
}: SellerVerificationSidebarProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "auth");

  const points = t(`seller-verify.sidebar.points`, { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col gap-6">
      {/* Brand Logo */}
      <Logo imgClass="w-[100px] h-[56px]" />

      <HeaderSidebar title={t(`seller-verify.title`)} subtitle={t(`seller-verify.description`)} />

      <PointsSidebar header={t(`seller-verify.sidebar.heading`)} points={points} />

      {/* Bottom Illustration */}
      <div className="relative w-full overflow-hidden py-8">
        <Image
          src="/img/auth_illustration.png"
          alt={t(`seller-verify.sidebar.illustrationAlt`)}
          width={594}
          height={345}
          className="object-contain object-bottom"
          priority
        />
      </div>
    </div>
  );
}

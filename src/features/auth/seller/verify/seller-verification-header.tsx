import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";
import TitleForm from "../../components/title-form";
import { VerificationBackButton } from "./verification-back-button";

interface SellerVerificationHeaderProps {
  locale: Locale;
}

/**
 * SellerVerificationHeader
 *
 * A cached Server Component that renders the verification form header.
 * Uses 'use cache' for performance and isolates interactivity into VerificationBackButton.
 */
export default async function SellerVerificationHeader({ locale }: SellerVerificationHeaderProps) {
  // Use cache for localization and static structure
  "use cache";

  const { t } = await getTranslation(locale, "auth");
  const { t: commonT } = await getTranslation(locale, "common");

  return (
    <>
      {/* Back Navigation */}
      <VerificationBackButton label={commonT("back")} locale={locale} />

      {/* Mobile Header (Logo + Sidebar content) */}
      <div className="flex flex-col tablet:hidden">
        <Logo imgClass="w-[79px] h-[44px]" />
        <HeaderSidebar title={t("seller-verify.title")} subtitle={t("seller-verify.description")} />
      </div>

      <TitleForm title={t("seller-verify.form.title")} className="text-center" />
    </>
  );
}

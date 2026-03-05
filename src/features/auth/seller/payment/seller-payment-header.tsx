import { getTranslation } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "../../components/header-sidebar";
import TitleForm from "../../components/title-form";
import { VerificationBackButton } from "../verify/verification-back-button";

interface SellerPaymentHeaderProps {
  locale: Locale;
}

export default async function SellerPaymentHeader({ locale }: SellerPaymentHeaderProps) {
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
        <HeaderSidebar
          title={t("seller-payment.title")}
          subtitle={t("seller-payment.description")}
        />
      </div>

      <TitleForm title={t("seller-payment.form.title")} className="text-center" />
    </>
  );
}

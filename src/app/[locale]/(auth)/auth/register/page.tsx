import type { Metadata } from "next";
import { Suspense } from "react";
import { type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@components/routes";
import { AuthSplitLayout } from "@/components/layout/auth/auth-split-layout";
import { getTranslation } from "@/lib/i18n/server";
import { Logo } from "@components/template/nav/logo";
import HeaderSidebar from "@/features/auth/components/header-sidebar";
import BuyerSidebar from "@/features/auth/buyer/buyer-sidebar";
import BuyerRegisterForm from "@/features/auth/buyer/register/buyer-register-form";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "buyer-register",
    pathname: ROUTES.AUTH.REGISTER,
  });
}


/**
 * BuyerRegisterPage
 *
 * The entry point for the buyer registration route.
 * Utilizes AuthSplitLayout with a specialized sidebar and the registration form.
 */
export default async function BuyerRegisterPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Locale, "auth");

  const staticHeader = (
    <div className="flex flex-col pt-4 tablet:hidden">
      <Logo imgClass="w-[79px] h-[44px]" />
      <HeaderSidebar
        title={t(`buyer-register.sidebar.title`)}
        subtitle={t(`buyer-register.sidebar.subtitle`)}
        className="mt-2"
        classHeader="text-h3"
      />
    </div>
  );

  return (
    <AuthSplitLayout
      // Form Area: Registration details and terms
      formContent={
        <Suspense>
          <BuyerRegisterForm locale={locale as Locale} staticHeader={staticHeader} />
        </Suspense>
      }
      // Sidebar Area: Brand identity and registration value props
      sidebarContent={<BuyerSidebar locale={locale as Locale} variant="buyer-register" />}
      classType={true}
    />
  );
}

import { Header } from "@components/layout/headers/header";
import { MobileNav } from "@components/layout/nav/mobile-nav";
import { SellerNav } from "@components/layout/nav/seller-nav";
import { PageContainer } from "@components/template/container/page-container";
import type { Locale } from "@lib/i18n/config";

export default async function NavLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  return (
    <>
      <Header role="seller" showDelivery={false} className="md:hidden" />
      <SellerNav roles={["seller"]} locale={locale} />
      <main>
        <PageContainer variant="full" className="py-22 md:pt-27 md:pb-10">
          {children}
        </PageContainer>
      </main>
      <MobileNav roles={["seller"]} locale={locale} />
    </>
  );
}

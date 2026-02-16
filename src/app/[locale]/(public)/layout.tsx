import { SellerNav } from "@components/layout/nav/seller-nav";
import { MobileNav } from "@components/layout/nav/mobile-nav";
import { PageContainer } from "@components/template/container/page-container";
import { Locale } from "@lib/i18n/config";

export default async function RootLayout({
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
      <SellerNav roles={["guest"]} locale={locale} />
      <main>
        <PageContainer variant="full" className="pt-1 pb-20 md:py-20 ">
          {children}
        </PageContainer>
      </main>
      <MobileNav roles={["guest"]} locale={locale} />
    </>
  );
}

import type { Metadata } from "next";
import { type Locale } from "@lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { NavLinks } from "@/components/layout/nav/nav-links";
import { MobileNav } from "@/components/layout/nav/mobile-nav";
import { Header } from "@/components/layout/headers/header";
import {
  ProductUpload,
  IdentityUpload,
  ProfileUpload,
  SimpleBoxUpload,
} from "@components/ui/file-upload";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale: locale as Locale,
    pageKey: "home",
    pathname: "",
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <Header role="guest" showDelivery={false} className="md:hidden" locale={locale as Locale} />
      <NavLinks config="guest" locale={locale as Locale} />

      <main className="container mx-auto flex flex-col gap-10 p-6 md:p-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-h3 font-bold text-neutral-900 dark:text-neutral-50">
            FileUpload Showcase
          </h1>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Upload */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">1. Product Upload (Multi-image)</h2>
              <ProductUpload uploadType="product" maxFiles={10} />
            </div>

            {/* Simple Box Upload */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">2. Simple Box Upload (Manual)</h2>
              <SimpleBoxUpload
                uploadType="category"
                title="أضف ملفات التصنيف"
                description="اسحب الصور هنا"
              />
            </div>

            {/* Identity Upload */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">3. Identity Upload (Pill Style)</h2>
              <IdentityUpload uploadType="seller_document" label="رفع صورة بطاقة الهوية" />
            </div>

            {/* Profile Upload */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">4. Profile Upload (Avatar)</h2>
              <div className="flex justify-center md:justify-start">
                <ProfileUpload uploadType="user_profile" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav roles={["guest"]} locale={locale as Locale} />
    </>
  );
}

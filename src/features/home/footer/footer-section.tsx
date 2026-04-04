import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Logo } from "@/components/template/nav/logo";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import { LanguageSwitcher } from "./language-switcher";
import { PageContainer } from "@/components/template/container/page-container";

interface FooterSectionProps {
  locale: Locale;
}

export async function FooterSection({ locale }: FooterSectionProps) {
  const { t } = await getTranslation(locale, "common");

  const douehLinks = [
    { label: t("footer.aboutUs"), href: "/about" },
    { label: t("footer.startSelling"), href: "/seller/register" },
    { label: t("footer.faq"), href: "/faq" },
  ];

  const supportLinks = [
    { label: t("footer.terms"), href: "/terms" },
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.report"), href: "/report" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "X (Twitter)" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer
      role="contentinfo"
      className="relative w-full bg-primary-800 p-[20px] pb-23 text-neutral-100 md:p-[52px]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <PageContainer variant="dashboard" className="flex flex-col gap-[16px] md:gap-[32px]">
        {/* Top Section */}
        <div className="flex w-full flex-col items-center justify-between gap-[16px] md:flex-row md:items-start md:gap-4">
          {/* Logo & Contact Info block */}
          <div className="order-1 flex w-full flex-col items-center gap-[16px] md:order-first md:w-[392px] md:items-start">
            {/* Logo */}
            <div className="flex h-[40px] w-full items-center justify-start md:justify-start">
              <Logo mode="dark" width={75} height={40} />
            </div>

            {/* Contact Info - Mobile: Row, Desktop: Vertical */}
            <div className="flex w-full flex-row justify-between gap-[12px] md:flex-col md:justify-start">
              <div className="flex items-center justify-start gap-[12px]">
                <Phone className="size-[18px] text-primary-200 md:size-[24px]" aria-hidden="true" />

                <span className="font-english text-[14px] font-medium text-primary-200 md:text-lg">
                  +966 5X XXX XXXX
                </span>
              </div>
              <div className="flex items-center justify-start gap-[12px]">
                <Mail className="size-[18px] text-primary-200 md:size-[24px]" aria-hidden="true" />
                <span className="font-english text-[14px] font-medium text-primary-200 md:text-lg">
                  support@doueh.com
                </span>
              </div>
            </div>

            {/* Social Links - Mobile: Centered row */}
            <div className="flex w-full items-center justify-center gap-[12px] md:justify-start">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="flex size-[32px] items-center justify-center rounded-xs bg-primary-700 p-[10px] transition-colors hover:bg-primary-600 md:size-[45px]"
                  aria-label={social.label}
                >
                  <social.icon
                    className="size-[16px] text-white md:size-[24px]"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns - Hidden on mobile per Figma node 1325:24877 */}
          <div className="order-2 hidden w-full flex-1 grid-cols-2 gap-[32px] md:order-first md:grid">
            {/* Doueh Links */}
            <div className="flex flex-col items-start gap-[24px]">
              <h3 className="text-lg font-bold tracking-[0.6px] text-white md:text-xl">
                {t("footer.doueh")}
              </h3>
              <ul className="flex flex-col items-start gap-[16px]">
                {douehLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-md font-thin tracking-[0.54px] text-neutral-200 transition-colors hover:text-white md:text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="flex flex-col items-start gap-[24px]">
              <h3 className="text-lg font-bold tracking-[0.6px] text-white md:text-xl">
                {t("footer.support")}
              </h3>
              <ul className="flex flex-col items-start gap-[16px]">
                {supportLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-md font-thin tracking-[0.54px] text-neutral-200 transition-colors hover:text-white md:text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full shrink-0 rounded-[6px] bg-neutral-100 opacity-20"
          aria-hidden="true"
        />

        {/* Bottom Bar */}
        <div className="flex w-full flex-col items-center justify-between gap-[12px] md:flex-row md:gap-6">
          {/* Copyright - Centered on Mobile */}
          <p className="order-2 text-center text-[14px] font-thin tracking-[0.42px] whitespace-nowrap text-primary-200 md:order-1 md:text-start md:text-base md:tracking-[0.48px]">
            {t("footer.copyright")}
          </p>
          {/* Language Switcher - Centered on Mobile */}
          <div className="order-1 flex w-full justify-center md:order-2 md:w-auto">
            <LanguageSwitcher
              locale={locale}
              englishLabel={t("footer.english")}
              arabicLabel={t("footer.arabic")}
            />
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { useAuthGuardStore } from "@/lib/store/auth-guard-store";

/**
 * A modal that prompts guest users to authenticate when they attempt
 * to perform a protected action (e.g., bidding, joining auctions).
 */
export function AuthGuardModal() {
  const { t } = useTranslation("auth");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isOpen, intent, returnUrl, closeModal } = useAuthGuardStore();

  // Create a return URL to bring the user back after authentication
  const callbackUrl = React.useMemo(() => {
    // Determine the base path (either the custom returnUrl passed to the link, or the current pathname)
    const basePath = returnUrl || pathname;

    // Ensure we handle returnUrl properly if it already contains query params
    const urlObj = new URL(basePath, "http://localhost");

    // Add existing search params from the current page IF we don't have a specific returnUrl
    // (If we have a returnUrl like /products/1, we don't need the home page search params)
    if (!returnUrl) {
      const params = new URLSearchParams(searchParams.toString());
      params.forEach((value, key) => urlObj.searchParams.set(key, value));
    }

    if (intent) {
      urlObj.searchParams.set("resume", intent);
    }

    // Return relative path + search
    return urlObj.pathname + urlObj.search;
  }, [pathname, searchParams, intent, returnUrl]);

  const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  const registerUrl = `/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
      <ResponsiveModalContent className="flex flex-col items-center gap-4 bg-card px-6 pb-4 md:max-w-[550px] md:px-7 md:pb-3">
        {/* Illustration */}
        <div className="relative aspect-square w-50 md:h-[320px] md:w-[320px]">
          <Image
            src="/img/protected.png"
            alt={t("auth-guard.illustration_alt", "Account Required")}
            fill
            className="object-contain"
            priority
          />
        </div>

        <ResponsiveModalHeader className="gap-2 p-0 text-center">
          <ResponsiveModalTitle className="text-center text-xl leading-tight font-bold text-primary-500 md:text-h4 dark:text-primary-100">
            {t("auth-guard.title", "عشان تكمل وتزايد أو تشتري لازم يكون عندك حساب.")}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="text-center text-tag font-medium text-neutral-600 opacity-70 md:text-label dark:text-neutral-200">
            {t("auth-guard.subtitle", "تسجيلك سريع وبخطوتين! ويفتح لك كل المزادات.")}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <div className="flex w-full flex-col gap-3 pt-2">
          <Button
            asChild
            className="h-[52px] w-full text-label font-bold text-neutral-10 transition-transform active:scale-95 md:h-14 md:text-body"
            rounded="md"
            onClick={closeModal}
          >
            <Link href={registerUrl}>{t("auth-guard.register", "سجل حساب جديد")}</Link>
          </Button>
          <div className="flex items-center justify-center gap-0 text-caption font-medium text-neutral-400 md:text-h5">
            <span className="text-body">{t("buyer-register.form.haveAccount")}</span>
            <Button
              asChild
              variant="ghost"
              onClick={closeModal}
              className="h-10 bg-transparent px-2 text-center text-body font-bold text-primary-500 transition-colors"
            >
              <Link href={loginUrl}>{t("buyer-register.form.loginNow")}</Link>
            </Button>
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

import * as React from "react";
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@lib/i18n/config";
import type { ProductDetails } from "./types";

// Shared layout components
import { DesktopLayout } from "./components/desktop-layout";
import { MobileLayout } from "./components/mobile-layout";

interface ViewProductContentProps {
  product: ProductDetails;
  locale: Locale;
}

export function ViewProductContent({ product, locale }: ViewProductContentProps) {
  const { t } = useTranslation(locale, "seller-dashboard");

  const noData = t("products.details.no_data");

  return (
    <>
      <DesktopLayout 
        product={product} 
        locale={locale} 
        t={t} 
        noData={noData} 
      />
      <MobileLayout 
        product={product} 
        t={t} 
        noData={noData} 
      />
    </>
  );
}

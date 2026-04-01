"use client";

import { Dialog, DialogContent, DialogTitle } from "@components/ui/dialog";
import { ViewProductContent } from "./view-product-content";
import type { Locale } from "@lib/i18n/config";
import { useTranslation } from "@lib/i18n/client";
import type { ProductDetails } from "./types";

interface ViewProductModalProps {
  product: ProductDetails | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
}

/**
 * ViewProductModal
 * Responsive wrapper for the View Product details dialog.
 */
export function ViewProductModal({ product, isOpen, onOpenChange, locale }: ViewProductModalProps) {
  const { t } = useTranslation(locale, "seller-dashboard");

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col overflow-hidden p-0 max-[1099px]:h-dvh max-[1099px]:w-screen max-[1099px]:max-w-none max-[1099px]:rounded-none sm:max-w-[1000px] md:bg-white min-[1100px]:max-h-[90vh] min-[1100px]:max-w-[1200px] min-[1100px]:rounded-3xl dark:border-border dark:bg-background"
        aria-describedby={undefined}
      >
        <div className="relative hidden items-center justify-center px-8 py-1 min-[1100px]:flex">
          <DialogTitle className="py-0 pt-4 text-h3 leading-none font-bold tracking-wider text-neutral-800 dark:text-foreground">
            {t("products.details.modal_title")}
          </DialogTitle>
        </div>
        <div className="flex items-center justify-center border-neutral-50 bg-white px-6 pt-4 pb-4 min-[1100px]:hidden dark:border-border dark:bg-background">
          <DialogTitle className="dark:text-foreground">
            {t("products.details.modal_title")}
          </DialogTitle>
        </div>

        {/* Scrollable / flex content area */}
        <div className="relative flex-1 overflow-hidden min-[1100px]:overflow-y-auto">
          <ViewProductContent product={product} locale={locale} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

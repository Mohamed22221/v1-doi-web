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
        className="flex flex-col overflow-hidden bg-white p-0 max-[1099px]:h-dvh max-[1099px]:w-screen max-[1099px]:max-w-none max-[1099px]:rounded-none sm:max-w-[1000px] min-[1100px]:max-h-[90vh] min-[1100px]:max-w-[1200px] min-[1100px]:rounded-3xl dark:bg-primary-900"
        aria-describedby={undefined}
      >
        <div className="relative hidden items-center justify-center px-8 py-1 min-[1100px]:flex">
          <DialogTitle className="pt-4 text-h3 leading-none font-bold tracking-wider text-neutral-800">
            {t("products.details.modal_title")}
          </DialogTitle>
        </div>
        <div className="flex items-center justify-center border-b border-neutral-50 px-6 pt-2 pb-4 min-[1100px]:hidden">
          <DialogTitle className="text-center text-caption font-bold tracking-wide text-neutral-800">
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

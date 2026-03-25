import * as React from "react";
import { type Locale } from "@lib/i18n/config";
import { type SellerProduct } from "@lib/api/types/seller-product";
import { Dialog, DialogContent, DialogTitle } from "@components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@components/ui/drawer";
import { useTranslation } from "@lib/i18n/client";
import { useMediaQuery } from "@/hooks/use-media-query";
import DeleteProductContent from "./delete-product-content";

interface DeleteProductModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: SellerProduct;
  locale: Locale;
}

export default function DeleteProductModal({
  isOpen,
  onOpenChange,
  product,
  locale,
}: DeleteProductModalProps) {
  const { t } = useTranslation(locale, "seller-dashboard");
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="border-none p-0 outline-none">
          <DrawerTitle className="sr-only">{t("products.actions.delete")}</DrawerTitle>
          <DeleteProductContent
            product={product}
            locale={locale}
            onCancel={() => onOpenChange(false)}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] overflow-hidden border-none p-0 outline-none">
        <DialogTitle className="sr-only">{t("products.actions.delete")}</DialogTitle>
        <DeleteProductContent
          product={product}
          locale={locale}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

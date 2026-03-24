"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client";
import { type Locale } from "@lib/i18n/config";
import { type SellerProduct } from "@lib/api/types/seller-product";
import { Button } from "@/components/ui/button";
import { useDeleteProductMutation } from "@api/hooks/use-seller-products";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@utils/cn";
import { Spinner } from "@/components/ui/spinner";

interface DeleteProductContentProps {
  product: SellerProduct;
  locale: Locale;
  onCancel: () => void;
}

/**
 * DeleteProductContent
 *
 * Shared component for product deletion confirmation.
 * Handles both regular and auction-specific warnings.
 * Adapts layout based on screen size (isMobile).
 */
export default function DeleteProductContent({
  product,
  locale,
  onCancel,
}: DeleteProductContentProps) {
  const { t } = useTranslation(locale, "common");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const deleteMutation = useDeleteProductMutation();

  const isAuction =
    product.effectiveStatus === "auction_live" || product.effectiveStatus === "auction_scheduled";

  const handleDelete = () => {
    deleteMutation.mutate(
      { id: product.id, locale },
      {
        onSuccess: () => {
          onCancel();
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 text-center md:gap-8 md:p-8">
      {/* Image: Trash.png */}
      <div className="relative flex items-center justify-center py-6">
        <Image
          src="/img/Trash.png"
          alt="Trash"
          width={isMobile ? 149.39 : 224.09}
          height={isMobile ? 116.41 : 174.62}
          className="h-auto w-auto object-contain"
          priority
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-4">
        <h3 className="text-h4 font-bold text-primary-500 md:text-h3 dark:text-primary-200">
          {isAuction
            ? t("product-actions.delete-auction-title")
            : t("product-actions.delete-confirm")}
        </h3>
        <p className="text-label text-neutral-600 md:text-body dark:text-neutral-100">
          {isAuction
            ? t("product-actions.delete-auction-description")
            : t("product-actions.delete-description")}
        </p>
        {isAuction && (
          <p className="text-label font-bold text-danger-500">
            {t("product-actions.delete-auction-warning")}
          </p>
        )}
      </div>

      {/* Footer Actions */}
      <div className={cn("mt-6 flex w-full gap-3", isMobile ? "flex-col" : "flex-row sm:gap-4")}>
        <Button
          variant="default"
          rounded="sm"
          className={cn("h-11 w-full font-medium md:h-12", !isMobile && "flex-1")}
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending && <Spinner data-icon="inline-start" />}
          {t("product-actions.confirm")}
        </Button>
        <Button
          variant="secondary"
          rounded="sm"
          className={cn("h-11 w-full font-medium md:h-12", !isMobile && "flex-1")}
          onClick={onCancel}
          disabled={deleteMutation.isPending}
        >
          {t("product-actions.cancel")}
        </Button>
      </div>
    </div>
  );
}

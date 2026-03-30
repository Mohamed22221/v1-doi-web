import * as React from "react";
import Image from "next/image";
import { type Locale } from "@lib/i18n/config";
import { useTranslation } from "@lib/i18n/client";
import { type SellerProduct } from "@lib/api/types/seller-product";
import StatusBadge from "@components/shared/status-badge";
import { Button } from "@components/ui/button";
import { EyeIcon, DeleteIcon, Riyall } from "@components/shared/icon-base/constant";
import dynamic from "next/dynamic";

const DeleteProductModal = dynamic(() => import("./delete-product-modal"), {
  ssr: false,
});

const ViewProductModal = dynamic(
  () => import("./details-product/view-product-modal").then((mod) => mod.ViewProductModal),
  {
    ssr: false,
  },
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ProductCardProps {
  product: SellerProduct;
  locale: Locale;
}

/**
 * ProductCard
 *
 * A responsive product card for the seller inventory.
 * - Desktop: Vertical layout with top image (max 434px wide).
 * - Mobile: Horizontal layout with left image (124px max height).
 *
 * Client Component (for dynamic rendering in ProductsList)
 */
export default function ProductCard({ product, locale }: ProductCardProps) {
  const { t } = useTranslation(locale, "seller-dashboard");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isModalMounted, setIsModalMounted] = React.useState(false);

  const handlePreloadModal = React.useCallback(() => {
    setIsModalMounted(true);
  }, []);

  const normalizedStatus = product.effectiveStatus?.toLowerCase() || "";
  const actionText =
    normalizedStatus === "inactive"
      ? t("products.actions.completeInfo")
      : normalizedStatus === "sold"
        ? t("products.actions.editAndRepublish")
        : t("products.actions.edit");

  return (
    <div className="group relative overflow-hidden border-b border-neutral-50 p-4 transition-all last:border-b-0 md:rounded-md md:border md:bg-white md:p-3 md:last:border-b md:hover:shadow-md dark:border-primary-500 md:dark:bg-primary-900">
      <article className="flex h-full flex-col md:block">
        <div className="flex gap-3 md:block md:gap-4">
          {/* Image Section */}
          <div className="relative shrink-0 overflow-hidden rounded-lg bg-neutral-100 md:aspect-402/175 md:w-full dark:bg-primary-900 md:dark:bg-primary-800">
            <Image
              src={product.images[0]?.url || "/img/product-placeholder.png"}
              alt={product.title}
              fill
              className="object-cover transition-transform md:group-hover:scale-105"
              sizes="(max-width: 768px) 80px, 400px"
              priority={false}
            />
            {/* Mobile Image (80x80) is handled via parent container sizing */}
            <div className="size-20 md:hidden" aria-hidden="true" />
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-between overflow-hidden md:mt-4 md:block">
            {/* Header: Title + Badge */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-body font-[400px] text-primary-800 md:text-h4 dark:text-primary-100">
                  {product.title}
                </h3>
                <StatusBadge
                  status={product.effectiveStatus}
                  locale={locale}
                  className="shrink-0 rounded-sm px-3 py-2 font-[100px] md:px-4 md:py-2"
                />
              </div>

              {/* Description (was Category) */}
              <p className="truncate text-xs font-light text-neutral-600 md:mt-1 md:text-h5 dark:text-neutral-400">
                {product.description || t("products.noDescription")}
              </p>
            </div>

            {/* Price & Icons Grouping (Mobile adjustment) */}
            <div className="mt-auto md:mt-2">
              {/* Price */}
              <div className="flex items-center gap-1 text-neutral-950 md:gap-1.5 md:font-bold dark:text-neutral-10">
                <span className="text-body leading-none md:text-h3">{product.price ?? 0}</span>
                <Riyall
                  className="h-[27px] w-[25px] pb-2 md:h-[34px] md:w-[32px]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Action Icons (UI Only for Phase 1) */}
        <div className="mt-2 flex items-center justify-end gap-2 md:mt-1">
          {normalizedStatus !== "auction_ended" && (
            <Button
              rounded="sm"
              variant="default"
              className="h-9 flex-none px-5 text-sm font-medium md:h-10"
            >
              {actionText}
            </Button>
          )}
          <button
            type="button"
            onMouseEnter={handlePreloadModal}
            onFocus={handlePreloadModal}
            onClick={() => {
              setIsModalMounted(true);
              setIsViewModalOpen(true);
            }}
            className="flex size-9 cursor-pointer items-center justify-center rounded-sm border border-neutral-50 text-primary-400 transition-colors md:size-10 md:hover:bg-neutral-50 dark:border-primary-700 dark:text-neutral-400 md:dark:hover:bg-primary-800"
            aria-label={t("products.actions.view")}
          >
            <EyeIcon className="size-6 w-fit md:size-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onMouseEnter={handlePreloadModal}
            onFocus={handlePreloadModal}
            onClick={() => {
              setIsModalMounted(true);
              setIsDeleteDialogOpen(true);
            }}
            className="dark:hover:bg-danger-900/20 flex size-9 cursor-pointer items-center justify-center rounded-sm border border-neutral-50 text-danger-400 transition-colors md:size-10 md:hover:bg-danger-50 dark:border-primary-700"
            aria-label={t("products.actions.delete")}
          >
            <DeleteIcon className="size-5 md:size-6" aria-hidden="true" />
          </button>
        </div>
      </article>

      {/* View Details Modal Lazy Loaded */}
      {isModalMounted && (
        <ViewProductModal
          isOpen={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
          product={product}
          locale={locale}
        />
      )}

      {/* Delete Confirmation Modal Lazy Loaded */}
      {isModalMounted && (
        <DeleteProductModal
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          product={product}
          locale={locale}
        />
      )}
    </div>

  );
}

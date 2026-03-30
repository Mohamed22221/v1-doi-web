import * as React from "react";
import type { Locale } from "@lib/i18n/config";
import { Button } from "@components/ui/button";
import {
  HouseIcon,
  LocationIcon,
  PencilIcon,
  TagIcon,
} from "@components/shared/icon-base/constant";
import type { ProductDetails } from "../types";

// Shared components
import { MobileImageCarousel } from "./mobile-image-carousel";
import { MobileInfoRow } from "./mobile-info-row";
import { Amount } from "./amount-display";

interface MobileLayoutProps {
  product: ProductDetails;
  locale: Locale;
  t: (key: string) => string;
  noData: string;
}

export function MobileLayout({ product, t, noData }: Omit<MobileLayoutProps, "locale">) {
  return (
    <main className="flex h-full flex-col min-[1100px]:hidden" aria-label={t("products.details.modal_title")}>
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 px-4 py-3" dir="rtl">
          {/* Image carousel */}
          <section aria-labelledby="mobile-image-carousel-heading">
            <h3 id="mobile-image-carousel-heading" className="sr-only">
              {t("products.details.sections.images")}
            </h3>
            <MobileImageCarousel
              images={product.images}
              title={product.title}
              noImageLabel={t("products.details.no_image")}
            />
          </section>

          {/* Product info card */}
          <section 
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)]"
            aria-labelledby="mobile-product-info-heading"
          >
            <h3 id="mobile-product-info-heading" className="text-right text-caption font-bold tracking-wide text-neutral-800">
              {t("products.details.sections.product_info")}
            </h3>
            <div className="flex flex-col gap-2">
              <MobileInfoRow
                label={t("products.details.fields.name")}
                value={product.title}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.brand")}
                value={undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.category")}
                value={undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.quantity")}
                value={undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.description")}
                value={product.description}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.defects")}
                value={undefined}
                noData={noData}
              />
            </div>
          </section>

          {/* Location card */}
          <section 
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)]"
            aria-labelledby="mobile-location-heading"
          >
            <div className="flex items-center justify-between">
              <PencilIcon
                className="size-4 text-neutral-400"
                aria-hidden="true"
                focusable="false"
                role="presentation"
              />
              <h3 id="mobile-location-heading" className="text-caption font-bold tracking-wide text-neutral-800">
                {t("products.details.sections.location")}
              </h3>
            </div>
            <div className="rounded-lg bg-primary-50 px-4 py-3">
              <div className="flex items-center justify-end gap-3">
                <div className="flex min-w-0 flex-1 flex-col items-end gap-2">
                  <p className="text-caption leading-none font-normal text-neutral-950">
                    {t("products.details.fields.address")}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-right text-tag font-thin text-neutral-400">{noData}</p>
                    <LocationIcon
                      className="size-4 shrink-0 text-neutral-400"
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                    />
                  </div>
                </div>
                {/* House icon */}
                <div className="flex size-[45px] shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <HouseIcon
                    className="size-7 text-primary-500"
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Pricing card */}
          <section 
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)]"
            aria-labelledby="mobile-pricing-heading"
          >
            <div className="flex items-center justify-between">
              <TagIcon
                className="size-4 text-neutral-400"
                aria-hidden="true"
                focusable="false"
                role="presentation"
              />
              <h3 id="mobile-pricing-heading" className="text-caption font-bold tracking-wide text-neutral-800">
                {t("products.details.sections.pricing")}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <MobileInfoRow
                label={t("products.details.fields.sell_type")}
                value={undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.start_price")}
                value={product.price !== null ? <Amount value={product.price} /> : undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.min_bid")}
                value={undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.min_increment")}
                value={undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.start_date")}
                value={undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.duration")}
                value={undefined}
                noData={noData}
              />
            </div>
          </section>
        </div>

        {/* Bottom padding so content doesn't sit below the sticky button */}
        <div className="h-[88px]" aria-hidden="true" />
      </div>

      {/* Sticky Edit button */}
      <footer
        className="absolute right-0 bottom-0 left-0 border-t border-neutral-50 bg-white px-4 pt-4 pb-6"
        dir="rtl"
      >
        <Button variant="default" rounded="md" size="lg" className="h-[50px] w-full">
          {t("products.details.fields.edit")}
        </Button>
      </footer>
    </main>
  );
}

import * as React from "react";
import type { Locale } from "@lib/i18n/config";
import { Button } from "@components/ui/button";
import { HouseIcon, LocationIcon, PencilIcon } from "@components/shared/icon-base/constant";
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
    <main
      className="flex h-full flex-col min-[1100px]:hidden"
      aria-label={t("products.details.modal_title")}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 px-4 py-3">
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
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)] dark:bg-card dark:shadow-none"
            aria-labelledby="mobile-product-info-heading"
          >
            <h3
              id="mobile-product-info-heading"
              className="text-right text-base font-bold tracking-wide text-neutral-800 dark:text-card-foreground"
            >
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
                value="Apple"
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.category")}
                value="Electronics"
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.quantity")}
                value={10}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.description")}
                value={product.description}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.defects")}
                value="الهاتف بدون علبته ولا الشاحن"
                noData={noData}
              />
            </div>
          </section>

          {/* Location card */}
          <section
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)] dark:bg-card dark:shadow-none"
            aria-labelledby="mobile-location-heading"
          >
            <div className="flex items-center justify-between">
              <h3
                id="mobile-location-heading"
                className="text-base font-bold tracking-wide text-neutral-800 dark:text-card-foreground"
              >
                {t("products.details.sections.location")}
              </h3>
              <PencilIcon
                className="size-4 text-primary-400 dark:text-primary"
                aria-hidden="true"
                focusable="false"
                role="presentation"
              />
            </div>
            <div className="rounded-xs bg-primary-50 px-4 py-3 dark:bg-secondary/20">
              <div className="flex items-center justify-start gap-3">
                {/* House icon */}
                <div className="flex size-[45px] shrink-0 items-center justify-center rounded-full">
                  <HouseIcon
                    className="size-7 text-primary-500"
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                  <p className="text-caption leading-none font-normal text-neutral-950 dark:text-foreground">
                    {t("products.details.fields.address")}
                  </p>
                  <div className="flex items-center gap-2">
                    <LocationIcon
                      className="size-4 shrink-0 text-neutral-400"
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                    />
                    <p className="text-right text-tag font-thin text-neutral-400">
                      الرياض، حي النخيل، شارع التخصصي
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing card */}
          <section
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)] dark:bg-card dark:shadow-none"
            aria-labelledby="mobile-pricing-heading"
          >
            <div className="flex items-center justify-between">
              <h3
                id="mobile-pricing-heading"
                className="text-base font-bold tracking-wide text-neutral-800 dark:text-card-foreground"
              >
                {t("products.details.sections.pricing")}
              </h3>
              <PencilIcon
                className="size-4 text-primary-400 dark:text-primary"
                aria-hidden="true"
                focusable="false"
                role="presentation"
              />
            </div>
            <div className="flex flex-col gap-2">
              <MobileInfoRow
                label={t("products.details.fields.sell_type")}
                value={"مزايدة لمدة محددة"}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.start_price")}
                value={product.price !== null ? <Amount value={product.price} /> : undefined}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.min_bid")}
                value={<Amount value={100} />}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.min_increment")}
                value={<Amount value={150} />}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.start_date")}
                value={"5 أكتوبر 2025 - 9:00 ص"}
                noData={noData}
              />
              <MobileInfoRow
                label={t("products.details.fields.duration")}
                value={"يوم واحد"}
                noData={noData}
              />
            </div>
          </section>
          <footer className="sticky bottom-0 rounded-2xl bg-white p-4 px-4 pt-4 pb-6 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)] dark:bg-card dark:shadow-none">
            <Button variant="default" rounded="md" size="lg" className="h-[50px] w-full">
              {t("products.details.fields.edit")}
            </Button>
          </footer>
        </div>

        {/* Bottom padding so content doesn't sit below the sticky button */}
      </div>
    </main>
  );
}

import type { Locale } from "@lib/i18n/config";
import StatusBadge from "@components/shared/status-badge";
import { Button } from "@components/ui/button";
import { HouseIcon, LocationIcon } from "@components/shared/icon-base/constant";
import type { ProductDetails } from "../types";

// Shared components
import { SectionHeading } from "./section-heading";
import { InfoRow } from "./info-row";
import { InfoGrid3 } from "./info-grid";
import { Amount } from "./amount-display";
import { DesktopImageGallery } from "./image-gallery";

interface DesktopLayoutProps {
  product: ProductDetails;
  locale: Locale;
  t: (key: string) => string;
  noData: string;
}

export function DesktopLayout({ product, locale, t, noData }: DesktopLayoutProps) {
  return (
    <main
      className="hidden h-full flex-col gap-6 px-6 min-[1100px]:flex"
      aria-label={t("products.details.modal_title")}
    >
      {/* Two-column body */}
      <div className="flex min-h-0 w-full flex-1 items-start gap-6">
        {/* RIGHT: Image gallery card */}
        <section
          className="flex w-[335px] shrink-0 flex-col gap-6 rounded-2xl border border-neutral-50 bg-white p-6 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)] dark:border-border dark:bg-card dark:shadow-none"
          aria-labelledby="image-gallery-heading"
        >
          <div id="image-gallery-heading">
            <SectionHeading>{t("products.details.sections.images")}</SectionHeading>
          </div>
          <DesktopImageGallery
            images={product.images}
            title={product.title}
            noImageLabel={t("products.details.no_image")}
          />
        </section>
        {/* LEFT: Deal info card */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 self-stretch overflow-y-auto rounded-3xl border border-neutral-50 bg-white p-6 shadow-[0px_2px_8px_0px_rgba(42,61,93,0.1)] dark:border-border dark:bg-card dark:shadow-none">
          {/* Deal information section */}
          <section className="flex w-full flex-col gap-5" aria-labelledby="deal-info-heading">
            <div id="deal-info-heading">
              <SectionHeading>{t("products.details.sections.deal_info")}</SectionHeading>
            </div>
            <div className="flex flex-col gap-5">
              {/* Row 1: brand, subcategory, category */}
              <InfoGrid3
                noData={noData}
                items={[
                  {
                    label: t("products.details.fields.category"),
                    value: "إلكترونيات",
                  },
                  {
                    label: t("products.details.fields.subcategory"),
                    value: "اجهزة محمولة",
                  },

                  {
                    label: t("products.details.fields.brand"),
                    value: undefined,
                  },
                ]}
              />
              {/* Row 2: status, quantity, product name */}
              <div className="flex w-full items-start gap-2">
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
                  <InfoRow
                    label={t("products.details.fields.name")}
                    value={product.title}
                    noData={noData}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
                  <InfoRow
                    label={t("products.details.fields.quantity")}
                    value={"50"}
                    noData={noData}
                  />
                </div>

                {/* Status cell (special – renders StatusBadge) */}
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
                  <p className="text-h5 leading-none font-bold text-neutral-400 dark:text-muted-foreground">
                    {t("products.details.fields.status")}
                  </p>
                  <StatusBadge
                    status={product.effectiveStatus}
                    locale={locale}
                    className="rounded-xl px-4 py-2"
                  />
                </div>
              </div>
              {/* Row 3: defects, description */}
              <div className="flex w-full items-start gap-2">
                <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                  <p className="text-h5 leading-none font-bold text-neutral-400 dark:text-muted-foreground">
                    {t("products.details.fields.description")}
                  </p>
                  <p className="w-full text-h5 font-thin wrap-break-word text-neutral-950 dark:text-foreground">
                    {product.description ?? (
                      <span className="text-neutral-300 dark:text-muted-foreground/30">{noData}</span>
                    )}
                  </p>
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
                  <InfoRow
                    label={t("products.details.fields.defects")}
                    value={"الهاتف بدون علبته ولا الشاحن"}
                    noData={noData}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Location section */}
          <section className="flex w-full flex-col gap-4" aria-labelledby="location-heading">
            <div id="location-heading">
              <SectionHeading>{t("products.details.sections.location")}</SectionHeading>
            </div>
            <div className="rounded-2xl bg-primary-50 p-4 dark:bg-secondary/20">
              <div className="flex items-center gap-6">
                {/* House icon */}
                <div className="flex size-[65px] shrink-0 items-center justify-center rounded-full">
                  <HouseIcon
                    className="size-13 text-primary-500"
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                  />
                </div>
                {/* Location text */}
                <div className="flex flex-col gap-3">
                  <p className="text-h5 leading-none font-bold text-neutral-950 dark:text-foreground">
                    {t("products.details.fields.address")}
                  </p>
                  <div className="flex items-center gap-2">
                    <LocationIcon
                      className="size-6 shrink-0 text-neutral-300 dark:text-muted-foreground/50"
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                    />
                    <p className="text-caption font-thin text-neutral-400 dark:text-muted-foreground">
                      الرياض، حي النخيل، شارع التخصصي
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing section */}
          <section className="flex w-full flex-col gap-4" aria-labelledby="pricing-heading">
            <div id="pricing-heading">
              <SectionHeading>{t("products.details.sections.pricing")}</SectionHeading>
            </div>
            <div className="flex flex-col gap-4">
              {/* Row 1: min bid, start price, sell type */}

              <div className="flex w-full gap-3">
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <InfoRow
                    label={t("products.details.fields.sell_type")}
                    value={undefined}
                    noData={noData}
                  />
                </div>
                <div className="r flex min-w-0 flex-1 flex-col gap-3">
                  <p className="text-h5 leading-none font-bold text-neutral-400 dark:text-muted-foreground">
                    {t("products.details.fields.start_price")}
                  </p>
                  <Amount value={product.price} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <p className="text-h5 leading-none font-bold text-neutral-400 dark:text-muted-foreground">
                    {t("products.details.fields.min_bid")}
                  </p>
                  <Amount value={product.price} />
                </div>
              </div>
              {/* Row 2: duration, start date, min increment */}
              <div className="flex w-full items-start gap-3">
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
                  <InfoRow
                    label={t("products.details.fields.duration")}
                    value={"7 أيام"}
                    noData={noData}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
                  <InfoRow
                    label={t("products.details.fields.start_date")}
                    value={"5 أكتوبر 2025 - 9:00 ص"}
                    noData={noData}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
                  <p className="text-h5 leading-none font-bold text-neutral-400 dark:text-muted-foreground">
                    {t("products.details.fields.min_increment")}
                  </p>
                  <Amount value={50} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom: Edit button */}
      <footer className="flex shrink-0 justify-end pb-7">
        <Button variant="default" rounded="md" size="lg" className="h-12 w-[250px]">
          {t("products.details.fields.edit")}
        </Button>
      </footer>
    </main>
  );
}

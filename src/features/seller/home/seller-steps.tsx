import { cacheLife } from "next/cache";
import { getTranslation } from "@lib/i18n/server";
import type { Locale } from "@lib/i18n/config";
import { PageContainer } from "@/components/template/container/page-container";
import { StepItem } from "./step-item";

interface SellerStepsProps {
  locale: Locale;
}

interface StepData {
  title: string;
  description: string;
}

/**
 * SellerSteps
 *
 * Section showing the steps to get started as a seller.
 * Uses StepItem to render responsive layouts (vertical on mobile, horizontal on desktop).
 * Cached as a Server Component.
 */
export async function SellerSteps({ locale }: SellerStepsProps) {
  "use cache";
  cacheLife("days");

  const { t } = await getTranslation(locale, "home");
  const steps = t("seller_landing.steps.items", { returnObjects: true }) as StepData[];

  if (!Array.isArray(steps)) {
    return null;
  }

  return (
    <section className="px-3 py-2 md:px-0 md:py-12">
      <PageContainer
        variant="dashboard"
        className="rounded-md bg-card py-4 md:rounded-[0rem] md:bg-transparent md:py-0"
      >

        <div className="mb-6 space-y-2 text-center md:mb-10 md:space-y-4">
          <h2 className="text-h4 font-extrabold tracking-tight text-primary-500 md:text-h1 dark:text-primary-100">
            {t("seller_landing.steps.title")}
          </h2>
          <p className="text-caption text-neutral-400 md:text-h3 md:font-bold dark:text-neutral-300">
            {t("seller_landing.steps.subtitle")}
          </p>
        </div>

        {/* Mobile View: Vertical Steps */}
        <div className="flex flex-col px-1 pb-2 md:hidden">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
              variant="vertical"
            />
          ))}
        </div>

        {/* Desktop View: Horizontal Cards */}
        <div className="relative hidden items-stretch justify-between gap-10 md:flex">
          <div
            className="absolute top-[150px] right-0 left-0 z-0 h-[1px] border-t border-dashed border-primary-200 dark:border-primary-600"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <StepItem
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
              variant="horizontal"
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

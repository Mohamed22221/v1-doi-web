"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { cn } from "@utils/cn";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSellerPaymentSchema, type SellerPaymentValues } from "./schema";

// UI Components
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Form } from "@components/ui/form";
import { Progress } from "@components/ui/progress";
import { SellerPaymentFormSkeleton } from "./seller-payment-skeleton";

// i18n
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

const SellerPaymentMethods = dynamic(
  () => import("./seller-payment-methods").then((mod) => mod.SellerPaymentMethods),
  {
    loading: () => <SellerPaymentFormSkeleton />,
  },
);

interface SellerPaymentFormProps {
  onSubmit?: (values: SellerPaymentValues) => void;
  header?: React.ReactNode;
}

export default function SellerPaymentForm({ onSubmit, header }: SellerPaymentFormProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslation(locale as Locale, "auth");

  const paymentMethods = useMemo(
    () => [
      {
        id: "bank_transfer",
        label: t("seller-payment.form.methods.bank_transfer"),
        icon: "/img/payment/card.png",
      },
      {
        id: "apple_pay",
        label: t("seller-payment.form.methods.apple_pay"),
        icon: "/img/payment/apple-pay.png",
      },
      {
        id: "mada_pay",
        label: t("seller-payment.form.methods.mada_pay"),
        icon: "/img/payment/mada-logo.png",
      },
      {
        id: "stc_bank",
        label: t("seller-payment.form.methods.stc_bank"),
        icon: "/img/payment/stc.png",
      },
    ],
    [t],
  );

  const paymentSchema = useMemo(() => getSellerPaymentSchema(t), [t]);

  const form = useForm<SellerPaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "",
    },
    mode: "onChange",
  });

  const onSubmitForm = (values: SellerPaymentValues) => {
    onSubmit?.(values);
    // console.info("Payment form submitted:", values);
    router.push(`/${locale}/seller/pending`);
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const paymentMethodSelected = !!form.watch("paymentMethod");
  const progress = paymentMethodSelected ? 100 : 0;

  return (
    <div className="flex flex-col gap-3 tablet:gap-6">
      <Form {...form}>
        <form
          id="seller-payment-form"
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="flex flex-col gap-4 tablet:gap-6"
        >
          <Card className="w-full p-6">
            {header}

            <div className="mt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[13px] font-bold text-primary-900 dark:text-neutral-50">
                <span className="text-body md:text-h5">
                  {t("seller-payment.form.payoutMethod")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-body tabular-nums md:text-h4">{progress.toFixed(1)}%</span>
                  <div className="relative flex h-2 w-2">
                    {paymentMethodSelected && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-900 opacity-75"></span>
                    )}
                    <span
                      className={cn(
                        "relative inline-flex h-2 w-2 rounded-full",
                        paymentMethodSelected ? "bg-primary-400" : "bg-neutral-300",
                      )}
                    ></span>
                  </div>
                </div>
              </div>
              <Progress
                value={progress}
                className="h-[8px] bg-neutral-100 md:h-[10px] dark:bg-neutral-700"
                indicatorClassName="bg-primary-400"
              />
            </div>

            <div className="mt-1 flex flex-col gap-3">
              <SellerPaymentMethods form={form} paymentMethods={paymentMethods} />
            </div>
          </Card>

          <Card className="flex w-full flex-col gap-6 p-6">
            <Button
              form="seller-payment-form"
              type="submit"
              className="h-[48px] w-full text-label font-bold tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
              size="lg"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {t("seller-payment.form.submit")}
            </Button>
          </Card>
        </form>
      </Form>
    </div>
  );
}

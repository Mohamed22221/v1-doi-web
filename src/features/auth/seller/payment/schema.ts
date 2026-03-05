import { z } from "zod";
import type { TFunction } from "i18next";

export const getSellerPaymentSchema = (t: TFunction) =>
  z.object({
    paymentMethod: z.string().min(1, {
      message: t("seller-payment.form.validation.methodRequired"),
    }),
  });

export type SellerPaymentValues = z.infer<ReturnType<typeof getSellerPaymentSchema>>;

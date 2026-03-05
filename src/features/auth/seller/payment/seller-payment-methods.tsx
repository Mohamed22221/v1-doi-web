import { FormField, FormItem, FormMessage } from "@components/ui/form";
import { SellerPaymentMethodItem } from "./seller-payment-method-item";
import type { UseFormReturn } from "react-hook-form";
import type { SellerPaymentValues } from "./schema";

interface SellerPaymentMethodsProps {
  form: UseFormReturn<SellerPaymentValues>;
  paymentMethods: Array<{ id: string; label: string; icon: string }>;
}

export function SellerPaymentMethods({ form, paymentMethods }: SellerPaymentMethodsProps) {
  return (
    <FormField
      control={form.control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <div className="flex flex-col gap-2">
            {paymentMethods.map((method) => (
              <SellerPaymentMethodItem
                key={method.id}
                id={method.id}
                label={method.label}
                icon={method.icon}
                selected={field.value === method.id}
                onSelect={field.onChange}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

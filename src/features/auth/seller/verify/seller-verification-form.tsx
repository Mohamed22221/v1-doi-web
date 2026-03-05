"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSellerVerificationSchema, type SellerVerificationValues } from "./schema";

// UI Components
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Form } from "@components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import { RHFCheckbox } from "@components/forms/rhf-checkbox";
import { SellerVerificationProgress } from "./seller-verification-progress";
import { IndividualFieldsSkeleton, CompanyFieldsSkeleton } from "./seller-field-skeletons";
import dynamic from "next/dynamic";

// i18n
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";
import Link from "next/link";

const SellerIndividualFields = dynamic(
  () => import("./seller-individual-fields").then((mod) => mod.SellerIndividualFields),
  {
    loading: () => <IndividualFieldsSkeleton />,
  },
);
const SellerCompanyFields = dynamic(
  () => import("./seller-company-fields").then((mod) => mod.SellerCompanyFields),
  {
    loading: () => <CompanyFieldsSkeleton />,
  },
);

interface SellerVerificationFormProps {
  onSubmit?: (values: SellerVerificationValues) => void;
  header?: React.ReactNode;
}

/**
 * SellerVerificationForm
 *
 * Implements a dual-type verification form (Individual vs Company).
 * Features:
 * - Progress bar showing completion percentage.
 * - ToggleGroup to switch between account types.
 * - Split card design for better focus.
 */
export default function SellerVerificationForm({ onSubmit, header }: SellerVerificationFormProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslation(locale as Locale, "auth");
  const [accountType, setAccountType] = useState<"individual" | "company">("individual");

  // Memoize schema
  const verificationSchema = useMemo(() => getSellerVerificationSchema(t), [t]);

  const initialDefaultValues = {
    accountType: "individual" as const,
    idNumber: "",
    idImage: "",
    companyName: "",
    contactNumber: "",
    crNumber: "",
    taxCertificate: "",
    crDocument: "",
    terms: false,
  };

  const form = useForm<SellerVerificationValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: initialDefaultValues as unknown as SellerVerificationValues,
    mode: "onChange",
  });

  const handleAccountTypeChange = (value: string) => {
    if (value === "individual" || value === "company") {
      const type = value as "individual" | "company";
      setAccountType(type);
      // Reset form to switch type correctly and avoid data mixing
      // We provide all fields with empty strings to prevent controlled/uncontrolled warnings
      const currentTerms = form.getValues("terms");
      form.reset({
        ...initialDefaultValues,
        accountType: type,
        terms: currentTerms,
      } as SellerVerificationValues);
      form.clearErrors();
    }
  };

  const onSubmitForm = (values: SellerVerificationValues) => {
    onSubmit?.(values);
    console.info("Verification form submitted:", values);
    // Simulate API delay and then redirect
    router.push(`/${locale}/seller/payment`);
  };

  return (
    <div className="flex flex-col gap-4 tablet:gap-6">
      <Form {...form}>
        <form
          id="seller-verify-form"
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="flex flex-col gap-4 tablet:gap-6"
        >
          {/* Main Verification Card */}
          <Card className="w-full p-6">
            {header}

            <div className="mt-2">
              <SellerVerificationProgress locale={locale as Locale} />
            </div>

            {/* Account Type Toggle */}
            <div className="flex justify-center">
              <ToggleGroup
                type="single"
                value={accountType}
                onValueChange={handleAccountTypeChange}
                variant="outline"
                rounded="sm"
                className="grid w-full max-w-[200px] grid-cols-2 gap-2"
              >
                <ToggleGroupItem
                  value="company"
                  className="w-full data-[state=on]:bg-primary-500 data-[state=on]:text-neutral-10 dark:data-[state=on]:bg-primary-500 dark:data-[state=on]:text-neutral-10"
                >
                  {t("seller-verify.tabs.company")}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="individual"
                  className="w-full data-[state=on]:bg-primary-500 data-[state=on]:text-neutral-10 dark:data-[state=on]:bg-primary-500 dark:data-[state=on]:text-neutral-10"
                >
                  {t("seller-verify.tabs.individual")}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Form Fields Section */}
            <div className="mt-1 flex flex-col gap-4">
              {accountType === "individual" ? (
                <SellerIndividualFields locale={locale as Locale} />
              ) : (
                <SellerCompanyFields locale={locale as Locale} />
              )}
            </div>
          </Card>

          {/* Terms and Submit Button Card */}
          <Card className="flex w-full flex-col gap-6 p-6">
            <div className="space-y-6">
              <RHFCheckbox
                control={form.control}
                name="terms"
                size="lg"
                checkboxLabel={
                  <span className="text-caption md:text-body">
                    {t("seller-verify.form.terms").split(" ").slice(0, 2).join(" ")}{" "}
                    <Link
                      href="#"
                      className="font-bold text-primary-500 underline dark:text-primary-400"
                    >
                      {t("seller-verify.form.terms").split(" ").slice(2).join(" ")}
                    </Link>
                  </span>
                }
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                form="seller-verify-form"
                type="submit"
                className="h-[48px] w-full text-label font-bold tablet:h-[50px] tablet:text-body xl:h-[56px] xl:text-lg"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {t("seller-verify.form.submit")}
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}

"use client";

import * as React from "react";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { RHFField } from "./rhf-field";
import {
  IdentityUpload,
  type IdentityUploadProps,
} from "@components/ui/file-upload/variants/identity-upload";
import type { BaseRHFProps } from "./rhf-types";

interface RHFIdentityUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
  uploadProps?: Omit<IdentityUploadProps, "onChange" | "value" | "label">;
}

/**
 * RHFIdentityUpload
 *
 * Modular RHF wrapper for the IdentityUpload component.
 * Handles floating layout and focus triggers.
 */
export function RHFIdentityUpload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  extraLabel,
  required,
  layout = "floating",
  size = "lg",
  labelWidth,
  className,
  uploadProps,
}: RHFIdentityUploadProps<TFieldValues, TName>) {
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(name, formState);

  return (
    <RHFField
      control={control}
      name={name}
      label={label}
      extraLabel={extraLabel}
      required={required}
      layout={layout}
      size={size}
      labelWidth={labelWidth}
      className={className}
    >
      {(field) => (
        <IdentityUpload
          {...uploadProps}
          {...field}
          value={field.value}
          isInvalid={!!error}
          onChange={(val) => {
            field.onChange(val);
          }}
          uploadType={uploadProps?.uploadType || "seller_document"}
        />
      )}
    </RHFField>
  );
}

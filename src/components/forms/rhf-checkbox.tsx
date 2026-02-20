"use client";

import * as React from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import { RHFField } from "./rhf-field";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import type { BaseRHFProps } from "./rhf-types";
import { cn } from "@utils/cn";

interface RHFCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
  checkboxLabel?: React.ReactNode;
  checkboxProps?: React.ComponentPropsWithoutRef<typeof Checkbox>;
  labelProps?: React.ComponentPropsWithoutRef<typeof Label>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function RHFCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  extraLabel,
  required,
  layout,
  size = "lg",
  labelWidth,
  className,
  checkboxLabel,
  checkboxProps,
  labelProps,
  containerProps,
}: RHFCheckboxProps<TFieldValues, TName>) {
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
        <div
          {...containerProps}
          className={cn("flex items-center gap-2", containerProps?.className)}
        >
          <Checkbox
            {...checkboxProps}
            size={size === "md" ? "default" : size}
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              checkboxProps?.onCheckedChange?.(checked);
            }}
          />
          {checkboxLabel && (
            <Label
              className={cn("cursor-pointer", labelProps?.className)}
              onClick={(e) => {
                field.onChange(!field.value);
                labelProps?.onClick?.(e);
              }}
              {...labelProps}
            >
              {checkboxLabel}
            </Label>
          )}
        </div>
      )}
    </RHFField>
  );
}

"use client";

import * as React from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import { RHFField } from "./rhf-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import type { BaseRHFProps } from "./rhf-types";
import { cn } from "@utils/cn";

interface RHFSelectItem {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  itemProps?: React.ComponentPropsWithoutRef<typeof SelectItem>;
}

interface RHFSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
  options: RHFSelectItem[];
  placeholder?: string;
  selectProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Select>,
    "onValueChange" | "value" | "defaultValue"
  >;
  triggerProps?: React.ComponentPropsWithoutRef<typeof SelectTrigger>;
  contentProps?: React.ComponentPropsWithoutRef<typeof SelectContent>;
  valueProps?: React.ComponentPropsWithoutRef<typeof SelectValue>;
  icon?: React.ReactNode;
}

export function RHFSelect<
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
  options,
  placeholder,
  selectProps,
  triggerProps,
  contentProps,
  valueProps,
  icon,
}: RHFSelectProps<TFieldValues, TName>) {
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
        <Select {...selectProps} onValueChange={field.onChange} value={field.value}>
          <SelectTrigger
            icon={icon}
            {...triggerProps}
            size={size === "md" ? "default" : size}
            className={cn(triggerProps?.className)}
          >
            <SelectValue placeholder={placeholder} {...valueProps} />
          </SelectTrigger>
          <SelectContent {...contentProps}>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                {...option.itemProps}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </RHFField>
  );
}

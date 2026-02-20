import type * as React from "react";
import type { FieldPath, FieldValues, Control, PathValue } from "react-hook-form";
import type { FormLayout, FormSize } from "./form-layout";

export interface BaseRHFProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: React.ReactNode;
  extraLabel?: React.ReactNode;
  required?: boolean;
  layout?: FormLayout;
  size?: FormSize;
  labelWidth?: string | number;
  className?: string;
  defaultValue?: PathValue<TFieldValues, TName>;
  rounded?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

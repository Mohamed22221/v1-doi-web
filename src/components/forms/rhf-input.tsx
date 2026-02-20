"use client"

import * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import { Input } from "@components/ui/input"
import type { BaseRHFProps } from "./rhf-types"

interface RHFInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function RHFInput<
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
    inputProps,
}: RHFInputProps<TFieldValues, TName>) {
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
            {(field) => {
                const { size: _size, ...restInputProps } = inputProps || {}
                return (
                    <Input
                        size={size === "md" ? "default" : size}
                        {...restInputProps}
                        {...field}
                        onChange={(e) => {
                            field.onChange(e)
                            inputProps?.onChange?.(e)
                        }}
                    />
                )
            }}
        </RHFField>
    )
}

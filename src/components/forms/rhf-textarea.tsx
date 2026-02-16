"use client"

import * as React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import { Textarea } from "@components/ui/textarea"
import { BaseRHFProps } from "./rhf-types"

interface RHFTextareaProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
}

export function RHFTextarea<
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
    textareaProps,
}: RHFTextareaProps<TFieldValues, TName>) {
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
                <Textarea
                    size={size === "md" ? "default" : size}
                    {...textareaProps}
                    {...field}
                    onChange={(e) => {
                        field.onChange(e)
                        textareaProps?.onChange?.(e)
                    }}
                />
            )}
        </RHFField>
    )
}

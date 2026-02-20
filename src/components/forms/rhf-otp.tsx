"use client"

import * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@components/ui/input-otp"
import type { BaseRHFProps } from "./rhf-types"

interface RHFInputOTPProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    maxLength: number
    otpProps?: Omit<React.ComponentPropsWithoutRef<typeof InputOTP>, "render">
    groupProps?: React.ComponentPropsWithoutRef<typeof InputOTPGroup>
    slotProps?: React.ComponentPropsWithoutRef<typeof InputOTPSlot>
}

export function RHFInputOTP<
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
    maxLength,
    otpProps,
    groupProps,
    slotProps,
}: RHFInputOTPProps<TFieldValues, TName>) {
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
                <InputOTP
                    {...otpProps}
                    maxLength={maxLength}
                    size={size === "md" ? "default" : size}
                    value={field.value}
                    onChange={(value) => {
                        field.onChange(value)
                        otpProps?.onChange?.(value)
                    }}

                >
                    <InputOTPGroup {...groupProps}>
                        {Array.from({ length: maxLength }).map((_, i) => (
                            <InputOTPSlot key={i} index={i} {...slotProps} />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            )}
        </RHFField>
    )
}

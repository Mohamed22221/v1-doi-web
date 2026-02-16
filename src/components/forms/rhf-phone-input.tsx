"use client"

import * as React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@components/ui/input-group"
import { BaseRHFProps } from "./rhf-types"
import { cn } from "@utils/cn"

interface RHFPhoneInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    prefix?: string
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    inputGroupProps?: React.ComponentPropsWithoutRef<typeof InputGroup>
}

export function RHFPhoneInput<
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
    prefix = "+966",
    inputProps,
    inputGroupProps,
}: RHFPhoneInputProps<TFieldValues, TName>) {
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
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { size: _size, ...restInputProps } = inputProps || {}
                return (
                    <InputGroup
                        {...inputGroupProps}
                        size={size === "md" ? "default" : size}
                        className={inputGroupProps?.className}
                    >
                        <InputGroupAddon
                            align="inline-start"
                            className={cn(
                                "rtl:order-last rtl:ps-0 rtl:pe-3",
                                layout === "floating" && "opacity-0 transition-opacity duration-200 group-focus-within/input-group:opacity-100",
                                layout === "floating" && !!field.value && "opacity-100"
                            )}
                        >
                            <InputGroupText className={cn("font-mono", layout === "floating" ? "mt-[14px]" : "")}>
                                {prefix}
                            </InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                            {...restInputProps}
                            {...field}
                            className="px-1"
                            type="tel"
                            placeholder={layout === "floating" ? " " : inputProps?.placeholder}
                            onChange={(e) => {
                                field.onChange(e)
                                inputProps?.onChange?.(e)
                            }}
                        />
                    </InputGroup>
                )
            }}
        </RHFField>
    )
}

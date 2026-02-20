"use client"

import * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import { EyeIcon, EyeOffIcon } from "@components/shared/Icon/constant"
import Icon from "@components/shared/Icon"
import { RHFField } from "./rhf-field"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@components/ui/input-group"
import type { BaseRHFProps } from "./rhf-types"
import { cn } from "@utils/cn"

interface RHFPasswordProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    inputGroupProps?: React.ComponentPropsWithoutRef<typeof InputGroup>
}

export function RHFPassword<
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
    inputGroupProps,
}: RHFPasswordProps<TFieldValues, TName>) {
    const [showPassword, setShowPassword] = React.useState(false)

    const toggleVisibility = () => setShowPassword(!showPassword)

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
                const { size: _, ...restInputProps } = inputProps || {}
                return (
                    <InputGroup
                        {...inputGroupProps}
                        size={(size === "md" ? "default" : size) as "default" | "sm" | "lg"}
                        className={inputGroupProps?.className}
                    >
                        <InputGroupInput
                            size={(size === "md" ? "default" : size) as "default" | "sm" | "lg"}
                            className={cn("mx-1 text-body", layout === "floating" ? "mx-1" : "")}
                            {...restInputProps}
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder={layout === "floating" ? " " : inputProps?.placeholder}
                            onChange={(e) => {
                                field.onChange(e)
                                inputProps?.onChange?.(e)
                            }}
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                size="icon-xs"
                                onClick={toggleVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <Icon icon={EyeOffIcon} className="size-5 text-primary-400 mx-2" />
                                ) : (
                                    <Icon icon={EyeIcon} className="size-5 text-primary-400 mx-2" />
                                )}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                )
            }}
        </RHFField>
    )
}

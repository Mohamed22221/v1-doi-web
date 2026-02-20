"use client"

import * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group"
import type { BaseRHFProps } from "./rhf-types"
import { cn } from "@utils/cn"

interface ToggleGroupOption {
    label: React.ReactNode
    value: string
}

type RHFToggleGroupProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseRHFProps<TFieldValues, TName> & {
    options: ToggleGroupOption[]
    toggleGroupClassName?: string
    itemClassName?: string
} & Omit<React.ComponentPropsWithoutRef<typeof ToggleGroup>, "type" | "value" | "defaultValue" | "onValueChange" | "size"> & {
    type?: "single" | "multiple"
}

export function RHFToggleGroup<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: RHFToggleGroupProps<TFieldValues, TName>) {
    const {
        control,
        name,
        label,
        extraLabel,
        required,
        layout,
        size = "lg",
        rounded = "full",
        labelWidth,
        className,
        options,
        toggleGroupClassName,
        itemClassName,
        defaultValue,
        ...toggleProps
    } = props

    return (
        <RHFField
            control={control}
            name={name}
            defaultValue={defaultValue}
            label={label}
            extraLabel={extraLabel}
            required={required}
            layout={layout}
            size={size}
            labelWidth={labelWidth}
            className={className}
        >
            {(field) => (
                <ToggleGroup
                    {...toggleProps}
                    type={(toggleProps.type as "single" | "multiple") || "single"}
                    spacing={toggleProps.spacing || 12}
                    size={size as "sm" | "default" | "lg"}
                    rounded={rounded}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className={cn(toggleGroupClassName)}
                >
                    {options.map((option) => (
                        <ToggleGroupItem
                            key={option.value}
                            value={option.value}
                            className={cn("toggle-button-item mt-2", itemClassName)}
                        >
                            {option.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            )}
        </RHFField>
    )
}

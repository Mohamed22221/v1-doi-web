"use client"

import * as React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import { Switch } from "@components/ui/switch"
import { BaseRHFProps } from "./rhf-types"

interface RHFSwitchProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    switchProps?: React.ComponentPropsWithoutRef<typeof Switch>
}

export function RHFSwitch<
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
    switchProps,
}: RHFSwitchProps<TFieldValues, TName>) {
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
                <Switch
                    {...switchProps}
                    size={size === "md" ? "default" : size}
                    checked={field.value}
                    onCheckedChange={(checked) => {
                        field.onChange(checked)
                        switchProps?.onCheckedChange?.(checked)
                    }}
                />
            )}
        </RHFField>
    )
}

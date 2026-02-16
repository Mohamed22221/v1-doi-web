"use client"

import * as React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import { BaseRHFProps } from "./rhf-types"
import { cn } from "@utils/cn"

interface RadioButtonOption {
    label: React.ReactNode
    value: string
    id?: string
}

export function RHFRadioButton<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: BaseRHFProps<TFieldValues, TName> & {
    options: RadioButtonOption[],
    radioGroupClassName?: string,
    itemClassName?: string,
} & React.ComponentPropsWithoutRef<typeof RadioGroup>) {
    const {
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
        radioGroupClassName,
        itemClassName,
        defaultValue,
        ...radioProps
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
                <RadioGroup
                    {...radioProps}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className={cn("radio-button-group", radioGroupClassName)}
                >
                    {options.map((option) => {
                        const id = option.id || `${name}-${option.value}`
                        return (
                            <RadioGroupItem
                                key={option.value}
                                value={option.value}
                                id={id}
                                className={cn("radio-button-item", itemClassName)}
                            >
                                <span className="relative z-10">{option.label}</span>
                            </RadioGroupItem>
                        )
                    })}
                </RadioGroup>
            )}
        </RHFField>
    )
}

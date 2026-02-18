"use client"

import * as React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { RHFField } from "./rhf-field"
import {
    Combobox,
    ComboboxInput,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxValue,
    useComboboxAnchor,
    ComboboxTrigger,
} from "@components/ui/combobox"
import dynamic from "next/dynamic"

const ComboboxContent = dynamic(() => import("@components/ui/combobox").then((mod) => mod.ComboboxContent), { ssr: false })
const ComboboxList = dynamic(() => import("@components/ui/combobox").then((mod) => mod.ComboboxList), { ssr: false })
const ComboboxItem = dynamic(() => import("@components/ui/combobox").then((mod) => mod.ComboboxItem), { ssr: false })
const ComboboxEmpty = dynamic(() => import("@components/ui/combobox").then((mod) => mod.ComboboxEmpty), { ssr: false })
import { BaseRHFProps } from "./rhf-types"
import { InputGroupAddon, InputGroupButton } from "../ui/input-group"

interface RHFComboboxOption {
    label: string
    value: string
    disabled?: boolean
}

interface RHFComboboxProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    options: RHFComboboxOption[]
    placeholder?: string
    multiple?: boolean
    emptyContent?: React.ReactNode
    comboboxProps?: React.ComponentPropsWithoutRef<typeof Combobox>
    inputProps?: Record<string, unknown> // Props for ComboboxInput or ComboboxChipsInput
}

export function RHFCombobox<
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
    placeholder = "Select...",
    multiple,
    emptyContent,
    comboboxProps,
    inputProps,
}: RHFComboboxProps<TFieldValues, TName>) {
    const anchor = useComboboxAnchor()

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
                const value = field.value ?? (multiple ? [] : "")

                const comboboxSize = size === "md" ? "default" : size

                return (
                    <Combobox
                        multiple={multiple as true}
                        value={value}
                        onValueChange={field.onChange}
                        items={options.map((opt) => opt.value)}
                        {...comboboxProps}
                    >
                        {multiple ? (
                            <ComboboxChips ref={anchor} size={comboboxSize}>
                                <ComboboxValue>
                                    {(values: string[]) => (
                                        <React.Fragment>
                                            {values.map((val) => (
                                                <ComboboxChip key={val}>
                                                    {options.find((opt) => opt.value === val)?.label || val}
                                                </ComboboxChip>
                                            ))}
                                            <ComboboxChipsInput placeholder={placeholder} {...inputProps} />
                                        </React.Fragment>
                                    )}
                                </ComboboxValue>
                                <InputGroupAddon align="inline-end" className="ms-auto flex-shrink-0">
                                    <InputGroupButton
                                        size="icon-xs"
                                        variant="ghost"
                                        asChild
                                        data-slot="input-group-button"
                                        className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
                                    >
                                        <ComboboxTrigger />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </ComboboxChips>

                        ) : (
                            <ComboboxInput ref={anchor} placeholder={placeholder} {...inputProps} size={comboboxSize} />
                        )}
                        <ComboboxContent anchor={anchor}>
                            <ComboboxEmpty>{emptyContent || "No results found."}</ComboboxEmpty>
                            <ComboboxList>
                                {(value: string) => {
                                    const option = options.find((opt) => opt.value === value)
                                    return (
                                        <ComboboxItem
                                            key={value}
                                            value={value}
                                            disabled={option?.disabled}
                                        >
                                            {option?.label || value}
                                        </ComboboxItem>
                                    )
                                }}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                )
            }}
        </RHFField>
    )
}

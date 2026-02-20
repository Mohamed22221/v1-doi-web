"use client"

import * as React from "react"
import type { ControllerProps, FieldPath, FieldValues, ControllerRenderProps } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"
import { cn } from "@utils/cn"
import { useFormLayout, type FormLayout, type FormSize } from "./form-layout"

interface RHFFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
    label?: React.ReactNode
    extraLabel?: React.ReactNode
    required?: boolean
    layout?: FormLayout
    size?: FormSize
    labelWidth?: string | number
    className?: string
    children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode
}

const SIZE_CONFIGS: Record<
    FormSize,
    { item?: string; label?: string; message: string }
> = {
    sm: {
        item: "gap-1",
        label: "text-xs",
        message: "text-[10px]",
    },
    md: {
        item: "gap-1.5",
        label: "text-sm",
        message: "text-xs",
    },
    lg: {
        item: "gap-2",
        label: "text-[var(--text-label)] font-medium",
        message: "text-sm",
    },
}

const hasValue = (value: unknown) =>
    value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0)

export function RHFField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    label,
    extraLabel,
    required,
    layout: fieldLayout,
    size: fieldSize,
    labelWidth: fieldLabelWidth,
    className,
    children,
    ...props
}: RHFFieldProps<TFieldValues, TName>) {
    const context = useFormLayout()

    const layout = fieldLayout ?? context.layout
    const size = fieldSize ?? context.size
    const labelWidth = fieldLabelWidth ?? context.labelWidth

    const flags = {
        isHorizontal: layout === "horizontal",
        isInline: layout === "inline",
        isFloating: layout === "floating",
    }

    const sizeConfig = SIZE_CONFIGS[size]

    return (
        <FormField
            {...props}
            render={({ field }) => {
                const floating = flags.isFloating

                return (
                    <FormItem
                        className={cn(
                            "group w-full",
                            flags.isInline ? "inline-flex w-auto" : "flex",
                            floating
                                ? "relative flex-col"
                                : flags.isHorizontal
                                    ? "flex-row items-center"
                                    : "flex-col",
                            !floating && sizeConfig.item,
                            className
                        )}
                        data-layout={layout}
                        data-has-value={hasValue(field.value)}
                    >
                        {label && (
                            floating ? (
                                <FormLabel
                                    className={cn(
                                        "label-floating flex items-center cursor-pointer"
                                    )}
                                >
                                    <span>{label}</span>
                                    {extraLabel && (
                                        <span className="ltr:ml-[2px] rtl:mr-[2px] text-[0.9em] opacity-70 font-normal">
                                            ({extraLabel})
                                        </span>
                                    )}
                                    {required && (
                                        <span
                                            className="text-destructive ltr:ml-[2px] rtl:mr-[2px] font-bold"
                                            aria-hidden="true"
                                        >
                                            *
                                        </span>
                                    )}
                                </FormLabel>
                            ) : (
                                <div
                                    className={cn(
                                        "flex items-center shrink-0",
                                        flags.isHorizontal && "ltr:pr-2 rtl:pl-2"
                                    )}
                                    style={
                                        flags.isHorizontal && labelWidth
                                            ? { width: labelWidth }
                                            : undefined
                                    }
                                >
                                    <FormLabel
                                        className={cn(
                                            sizeConfig.label,
                                            "flex items-center cursor-pointer"
                                        )}
                                    >
                                        {label}
                                        {required && (
                                            <span
                                                className="text-destructive ltr:ml-[2px] rtl:mr-[2px] font-bold"
                                                aria-hidden="true"
                                            >
                                                *
                                            </span>
                                        )}
                                    </FormLabel>
                                    {extraLabel && (
                                        <div className="ltr:ml-[2px] rtl:mr-[2px]">{extraLabel}</div>
                                    )}
                                </div>
                            )
                        )}

                        <div className={cn("flex-1 flex flex-col min-w-0 w-full", floating ? className : "")} >
                            <FormControl>{children(field)}</FormControl>

                            {/* Removed duplicate extraLabel for floating layout as it's now inside the label */}

                            <div className="overflow-hidden">
                                <FormMessage
                                    className={cn(
                                        "animate-in fade-in slide-in-from-top-1 duration-200",
                                        sizeConfig.message
                                    )}
                                />
                            </div>
                        </div>
                    </FormItem>
                )
            }}
        />
    )
}

"use client";

import * as React from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import { RHFField } from "./rhf-field";
import dynamic from "next/dynamic";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { CalendarIcon } from "@components/shared/icon-base/constant";
import Icon from "@components/shared/icon-base";
import { format } from "date-fns";
import { cn } from "@utils/cn";
import type { BaseRHFProps } from "./rhf-types";

const Calendar = dynamic(() => import("@components/ui/calendar").then((mod) => mod.Calendar), {
    loading: () => <div className="h-[300px] w-[280px] animate-pulse rounded-md bg-muted" />,
    ssr: false,
});

interface RHFDatePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseRHFProps<TFieldValues, TName> {
    placeholder?: string;
    dateFormat?: string;
    calendarProps?: React.ComponentPropsWithoutRef<typeof Calendar>;
    popoverProps?: React.ComponentPropsWithoutRef<typeof Popover>;
    triggerProps?: React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
    contentProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>;
    buttonProps?: React.ComponentPropsWithoutRef<typeof Button>;
}

export function RHFDatePicker<
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
    placeholder = "Pick a date",
    dateFormat = "PPP",
    calendarProps,
    popoverProps,
    triggerProps,
    contentProps,
    buttonProps,
}: RHFDatePickerProps<TFieldValues, TName>) {
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
                <Popover {...popoverProps}>
                    <PopoverTrigger asChild {...triggerProps}>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                                buttonProps?.className,
                            )}
                            {...buttonProps}
                        >
                            <Icon icon={CalendarIcon} className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, dateFormat) : <span>{placeholder}</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start" {...contentProps}>
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                            size={size === "md" ? "default" : size}
                            {...calendarProps}
                        />
                    </PopoverContent>
                </Popover>
            )}
        </RHFField>
    );
}

"use client"

import * as React from "react"

export type FormLayout = "horizontal" | "vertical" | "inline" | "floating"
export type FormSize = "sm" | "md" | "lg"

interface FormLayoutContextValue {
    layout: FormLayout
    size: FormSize
    labelWidth?: string | number
}

const FormLayoutContext = React.createContext<FormLayoutContextValue>({
    layout: "vertical",
    size: "md",
})

export function useFormLayout() {
    return React.useContext(FormLayoutContext)
}

interface FormLayoutProviderProps extends Partial<FormLayoutContextValue> {
    children: React.ReactNode
}

export function FormLayoutProvider({
    children,
    layout = "vertical",
    size = "md",
    labelWidth,
}: FormLayoutProviderProps) {
    const value = React.useMemo(
        () => ({ layout, size, labelWidth }),
        [layout, size, labelWidth]
    )

    return (
        <FormLayoutContext.Provider value={value}>
            {children}
        </FormLayoutContext.Provider>
    )
}

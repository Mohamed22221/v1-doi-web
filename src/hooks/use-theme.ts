"use client"

import * as React from "react"

export type Theme = "light" | "dark"

export function useTheme() {
    const [theme, setTheme] = React.useState<Theme>("light")

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains("dark")
            setTheme(isDark ? "dark" : "light")
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        })

        // Initial sync
        setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")

        return () => observer.disconnect()
    }, [])

    return theme
}

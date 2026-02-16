"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/lib/store/theme-store"

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore()

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="bg-background relative"
        >
            <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />
            <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`} />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

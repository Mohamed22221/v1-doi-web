"use client"

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface PasswordRule {
    id: string
    label: string
    test: (password: string) => boolean
}

interface PasswordRulesChecklistProps {
    password?: string
    title: string
    rules: {
        length: string
        lowercase: string
        uppercase: string
        number: string
        special: string
    }
    className?: string
}

export function PasswordRulesChecklist({
    password = "",
    title,
    rules,
    className,
}: PasswordRulesChecklistProps) {
    const passwordRules: PasswordRule[] = [
        {
            id: "length",
            label: rules.length,
            test: (p) => p.length >= 8,
        },
        {
            id: "lowercase",
            label: rules.lowercase,
            test: (p) => /[a-z]/.test(p),
        },
        {
            id: "uppercase",
            label: rules.uppercase,
            test: (p) => /[A-Z]/.test(p),
        },
        {
            id: "number",
            label: rules.number,
            test: (p) => /[0-9]/.test(p),
        },
        {
            id: "special",
            label: rules.special,
            test: (p) => /[^A-Za-z0-9]/.test(p),
        },
    ]

    return (
        <div className={cn("p-6 rounded-[20px] bg-background  space-y-4", className)}>
            <h3 className="font-100 md:font-bold text-neutral-950 dark:text-neutral-50 text-label md:text-h5">
                {title}
            </h3>
            <ul className="space-y-3">
                {passwordRules.map((rule) => {
                    const isSatisfied = rule.test(password)
                    return (
                        <li
                            key={rule.id}
                            className={cn(
                                "flex items-center gap-2  transition-colors duration-200",
                                isSatisfied
                                    ? "text-neutral-900 dark:text-neutral-50"
                                    : "text-neutral-400 dark:text-neutral-300"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-[16px] h-[16px] md:w-5 md:h-5 rounded-full shrink-0 transition-colors duration-200",
                                    isSatisfied
                                        ? "bg-success-400 text-white"
                                        : "bg-neutral-400 dark:bg-neutral-300 text-white dark:text-neutral-900"
                                )}
                            >
                                {isSatisfied ? (
                                    <Check className="w-2 h-2 md:w-3 md:h-3" strokeWidth={4} />
                                ) : (
                                    <X className="w-2 h-2 md:w-3 md:h-3" strokeWidth={4} />
                                )}
                            </div>
                            <span className="text-tag md:text-body">{rule.label}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

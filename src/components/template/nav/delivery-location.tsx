"use client"

import { LocationIcon, ChevronDownIcon } from "@components/shared/Icon/constant"
import Icon from "@/components/shared/Icon"

export function DeliveryLocation() {
    return (
        <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => console.info("Change location clicked")}
        >
            {/* Icon Container with specific dot style */}
            <div className="relative shrink-0">
                <div className="size-[48px] md:size-[52px] rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                    <Icon icon={LocationIcon} className="size-6 md:size-7" />
                </div>
                {/* Dark dot at top-right (logical) */}
                <div className="absolute -top-0.5 inset-inline-end-[-0.5px] size-4 rounded-full bg-primary-800 border-2 border-primary-400 dark:bg-primary-700   dark:border-primary-400" />
            </div>

            {/* Text Container */}
            <div className="flex flex-col items-start leading-[1.3]">
                <span className="text-primary-100 dark:text-white/60 text-[13px] md:text-body">
                    التوصيل إلى
                </span>
                <span className="flex items-center gap-2 text-primary-500 dark:text-neutral-200 text-[15px] md:text-h5">

                    الرياض - حي النرجس
                    <Icon icon={ChevronDownIcon} className="size-5 text-white/80 dark:text-white/60 mt-1 transition-transform group-hover:translate-y-0.5" />

                </span>
            </div>

            {/* Arrow */}
        </div>
    )
}

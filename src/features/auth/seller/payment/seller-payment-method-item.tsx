"use client";

import Image from "next/image";
import { cn } from "@utils/cn";

interface SellerPaymentMethodItemProps {
  id: string;
  label: string;
  icon: string;
  selected?: boolean;
  onSelect: (id: string) => void;
}

export function SellerPaymentMethodItem({
  id,
  label,
  icon,
  selected,
  onSelect,
}: SellerPaymentMethodItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "flex w-full items-center justify-between rounded-md border-2 p-4 transition-all duration-200",
        selected
          ? "bg-primary-50 dark:bg-primary-400"
          : "border-neutral-100 bg-white hover:border-primary-200 dark:border-neutral-800 dark:bg-primary-700",
      )}
      aria-pressed={selected}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-6 w-10 shrink-0">
          <Image src={icon} alt={label} fill className="object-contain" />
        </div>
        <span className="text-body font-medium text-neutral-800 md:text-h5 dark:text-neutral-200">
          {label}
        </span>
      </div>
    </button>
  );
}

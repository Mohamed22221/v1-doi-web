"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "@components/shared/Icon/constant"

import { cn } from "@/lib/utils/cn"

type DistributiveOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

function InputOTP({
  className,
  containerClassName,
  size = "default",
  ...props
}: DistributiveOmit<React.ComponentProps<typeof OTPInput>, "size"> & {
  containerClassName?: string
  size?: "default" | "sm" | "lg"
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "input-otp-container",
        size === "sm" && "input-otp-sm",
        size === "lg" && "input-otp-lg",
        containerClassName
      )}
      className={cn("input-otp", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("input-otp-group", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn("input-otp-slot", className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="input-otp-caret-container">
          <div className="input-otp-caret" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

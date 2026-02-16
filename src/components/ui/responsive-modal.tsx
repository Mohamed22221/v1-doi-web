"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils/cn"

type ResponsiveModalProps = React.ComponentProps<typeof Dialog> & {
    fullScreenMobile?: boolean
    showHandle?: boolean
}

const ResponsiveModalContext = React.createContext<{
    isDesktop: boolean
    fullScreenMobile?: boolean
    showHandle?: boolean
}>({ isDesktop: true })

function ResponsiveModal({
    children,
    fullScreenMobile = false,
    showHandle = true,
    ...props
}: ResponsiveModalProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const ModalProvider = isDesktop ? Dialog : Drawer

    return (
        <ResponsiveModalContext.Provider value={{ isDesktop, fullScreenMobile, showHandle }}>
            <ModalProvider {...props}>
                {children}
            </ModalProvider>
        </ResponsiveModalContext.Provider>
    )
}

function ResponsiveModalTrigger({
    ...props
}: React.ComponentProps<typeof DialogTrigger>) {
    const { isDesktop } = React.useContext(ResponsiveModalContext)
    const Trigger = isDesktop ? DialogTrigger : DrawerTrigger
    return <Trigger {...props} />
}

function ResponsiveModalContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof DialogContent>) {
    const { isDesktop, fullScreenMobile } = React.useContext(ResponsiveModalContext)

    if (isDesktop) {
        return <DialogContent className={className} {...props}>{children}</DialogContent>
    }

    return (
        <DrawerContent
            className={cn(
                fullScreenMobile && "h-[calc(100svh)] max-h-[calc(100svh)] rounded-none",
                className
            )}
            {...props}
        >
            {children}
        </DrawerContent>
    )
}

function ResponsiveModalHeader({
    className,
    ...props
}: React.ComponentProps<typeof DialogHeader>) {
    const { isDesktop } = React.useContext(ResponsiveModalContext)
    const Header = isDesktop ? DialogHeader : DrawerHeader
    return <Header className={cn(isDesktop ? "" : "text-left", className)} {...props} />
}

function ResponsiveModalTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogTitle>) {
    const { isDesktop } = React.useContext(ResponsiveModalContext)
    const Title = isDesktop ? DialogTitle : DrawerTitle
    return <Title className={className} {...props} />
}

function ResponsiveModalDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogDescription>) {
    const { isDesktop } = React.useContext(ResponsiveModalContext)
    const Description = isDesktop ? DialogDescription : DrawerDescription
    return <Description className={className} {...props} />
}

function ResponsiveModalFooter({
    className,
    ...props
}: React.ComponentProps<typeof DialogFooter>) {
    const { isDesktop } = React.useContext(ResponsiveModalContext)
    const Footer = isDesktop ? DialogFooter : DrawerFooter
    return <Footer className={cn(isDesktop ? "" : "pt-2", className)} {...props} />
}

function ResponsiveModalClose({
    ...props
}: React.ComponentProps<typeof DialogClose>) {
    const { isDesktop } = React.useContext(ResponsiveModalContext)
    const Close = isDesktop ? DialogClose : DrawerClose
    return <Close {...props} />
}

export {
    ResponsiveModal,
    ResponsiveModalTrigger,
    ResponsiveModalContent,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
    ResponsiveModalDescription,
    ResponsiveModalFooter,
    ResponsiveModalClose,
}

import type { Role } from "@defs/nav";
import type { HeaderActionRole } from "./header-actions-config";

export interface NavConfigPresets {
    showLogo: boolean;
    showNavLinks: boolean;
    roles: Role[];
    /** Maps to HeaderActionRole for filtering actions */
    actionRole: HeaderActionRole;
    /** Header position behavior: 'fixed' (overlaps content) or 'sticky' (pushes content down) */
    position?: "fixed" | "sticky";
}

export const NAV_PRESETS: Record<string, NavConfigPresets> = {
    seller: {
        showLogo: true,
        showNavLinks: true,
        roles: ["seller"],
        actionRole: "seller",
        position: "fixed",
    },
    guest: {
        showLogo: true,
        showNavLinks: true,
        roles: ["guest"],
        actionRole: "guest",
        position: "fixed",
    },
    buyer: {
        showLogo: false,
        showNavLinks: true,
        roles: ["buyer"],
        actionRole: "buyer",
        position: "sticky",
    },
};

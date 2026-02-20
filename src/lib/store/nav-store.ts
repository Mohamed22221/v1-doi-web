"use client";

import { create } from "zustand";

interface NavState {
  activeHref: string;
  setActiveHref: (href: string) => void;
}

export const useNavStore = create<NavState>((set) => ({
  activeHref: "/",
  setActiveHref: (href) => set({ activeHref: href }),
}));

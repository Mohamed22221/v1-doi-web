"use client";

import { create } from "zustand";

interface AuthGuardStore {
  isOpen: boolean;
  intent: string | null;
  returnUrl: string | null;
  openModal: (intent?: string, returnUrl?: string) => void;
  closeModal: () => void;
}

/**
 * Global store for managing the Auth Guard Modal state and the interrupted user intent.
 */
export const useAuthGuardStore = create<AuthGuardStore>((set) => ({
  isOpen: false,
  intent: null,
  returnUrl: null,
  openModal: (intent, returnUrl) => set({ isOpen: true, intent: intent || null, returnUrl: returnUrl || null }),
  closeModal: () => set({ isOpen: false, intent: null, returnUrl: null }),
}));

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  language: string;
  role: string;
  name?: string;
}

export interface OtpData {
  otpCode?: string;
  otpSessionId?: string;
  phone?: string;
  authFlow?: "registration" | "login" | "forgot-password";
}

interface AuthStore {
  // State
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  otpData: OtpData | null;
  resetToken: string | null;

  // Actions
  setAuth: (accessToken: string, refreshToken: string, user?: AuthUser) => void;
  setOtp: (otpData: OtpData) => void;
  setResetToken: (token: string) => void;
  clearOtp: () => void;
  clearAuth: () => void;
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      otpData: null,
      resetToken: null,

      setAuth: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user, otpData: null }),

      setOtp: (otpData) => set({ otpData }),
      setResetToken: (resetToken) => set({ resetToken }),
      clearOtp: () => set({ otpData: null }),
      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, user: null, otpData: null, resetToken: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          // Server-side: return no-op storage to prevent hydration errors
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return window.sessionStorage;
      }),
      // Only persist non-sensitive data client-side.
      // Real tokens live in httpOnly cookies set by the Server Action.
      partialize: (state) => ({
        user: state.user,
        otpData: state.otpData,
        resetToken: state.resetToken,
      }),
    },
  ),
);

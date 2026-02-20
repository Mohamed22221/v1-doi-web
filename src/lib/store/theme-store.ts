import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Helper to set cookie (works client-side only)
function setThemeCookie(theme: Theme) {
  if (typeof document === "undefined") return;
  // Set cookie with 1 year expiry
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

// Helper to apply theme to DOM immediately
function applyThemeToDOM(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          // Apply immediately to DOM
          applyThemeToDOM(newTheme);
          // Sync with cookie
          setThemeCookie(newTheme);
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        // Apply immediately to DOM
        applyThemeToDOM(theme);
        // Sync with cookie
        setThemeCookie(theme);
        set({ theme });
      },
    }),
    {
      name: "theme-storage",
      // On rehydration, apply theme to DOM
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeToDOM(state.theme);
          setThemeCookie(state.theme);

          // Enable smooth transitions after initial load (prevents FOUC)
          // Use requestAnimationFrame to ensure DOM is ready
          if (typeof requestAnimationFrame !== "undefined") {
            requestAnimationFrame(() => {
              document.documentElement.classList.add("theme-transitions-enabled");
            });
          }
        }
      },
    },
  ),
);

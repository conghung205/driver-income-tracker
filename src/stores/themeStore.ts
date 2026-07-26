import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";
interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: "light",
            toggleTheme: () => {
                const nextTheme = get().theme === "dark" ? "light" : "dark";
                set({ theme: nextTheme });

                if (typeof window !== "undefined") {
                    const root = window.document.documentElement;
                    if (nextTheme === "dark") {
                        root.classList.add("dark");
                    } else {
                        root.classList.remove("dark");
                    }
                }
            },

            setTheme: (theme) => {
                set({ theme });
                if (typeof window !== "undefined") {
                    const root = window.document.documentElement;
                    if (theme === "dark") {
                        root.classList.add("dark");
                    } else {
                        root.classList.remove("dark");
                    }
                }
            },
        }),
        {
            name: "theme",
        },
    ),
);

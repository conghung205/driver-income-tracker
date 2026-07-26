"use client";

import { useThemeStore } from "@/stores/themeStore";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className={`rounded-xl border ${theme === "light" ? "bg-[#c9cbd3] border-[#535355]" : "bg-bg-secondary border-bd-primary "} text-foreground hover:opacity-80 transition-all flex items-center justify-center cursor-pointer`}
            title="Đổi giao diện"
        >
            <div className="flex gap-3">
                <div
                    className={`p-1 rounded-full transition-all duration-500 ${theme === "light" ? "bg-bg-primary" : ""}`}
                >
                    <Sun
                        className={`w-5 h-5 ${theme === "light" ? "text-yellow-400" : ""}`}
                    />
                </div>
                <div
                    className={`p-1 rounded-full transition-all duration-500 ${theme === "dark" ? "bg-bg-primary" : ""}`}
                >
                    <Moon
                        className={`w-5 h-5 ${theme === "light" ? "text-slate-700" : ""}`}
                    />
                </div>
            </div>
        </button>
    );
}

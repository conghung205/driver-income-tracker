"use client";

import { useThemeStore } from "@/stores/themeStore";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={toggleTheme}
                        className={`rounded-xl border ${theme === "light" ? "bg-[#dfe2ef] border-[#535355]" : "bg-bg-secondary border-bd-primary "} text-foreground hover:opacity-80 transition-all flex items-center justify-center cursor-pointer`}
                    >
                        <div className="relative flex items-center w-full">
                            <div
                                className={`absolute z-0 top-0 bottom-0 left-0 w-1/2 bg-bg-primary rounded-full transition-transform duration-300 ease-in-out ${
                                    theme === "dark"
                                        ? "translate-x-full"
                                        : "translate-x-0"
                                }`}
                            ></div>

                            <div className="p-1 md:p-1.5 z-10 rounded-full flex items-center justify-center flex-1">
                                <Sun
                                    className={`w-3 h-3 md:w-5 md:h-5 ${theme === "light" ? "text-yellow-400" : ""}`}
                                />
                            </div>

                            <div className="p-1 md:p-1.5 z-10 rounded-full flex items-center justify-center flex-1">
                                <Moon
                                    className={`w-3 h-3 md:w-5 md:h-5 ${theme === "light" ? "text-slate-700" : ""}`}
                                />
                            </div>
                        </div>
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">Thay đổi chủ đề</p>
                </TooltipContent>
            </Tooltip>
        </>
    );
}

"use client";
import { NAV_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "./AppLogo";
import { useLogout } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function Sidebar() {
    const { mutate: logout } = useLogout();
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen">
            <div className="flex-1">
                <AppLogo
                    isMain
                    className="py-5 mb-5 px-6 border-b border-bd-primary"
                />
                <div className="px-6 flex flex-col justify-between">
                    {NAV_ITEMS.filter((item) => !item.isAction).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${
                                pathname === item.href
                                    ? "text-main font-semibold bg-main/10 border-l-2 border-main"
                                    : "text-desc"
                            } px-4 py-2 hover:text-main hover:bg-main/10 my-2 rounded-xl flex gap-2 items-center`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="py-5 border-t border-bd-primary">
                <div
                    onClick={() => logout()}
                    className="text-desc px-4 py-2 rounded-xl hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 cursor-pointer flex items-center gap-2"
                >
                    <LogOut size={20} />
                    Đăng xuất
                </div>
            </div>
        </aside>
    );
}

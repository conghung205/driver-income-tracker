"use client";
import { NAV_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();
    return (
        <>
            <nav className="flex bg-header md:hidden">
                <div className="px-5 flex w-full justify-between items-center">
                    {NAV_ITEMS.map((item) =>
                        item.isAction ? (
                            <button
                                key={item.href}
                                className="bg-main -mt-6 p-3 text-white rounded-full shadow-lg"
                            >
                                <item.icon size={24} />
                            </button>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${
                                    pathname === item.href
                                        ? "text-main font-semibold"
                                        : "text-desc"
                                } px-2 py-1 hover:text-main hover:bg-main/10 my-2 rounded-xl flex flex-col gap-2 items-center`}
                            >
                                <item.icon size={16} />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        ),
                    )}
                </div>
            </nav>
        </>
    );
}

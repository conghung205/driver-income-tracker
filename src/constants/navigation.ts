import { LayoutDashboard, List, BarChart2, User, Plus } from "lucide-react";

export const NAV_ITEMS = [
    {
        label: "Tổng Quan",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Giao Dịch",
        href: "/transactions",
        icon: List,
    },
    {
        label: "Ghi Nhanh",
        href: "/quick-log",
        icon: Plus,
        isAction: true,
    },
    {
        label: "Thống Kê",
        href: "/statistics",
        icon: BarChart2,
    },
    {
        label: "Hồ Sơ",
        href: "/profile",
        icon: User,
    },
] as const;

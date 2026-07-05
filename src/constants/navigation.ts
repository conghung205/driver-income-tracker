import { LayoutDashboard, List, BarChart2, User, Plus } from "lucide-react";

export const NAV_ITEMS = [
    {
        label: "Tổng Quan",
        href: "/",
        icon: LayoutDashboard,
        isAction: false,
    },
    {
        label: "Giao Dịch",
        href: "/transactions",
        icon: List,
        isAction: false,
    },
    {
        label: "Ghi Nhanh",
        href: "",
        icon: Plus,
        isAction: true,
    },
    {
        label: "Thống Kê",
        href: "/statistics",
        icon: BarChart2,
        isAction: false,
    },
    {
        label: "Hồ Sơ",
        href: "/profile",
        icon: User,
        isAction: false,
    },
] as const;

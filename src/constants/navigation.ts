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

export const TABS_PROFILE = [
    { id: "goal", label: "Mục tiêu thu nhập" },
    { id: "personal", label: "Thông tin cá nhân" },
    { id: "security", label: "Mật khẩu & bảo mật" },
] as const;

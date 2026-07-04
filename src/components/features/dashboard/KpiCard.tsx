import { LucideIcon, TriangleAlert } from "lucide-react";
import { formatCurrency } from "@/utils/format";

interface KpiCardProps {
    title: string;
    price: number;
    Icon: LucideIcon;
    description: string;
    variant: "primary" | "success" | "danger" | "warning";
}

export default function KpiCard({
    title,
    price,
    Icon,
    description,
    variant,
}: KpiCardProps) {
    const styles = {
        primary: {
            container: "bg-main/10 border-main",
            price: "text-main",
            icon: "text-main bg-main/10",
        },
        success: {
            container: "bg-bg-secondary border-bd-primary",
            price: "text-main",
            icon: "text-main bg-main/10",
        },
        danger: {
            container: "bg-bg-secondary border-bd-primary",
            price: "text-red-500",
            icon: "bg-red-500/10 text-red-500",
        },
        warning: {
            container: "bg-amber-400/10 border-amber-400",
            price: "text-amber-400",
            icon: "bg-amber-400/10 text-amber-400",
        },
    } as const;

    const style = styles[variant];

    return (
        <div className={` ${style.container} p-5 w-full rounded-2xl border`}>
            <div className="flex justify-between mb-3">
                <h3 className="text-desc uppercase text-sm lg:text-[16px] font-semibold">
                    {title}
                </h3>{" "}
                <span className={`p-1.5 rounded-md ${style.icon}`}>
                    <Icon size={20} />
                </span>
            </div>
            <span className={` ${style.price} text-2xl flex items-center`}>
                {formatCurrency(price)}
            </span>
            <span className="text-desc text-xs flex items-center gap-2">
                {description}
                {variant === "warning" && (
                    <TriangleAlert size={12} className="text-amber-400" />
                )}
            </span>
        </div>
    );
}

import { LucideIcon, TriangleAlert } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { VARIANT_STYLES } from "@/constants/variants";

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
    const style = VARIANT_STYLES[variant];

    return (
        <div className={` ${style.container} p-5 w-full rounded-2xl border`}>
            <div className="flex justify-between">
                <h3 className="text-desc uppercase text-xs lg:text-[16px] font-semibold">
                    {title}
                </h3>{" "}
                <span className={`p-1.5 rounded-md ${style.icon}`}>
                    <Icon size={20} />
                </span>
            </div>
            <span className={` ${style.title} text-2xl flex items-center`}>
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

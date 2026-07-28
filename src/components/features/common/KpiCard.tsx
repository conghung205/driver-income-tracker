import { LucideIcon, TriangleAlert } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { VARIANT_STYLES } from "@/constants/variants";

interface KpiCardProps {
    title: string;
    price?: number;
    Icon?: LucideIcon;
    description?: string;
    variant: "primary" | "success" | "danger" | "warning";
    total?: number;
    hasTotal?: boolean;
}

export default function KpiCard({
    title,
    price,
    Icon,
    description,
    variant,
    total,
    hasTotal = false,
}: KpiCardProps) {
    const style = VARIANT_STYLES[variant];

    return (
        <div className={` ${style.container} p-5 w-full rounded-2xl border`}>
            <div className="flex md:flex-col-reverse md:items-start md:gap-2 lg:gap-0 lg:flex-row justify-between">
                <h3 className="text-desc uppercase text-xs lg:text-[16px] font-semibold">
                    {title}
                </h3>{" "}
                {Icon ? (
                    <span className={`p-1.5 rounded-md ${style.icon}`}>
                        <Icon size={20} />
                    </span>
                ) : (
                    ""
                )}
            </div>

            {hasTotal ? (
                <span
                    className={` ${style.title} md:text-lg lg:text-2xl font-semibold md:mb-3 flex items-center`}
                >
                    {total}{" "}
                    <span className="text-sm text-desc ml-2">giao dịch</span>
                </span>
            ) : (
                <span
                    className={` ${style.title} md:text-lg lg:text-2xl font-semibold md:mb-3 flex items-center`}
                >
                    {formatCurrency(price)}
                </span>
            )}
            <span className="text-desc md:mt-2 lg:mt-0 text-xs flex items-center gap-2">
                {description}
                {variant === "warning" && (
                    <TriangleAlert size={12} className="text-amber-400" />
                )}
            </span>
        </div>
    );
}

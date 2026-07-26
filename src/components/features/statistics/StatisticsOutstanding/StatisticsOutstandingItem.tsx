import { VARIANT_STYLES } from "@/constants/variants";
import { formatCurrency } from "@/utils/format";
import { LucideIcon } from "lucide-react";

interface StatisticsOutstandingItemProps {
    title: string | undefined;
    description: string | undefined;
    price: number | undefined;
    Icon: LucideIcon;
    variant: "primary" | "success" | "danger" | "warning";
}
export default function StatisticsOutstandingItem({
    title,
    description,
    price,
    Icon,
    variant,
}: StatisticsOutstandingItemProps) {
    const style = VARIANT_STYLES[variant];
    return (
        <div
            className={`p-3 md:p-5 bg-bg-primary border border-bd-primary rounded-2xl`}
        >
            <div className={`flex items-center justify-between gap-2 `}>
                <div className="flex items-center gap-3">
                    <Icon
                        className={`${style.icon} p-2 rounded-full`}
                        size={32}
                    />
                    <div>
                        <div
                            className={`text-desc text-[10px] md:text-xs font-bold uppercase`}
                        >
                            {title}
                        </div>
                        <div className="text-xs md:text-sm text-desc pt-1">
                            {description}
                        </div>
                    </div>
                </div>
                <div
                    className={`${style.title} text-xs md:text-[16px] font-bold`}
                >
                    {formatCurrency(price)}
                </div>
            </div>
        </div>
    );
}

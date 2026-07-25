import { TooltipContentProps } from "recharts";
type Props = Partial<TooltipContentProps<number, string>>;

export default function RevenueTooltip({ active, payload, label }: Props) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-bd-primary bg-bg-secondary p-3 shadow-xl">
            <p className="mb-2 hidden md:block text-xs md:text-sm font-semibold text-white">
                {label}
            </p>

            {payload.map((item) => (
                <div
                    key={item.name}
                    className="flex justify-between gap-3 md:gap-6 text-sm"
                >
                    <span
                        className="font-medium text-xs md:text-sm"
                        style={{ color: item.color }}
                    >
                        {item.name === "income" ? "Thu nhập" : "Chi phí"}
                    </span>

                    <span className="font-medium text-sm md:text-[16px] text-white">
                        {Number(item.value).toLocaleString("vi-VN")} đ
                    </span>
                </div>
            ))}
        </div>
    );
}

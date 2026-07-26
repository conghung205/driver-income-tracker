import { TooltipContentProps } from "recharts";
type Props = Partial<TooltipContentProps<number, string>>;

export default function CategoryTooltip({ active, payload }: Props) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-bd-primary bg-bg-secondary p-3 shadow-xl">
            {payload.map((item) => (
                <div
                    key={item.name}
                    className="flex justify-between gap-6 text-sm"
                >
                    <div className="flex flex-col gap-3">
                        <div
                            className="font-medium"
                            style={{ color: item.color }}
                        >
                            {item.name}
                        </div>

                        <div className="font-medium text-title">
                            {Number(item.value).toLocaleString("vi-VN")} đ
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

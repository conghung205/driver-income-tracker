import { RevenueChartI } from "@/types/statistics.type";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import RevenueTooltip from "./RevenueTooltip";
import { useIsMobile } from "@/hooks/useIsMobile";
import { BarChart3 } from "lucide-react";

interface RevenueChartProps {
    revenues: RevenueChartI[];
}
export default function RevenueChart({ revenues }: RevenueChartProps) {
    const isMobile = useIsMobile();
    const hasData =
        revenues.length > 0 &&
        revenues.some((r) => r.income > 0 || r.expense > 0);
    return (
        <div className="flex-1 bg-bg-secondary border border-bd-primary p-5 rounded-2xl">
            <h2 className="text-[16px] md:text-lg font-semibold mb-6">
                Biến động thu chi
            </h2>

            <div className="h-90">
                {hasData ? (
                    <ResponsiveContainer width="100%">
                        <BarChart data={revenues}>
                            <XAxis
                                dataKey="label"
                                tick={{
                                    fill: "#9ca3af",
                                }}
                                fontSize={14}
                            />
                            <YAxis
                                tick={{
                                    fill: "#9ca3af",
                                }}
                                width="auto"
                                fontSize={14}
                                hide={isMobile}
                                tickFormatter={(value) => {
                                    if (value >= 1000000)
                                        return `${(value / 1000000).toFixed(1)}tr`;
                                    if (value >= 1000)
                                        return `${(value / 1000).toFixed(0)}k`;
                                    return value;
                                }}
                            />
                            <CartesianGrid
                                stroke="#374151"
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <Tooltip
                                cursor={false}
                                content={<RevenueTooltip />}
                            />
                            <Legend
                                formatter={(value) =>
                                    value === "income" ? "Thu nhập" : "Chi phí"
                                }
                                wrapperStyle={{
                                    fontSize: "14px",
                                }}
                            />
                            <Bar
                                dataKey="income"
                                fill="#10b981"
                                activeBar={{
                                    fill: "#0ad390",
                                    stroke: "#0ad390",
                                }}
                                radius={[10, 10, 0, 0]}
                            />
                            <Bar
                                dataKey="expense"
                                fill="#da0f19"
                                activeBar={{
                                    fill: "#f20611",
                                    stroke: "f20611",
                                }}
                                radius={[10, 10, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800/60 flex items-center justify-center text-slate-500">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-300">
                                Chưa có dữ liệu biến động
                            </p>
                            <p className="text-xs text-slate-500 max-w-62.5">
                                Các khoản thu nhập và chi tiêu trong thời gian
                                này sẽ xuất hiện tại đây
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

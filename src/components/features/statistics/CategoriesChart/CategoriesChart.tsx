import { EXPENSE_CATEGORIES } from "@/constants/transaction";
import { StatisticsCategoriesItem } from "@/types/statistics.type";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CategoryTooltip from "./CategoryTooltip";
import { formatCurrency } from "@/utils/format";
import CategoriesLegend from "./CategoriesLegend";
import { useMemo } from "react";

interface CategoriesChartProps {
    categories: StatisticsCategoriesItem[] | undefined;
    totalAmount: number | undefined;
}

export default function CategoriesChart({
    categories = [],
    totalAmount,
}: CategoriesChartProps) {
    const COLORS = ["#10b981", "#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6"];
    const hasData = categories.length > 0;

    const formattedData = useMemo(
        () => {
            if (!hasData) {
                return [
                    {
                        category: "",
                        label: "Chưa có dữ liệu",
                        amount: 1,
                        fill: "#334155",
                        percent: 0,
                    },
                ];
            }

            return categories.map((item, index) => {
                const config = EXPENSE_CATEGORIES.find(
                    (c) => c.value === item.category,
                );
                return {
                    ...item,
                    label: config?.label,
                    fill: COLORS[index % COLORS.length],
                };
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [categories],
    );

    return (
        <div className="w-full lg:w-[32%] flex flex-col bg-bg-secondary p-5 pb-0 rounded-2xl border border-bd-primary">
            <h2 className="text-[16px] md:text-lg font-semibold mb-6">
                Cơ cấu chi phí
            </h2>

            <div className="flex-1 flex flex-col justify-between">
                <div className="relative h-50 mt-4">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                        <p className="text-desc text-xs font-medium uppercase">
                            tổng
                        </p>

                        <p className="text-sm mt-1 z-0 text-red-500 font-semibold">
                            {formatCurrency(totalAmount)}
                        </p>
                    </div>

                    <ResponsiveContainer width="100%">
                        <PieChart>
                            <Pie
                                data={formattedData}
                                dataKey="amount"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                            />

                            {hasData && (
                                <Tooltip
                                    cursor={false}
                                    content={<CategoryTooltip />}
                                    wrapperStyle={{
                                        zIndex: 50,
                                        outline: "none",
                                    }}
                                />
                            )}
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {hasData ? (
                    <CategoriesLegend formattedData={formattedData} />
                ) : (
                    <p className="text-center text-xs text-slate-500 my-6">
                        Chưa có giao dịch chi tiêu nào trong khoảng thời gian
                        này
                    </p>
                )}
            </div>
        </div>
    );
}

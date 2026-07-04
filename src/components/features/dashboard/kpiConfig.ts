import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";

export const buildKpiConfig = (
    incomeCount: number,
    expenseCount: number,
    expenseRatio: number,
) =>
    [
        {
            key: "totalIncome",
            title: "Tổng doanh thu",
            Icon: TrendingUp,
            description: `${incomeCount} giao dịch`,
            variant: "success",
        },
        {
            key: "totalExpense",
            Icon: TrendingDown,
            title: "Chi phí vận hành",
            description: `${expenseCount} khoản chi`,
            variant: "danger",
        },
        {
            key: "netIncome",
            title: "Thu nhập ròng",
            Icon: PiggyBank,
            description: `Tỉ lệ chi phí: ${expenseRatio}%`,
            variant: expenseRatio > 40 ? "warning" : "primary",
        },
    ] as const;

import { INCOME_CATEGORIES } from "@/constants/transaction";
import { ArrowDownToLine, Container, Gem, Trophy } from "lucide-react";

export const getOutstandingConfig = (
    bestDay: { amount: number; date: string } | undefined,
    worstDay: { amount: number; date: string } | undefined,
    topCategory: { amount: number; category: string } | undefined,
    avgDailyIncome: number,
) => {
    const formattedTopCategoryIncome = INCOME_CATEGORIES.find(
        (c) => c.value === topCategory?.category,
    );

    return [
        {
            key: "bestDay",
            title: "Ngày thu cao nhất",
            Icon: Trophy,
            description: bestDay?.date,
            price: bestDay?.amount,
            variant: "primary",
        },
        {
            key: "topCategory",
            Icon: Container,
            title: "Dịch vụ tốt nhất",
            description: formattedTopCategoryIncome?.label,
            price: topCategory?.amount,
            variant: "primary",
        },
        {
            key: "avgDailyIncome",
            title: "Trung bình mỗi ngày",
            Icon: Gem,
            description: "Thu nhập ròng",
            price: avgDailyIncome,
            variant: "primary",
        },
        {
            key: "worstDay",
            title: "Ngày thu ít nhất",
            Icon: ArrowDownToLine,
            description: worstDay?.date,
            price: worstDay?.amount,
            variant: "danger",
        },
    ] as const;
};

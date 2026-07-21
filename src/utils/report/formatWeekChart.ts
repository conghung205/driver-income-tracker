import { RevenueChartTransaction } from "@/types/report.type";

export const formatWeekChart = (transactions: RevenueChartTransaction[]) => {
    const frame = {
        T2: { label: "T2", income: 0, expense: 0 },
        T3: { label: "T3", income: 0, expense: 0 },
        T4: { label: "T4", income: 0, expense: 0 },
        T5: { label: "T5", income: 0, expense: 0 },
        T6: { label: "T6", income: 0, expense: 0 },
        T7: { label: "T7", income: 0, expense: 0 },
        CN: { label: "CN", income: 0, expense: 0 },
    };

    const weekdayMap: Record<string, keyof typeof frame> = {
        Mon: "T2",
        Tue: "T3",
        Wed: "T4",
        Thu: "T5",
        Fri: "T6",
        Sat: "T7",
        Sun: "CN",
    };

    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "short",
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const transaction of transactions) {
        const weekday = formatter.format(transaction.createdAt);
        const slot = weekdayMap[weekday];

        if (transaction.type === "INCOME") {
            frame[slot].income += transaction.amount;
            totalIncome += transaction.amount;
        } else {
            frame[slot].expense += transaction.amount;
            totalExpense += transaction.amount;
        }
    }

    return {
        totalIncome,
        totalExpense,
        chart: Object.values(frame),
    };
};

import { RevenueChartTransaction } from "@/types/report.type";

export const formatTodayChart = (transactions: RevenueChartTransaction[]) => {
    const frame = Array.from({ length: 24 }, (_, hour) => ({
        label: `${String(hour).padStart(2, "0")}h`,
        income: 0,
        expense: 0,
    }));
    const formatter = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "numeric",
        hour12: false,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const transaction of transactions) {
        const hour = Number(formatter.format(transaction.createdAt));
        frame[hour].label = hour + "h";

        if (transaction.type === "INCOME") {
            frame[hour].income += transaction.amount;
            totalIncome += transaction.amount;
        } else {
            frame[hour].expense += transaction.amount;
            totalExpense += transaction.amount;
        }
    }

    return {
        totalIncome,
        totalExpense,
        chart: Object.values(frame),
    };
};

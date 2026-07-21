import { RevenueChartTransaction } from "@/types/report.type";

export const formatLastMonthsChart = (
    transactions: RevenueChartTransaction[],
    months: number,
    startDate: Date,
) => {
    // dynamic frame width months
    const frame: Record<
        string,
        { label: string; income: number; expense: number }
    > = {};

    // Create frame
    for (let i = 0; i < months; i++) {
        const date = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + i,
            1,
        );
        const month = date.getMonth() + 1;
        const key = `Tháng ${month}`;
        frame[key] = { label: key, income: 0, expense: 0 };
    }

    const monthFormatter = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Ho_Chi_Minh",
        month: "numeric",
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const transaction of transactions) {
        const month = Number(monthFormatter.format(transaction.createdAt));
        const slot = `Tháng ${month}`;

        if (frame[slot]) {
            if (transaction.type === "INCOME") {
                frame[slot].income += transaction.amount;
                totalIncome += transaction.amount;
            } else {
                frame[slot].expense += transaction.amount;
                totalExpense += transaction.amount;
            }
        }
    }

    return {
        totalIncome,
        totalExpense,
        chart: Object.values(frame),
    };
};

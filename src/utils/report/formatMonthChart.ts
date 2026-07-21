import { RevenueChartTransaction } from "@/types/report.type";

export const formatMonthChart = (transactions: RevenueChartTransaction[]) => {
    const frame = {
        "Tuần 1": { label: "Tuần 1", income: 0, expense: 0 },
        "Tuần 2": { label: "Tuần 2", income: 0, expense: 0 },
        "Tuần 3": { label: "Tuần 3", income: 0, expense: 0 },
        "Tuần 4": { label: "Tuần 4", income: 0, expense: 0 },
        "Tuần 5": { label: "Tuần 5", income: 0, expense: 0 },
    };

    const formatter = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "numeric",
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const transaction of transactions) {
        const day = Number(formatter.format(transaction.createdAt));
        const weekNum = Math.ceil(day / 7);
        const slot = `Tuần ${weekNum}` as keyof typeof frame;

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

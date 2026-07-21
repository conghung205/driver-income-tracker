import { CaculateBestDayTransaction } from "@/types/report.type";

export const caculateBestDay = (transactions: CaculateBestDayTransaction[]) => {
    const dayMap: Record<string, number> = {};
    const dateFormatter = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    for (const transaction of transactions) {
        const day = dateFormatter.format(transaction.createdAt);
        dayMap[day] = (dayMap[day] || 0) + transaction.amount;
    }
    const bestDayEntry = Object.entries(dayMap).sort(
        ([, a], [, b]) => b - a,
    )[0];

    const bestDay = bestDayEntry
        ? { date: bestDayEntry[0], amount: bestDayEntry[1] }
        : null;

    return bestDay;
};

import { CaculateBestDayTransaction } from "@/types/report.type";

export const calculateDayStats = (
    transactions: CaculateBestDayTransaction[],
) => {
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
    const entries = Object.entries(dayMap);
    if (!entries.length) {
        return {
            bestDay: null,
            worstDay: null,
        };
    }

    const bestDay = entries.reduce((best, current) =>
        current[1] > best[1] ? current : best,
    );

    const worstDay = entries.reduce((worst, current) =>
        current[1] < worst[1] ? current : worst,
    );

    return {
        bestDay: {
            date: bestDay[0],
            amount: bestDay[1],
        },
        worstDay: {
            date: worstDay[0],
            amount: worstDay[1],
        },
    };
};

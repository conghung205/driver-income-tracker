import { WEEKDAYS } from "@/constants/time";

export const formatCurrency = (
    amount: number | string | null | undefined,
): string => {
    if (amount === null || amount === undefined) return "0 đ";

    const numericValue =
        typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numericValue)) return "0 đ";

    const formattedNumber = new Intl.NumberFormat("vi-VN", {
        style: "decimal",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue);

    return `${formattedNumber} đ`;
};

export function formatTransactionDate(date: string | Date) {
    const d = new Date(date);
    const now = new Date();

    const time = d.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const isToday =
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();

    if (isToday) {
        return `Hôm nay · ${time}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        d.getDate() === yesterday.getDate() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
        return `Hôm qua · ${time}`;
    }

    const weekday = WEEKDAYS[d.getDay()];

    const formattedDate = d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return `${weekday}, ${formattedDate} · ${time}`;
}

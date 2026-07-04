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

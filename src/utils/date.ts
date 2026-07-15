export function getVNDateRange(range: string) {
    const tz = "Asia/Ho_Chi_Minh";
    const now = new Date();

    // Lấy ngày hiện tại ở VN định dạng YYYY-MM-DD
    const formatter = new Intl.DateTimeFormat("sv-SE", { timeZone: tz });
    const todayStr = formatter.format(now);
    const [year, month] = todayStr.split("-").map(Number);

    const endDate = new Date(`${todayStr}T23:59:59.999+07:00`);
    let startDate: Date;

    if (range === "today") {
        startDate = new Date(`${todayStr}T00:00:00.000+07:00`);
    } else if (range === "week") {
        const targetDate = new Date(`${todayStr}T12:00:00.000+07:00`);
        const dayOfWeek = targetDate.getDay();
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        const startOfWeekDate = new Date(targetDate);
        startOfWeekDate.setDate(targetDate.getDate() + diffToMonday);

        const startOfWeekStr = formatter.format(startOfWeekDate);
        startDate = new Date(`${startOfWeekStr}T00:00:00.000+07:00`);
    } else if (range === "month") {
        const paddedMonth = String(month).padStart(2, "0");
        startDate = new Date(`${year}-${paddedMonth}-01T00:00:00.000+07:00`);
    } else if (range.startsWith("last_") && range.endsWith("_months")) {
        const match = range.match(/last_(\d+)_months/);
        const monthsToSubtract = match ? parseInt(match[1], 10) : 3;

        let startYear = year;
        let startMonth = month - monthsToSubtract + 1;

        while (startMonth <= 0) {
            startMonth += 12;
            startYear -= 1;
        }

        const paddedStartMonth = String(startMonth).padStart(2, "0");
        startDate = new Date(
            `${startYear}-${paddedStartMonth}-01T00:00:00.000+07:00`,
        );
    } else {
        const paddedMonth = String(month).padStart(2, "0");
        startDate = new Date(`${year}-${paddedMonth}-01T00:00:00.000+07:00`);
    }

    return { startDate, endDate };
}

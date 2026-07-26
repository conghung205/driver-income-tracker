import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thống Kê & Phân Tích",
    description:
        "Biểu đồ trực quan hóa cơ cấu chi phí và phân tích xu hướng thu chi.",
};

export default function StatisticsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

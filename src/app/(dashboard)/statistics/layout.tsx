import { Metadata } from "next";
import { Suspense } from "react";

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
    return (
        <>
            <Suspense
                fallback={
                    <div className="p-4 text-center">
                        Đang tải dữ liệu thống kê...
                    </div>
                }
            >
                {children}
            </Suspense>
        </>
    );
}

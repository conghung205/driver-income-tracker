import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Lịch Sử Giao Dịch",
    description:
        "Theo dõi, tìm kiếm và quản lý chi tiết các khoản thu nhập và chi tiêu hằng ngày một cách minh bạch, chính xác.",
};

export default function TransactionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Suspense
                fallback={
                    <div className="p-4 text-center">
                        Đang tải danh sách giao dịch...
                    </div>
                }
            >
                {children}
            </Suspense>
        </>
    );
}

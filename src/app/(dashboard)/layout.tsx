import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tổng Quan",
    description:
        "Bảng điều khiển tổng quan về tình hình tài chính, số dư hiện tại, biến động dòng tiền và các chỉ số thu chi mới nhất.",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-start h-screen w-full bg-bg-primary overflow-hidden">
            <Sidebar />

            <main className="flex-1 h-full flex flex-col min-w-0 overflow-hidden md:pb-0">
                <Header />

                <div className="flex-1 overflow-y-auto pb-5 pt-18 md:p-0 text-title">
                    {children}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}

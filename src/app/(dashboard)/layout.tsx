import BottomNav from "@/components/shared/BottomNav";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

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

                <div className="flex-1 overflow-y-auto pb-5 pt-18 md:p-0 text-white">
                    {children}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}

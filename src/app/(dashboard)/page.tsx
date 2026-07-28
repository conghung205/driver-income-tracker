"use client";
import AddTransactionModal from "@/components/features/dashboard/AddTransactionModal";
import KpiCard from "@/components/features/common/KpiCard";
import { getSummaryKpis } from "@/components/features/common/summaryKpiConfig";
import RecentTransactions from "@/components/features/dashboard/RecentTransactions";
import { useDashboardSummary } from "@/hooks/useDashboard";
import { useGetGoal, useGetUser } from "@/hooks/useUser";
import TargetCard from "@/components/features/dashboard/TargetCard";

export default function HomePage() {
    const { data, isLoading } = useDashboardSummary({ range: "today" });
    const { data: userData } = useGetUser();
    const { data: goal } = useGetGoal();

    const kpiConfig = getSummaryKpis(
        data?.incomeCount ?? 0,
        data?.expenseCount ?? 0,
        data?.expenseRatio ?? 0,
    );

    return (
        <div className="p-6 ">
            {/* user */}

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Tổng quan tài chính hôm nay
                    </h2>
                    <p className="text-sm text-desc">
                        Theo dõi thu nhập và hiệu suất vận hành của bạn
                    </p>
                </div>
                <div className="hidden md:flex md:mb-6">
                    <div className="flex flex-col ">
                        <p>
                            Xin chào,{" "}
                            <span className="text-main">
                                {userData?.fullName || "..."}
                            </span>
                        </p>
                        <p className="text-desc text-xs md:text-sm mt-0.5">
                            {new Date().toLocaleDateString("vi-VN", {
                                weekday: "long",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center">
                <div className="hidden md:flex">
                    <AddTransactionModal />
                </div>
            </div>
            {/* card kpi */}
            {isLoading ? (
                <div className="text-desc my-4">loading...</div>
            ) : (
                <div className="mt-8 flex flex-col gap-4 md:flex-row">
                    <TargetCard goal={goal} />
                    {kpiConfig.map((item) => (
                        <KpiCard
                            key={item.key}
                            title={item.title}
                            Icon={item.Icon}
                            description={item.description}
                            price={data?.[item.key] ?? 0}
                            variant={item.variant}
                        />
                    ))}
                </div>
            )}

            {/* RecentTransactions */}
            <div className="py-6">
                <RecentTransactions />
            </div>
        </div>
    );
}

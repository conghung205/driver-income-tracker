"use client";
import AddTransactionModal from "@/components/features/dashboard/AddTransactionModal";
import FilterCard from "@/components/features/dashboard/FilterCard";
import KpiCard from "@/components/features/dashboard/KpiCard";
import { buildKpiConfig } from "@/components/features/dashboard/kpiConfig";
import RecentTransactions from "@/components/features/dashboard/RecentTransactions";
import { FILTER_OPTIONS } from "@/constants/dashboard";
import { useDashboardSummary } from "@/hooks/useDashboard";
import { useGetUser } from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get("range") || "today";
    const { data, isLoading } = useDashboardSummary({ range: currentFilter });
    const { data: userData } = useGetUser();

    const kpiConfig = buildKpiConfig(
        data?.incomeCount ?? 0,
        data?.expenseCount ?? 0,
        data?.expenseRatio ?? 0,
    );

    const handleFilterChange = (filterId: string) => {
        // retain other search parameters, if any
        const params = new URLSearchParams(searchParams.toString());
        params.set("range", filterId);

        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="p-6 ">
            {/* user */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Tổng quan tài chính</h2>
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
            <div className="flex justify-between items-center">
                {/* filter */}
                <div className="flex gap-2.5 md:gap-3">
                    {FILTER_OPTIONS.map((option) => (
                        <FilterCard
                            key={option.id}
                            title={option.title}
                            isActive={currentFilter === option.id}
                            onClick={() => handleFilterChange(option.id)}
                        />
                    ))}
                </div>
                <div className="hidden md:flex">
                    <AddTransactionModal />
                </div>
            </div>
            {/* card kpi */}
            {isLoading ? (
                <div className="text-desc my-4">loading...</div>
            ) : (
                <div className="mt-8 flex flex-col gap-4 md:flex-row">
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

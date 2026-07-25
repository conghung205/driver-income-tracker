"use client";
import KpiCard from "@/components/features/common/KpiCard";
import { getSummaryKpis } from "@/components/features/common/summaryKpiConfig";
import CategoriesChart from "@/components/features/statistics/CategoriesChart/CategoriesChart";
import CategoriesIncome from "@/components/features/statistics/CategoriesIncome/CategoriesIncome";
import RevenueChart from "@/components/features/statistics/RevenueChart/RevenueChart";
import StatisticsHeader from "@/components/features/statistics/StatisticsHeader";
import StatisticsOutstanding from "@/components/features/statistics/StatisticsOutstanding/StatisticsOutstanding";
import { useFilter } from "@/hooks/useFilter";
import {
    useStatisticsCategories,
    useStatisticsRevenueChart,
    useStatisticsSummary,
} from "@/hooks/useStatistics";
import { Package } from "lucide-react";

export default function Statistics() {
    const { setFilter, getFilter } = useFilter();
    const currentFilter = getFilter("range", "week");
    const { data: statisticsSummary, isLoading } = useStatisticsSummary({
        range: currentFilter,
    });
    const { data: statisticsRevenueChart } = useStatisticsRevenueChart({
        range: currentFilter,
    });

    const { data: statisticsCategoriesExpense } = useStatisticsCategories({
        range: currentFilter,
        type: "EXPENSE",
    });
    const { data: statisticsCategoriesIncome } = useStatisticsCategories({
        range: currentFilter,
        type: "INCOME",
    });

    const kpiConfig = getSummaryKpis(
        statisticsSummary?.incomeCount ?? 0,
        statisticsSummary?.expenseCount ?? 0,
        statisticsSummary?.expenseRatio ?? 0,
    );

    console.log(statisticsSummary);

    return (
        <div className="p-6">
            <StatisticsHeader
                currentFilter={currentFilter}
                onFilterChange={(value) => setFilter("range", value, false)}
            />

            {/* card kpi */}
            {isLoading ? (
                <div className="text-desc my-4">loading...</div>
            ) : (
                <div className="mt-5 flex flex-col gap-4 md:flex-row ">
                    {kpiConfig.map((item) => (
                        <KpiCard
                            key={item.key}
                            title={item.title}
                            Icon={item.Icon}
                            description={item.description}
                            price={statisticsSummary?.[item.key] ?? 0}
                            variant={item.variant}
                        />
                    ))}
                    <KpiCard
                        title={"Tổng giao dịch"}
                        Icon={Package}
                        hasTotal
                        total={statisticsSummary?.totalCount}
                        variant={"success"}
                        description="Tất cả các giao dịch của bạn"
                    />
                </div>
            )}

            {/* revenue & categories EXPENSE chart */}
            <div className="mt-12 flex flex-col lg:flex-row gap-5">
                {statisticsRevenueChart?.chart && (
                    <RevenueChart revenues={statisticsRevenueChart?.chart} />
                )}
                {statisticsCategoriesExpense?.categories && (
                    <CategoriesChart
                        categories={statisticsCategoriesExpense?.categories}
                        totalAmount={statisticsCategoriesExpense.totalAmount}
                    />
                )}
            </div>

            <div className="mt-5 flex flex-col lg:flex-row gap-5">
                <div className=" w-full lg:w-[30%]">
                    <CategoriesIncome
                        categories={statisticsCategoriesIncome?.categories}
                    />
                </div>
                <div className="flex-1">
                    <StatisticsOutstanding
                        statisticsSummary={statisticsSummary}
                    />
                </div>
            </div>
        </div>
    );
}

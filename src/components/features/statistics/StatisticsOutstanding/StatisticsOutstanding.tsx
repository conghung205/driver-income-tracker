import { SummaryStatisticsData } from "@/types/statistics.type";
import { getOutstandingConfig } from "./statisticsOutstandingConfig";
import StatisticsOutstandingItem from "./StatisticsOutstandingItem";

interface StatisticsOutstandingProps {
    statisticsSummary: SummaryStatisticsData | undefined;
}

export default function StatisticsOutstanding({
    statisticsSummary,
}: StatisticsOutstandingProps) {
    const outStandingConfig = getOutstandingConfig(
        statisticsSummary?.bestDay ?? { amount: 0, date: "" },
        statisticsSummary?.worstDay ?? { amount: 0, date: "" },
        statisticsSummary?.topCategory ?? { amount: 0, category: "" },
        statisticsSummary?.avgDailyIncome ?? 0,
    );
    return (
        <div className="bg-bg-secondary p-5 rounded-2xl border border-bd-primary">
            <h2 className="text-[16px] md:text-lg font-semibold mb-6">
                Điểm nổi bật
            </h2>

            <div className="grid grid-cols-2 gap-5">
                {outStandingConfig.map((item) => (
                    <StatisticsOutstandingItem
                        key={item.key}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        Icon={item.Icon}
                        variant={item.variant}
                    />
                ))}
            </div>
        </div>
    );
}

import { INCOME_CATEGORIES } from "@/constants/transaction";
import { StatisticsCategoriesItem } from "@/types/statistics.type";
import { formatCurrency } from "@/utils/format";
import { WalletMinimal } from "lucide-react";
import { useMemo } from "react";

interface CategoriesIncomeProps {
    categories: StatisticsCategoriesItem[] | undefined;
}
export default function CategoriesIncome({
    categories = [],
}: CategoriesIncomeProps) {
    const hasData = categories.length > 0;
    const formattedData = useMemo(() => {
        return categories.map((item) => {
            const config = INCOME_CATEGORIES.find(
                (c) => c.value === item.category,
            );
            return {
                ...item,
                label: config?.label,
            };
        });
    }, [categories]);

    return (
        <div className="p-5 bg-bg-secondary border border-bd-primary rounded-2xl">
            <h2 className="text-[16px] md:text-lg font-semibold mb-6">
                Nguồn thu
            </h2>

            {hasData ? (
                formattedData.map((c, index) => (
                    <div key={index} className="my-6">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs md:text-sm font-medium text-desc">
                                {c.label}
                            </span>
                            <span className="text-desc font-semibold text-sm md:text-[16px]">
                                {formatCurrency(c.amount)}
                            </span>
                        </div>

                        {/* container progress */}
                        <div className="w-full relative bg-bg-primary h-2 rounded-full overflow-hidden">
                            {/* progress fill */}
                            <div
                                className="h-full bg-main"
                                style={{
                                    width: c.percent + "%",
                                }}
                            ></div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-500">
                        <WalletMinimal className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-300">
                            Chưa có nguồn thu
                        </p>
                        <p className="text-xs text-slate-500 max-w-62.5">
                            Các khoản thu nhập trong thời gian này sẽ xuất hiện
                            tại đây
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

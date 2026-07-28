import { GoalData } from "@/types/user.type";
import { formatCurrency } from "@/utils/format";
import { Target } from "lucide-react";

interface TargetCardProps {
    goal: GoalData | undefined;
}
export default function TargetCard({ goal }: TargetCardProps) {
    const progressPercentage = goal?.progressPercentage || 0;

    return (
        <div className={`p-5 w-full bg-main/10 rounded-2xl border border-main`}>
            <div className="flex md:flex-col-reverse md:items-start md:gap-2 lg:gap-0 lg:flex-row justify-between">
                <h3 className="text-desc uppercase text-xs lg:text-[16px] font-semibold">
                    Mục tiêu hôm nay
                </h3>
                <span className="">
                    <Target
                        size={28}
                        className="text-main bg-main/10 p-1.5 rounded-md"
                    />
                </span>
            </div>
            <span
                className={`md:text-sm lg:text-lg pt-3 font-medium text-main flex items-center`}
            >
                {formatCurrency(goal?.todayIncome)} /{" "}
                {formatCurrency(goal?.dailyGoal)}
            </span>

            {/* progressPercentage */}
            <div className="w-full mt-2 bg-bg-primary rounded-2xl">
                {/* container progress */}
                <div className="w-full relative bg-bg-primary border border-bd-primary h-3 rounded-full overflow-hidden">
                    {/* progress fill */}
                    <div
                        className="h-full bg-main"
                        style={{
                            width: progressPercentage + "%",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

import { GoalData } from "@/types/user.type";
import { formatCurrency } from "@/utils/format";

interface GoalProps {
    goal: GoalData | undefined;
    openModal(): void;
}

export default function Goal({ goal, openModal }: GoalProps) {
    const progressPercentage = goal?.progressPercentage || 0;
    return (
        <>
            <div className="p-5 bg-bg-secondary border border-bd-primary flex flex-col gap-4 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <h2 className="font-medium text-gray-200 text-[16px] md:text-lg">
                            Mục tiêu thu nhập hàng ngày
                        </h2>
                        <p className="text-desc text-sm">
                            Quản lý mục tiêu thu nhập
                        </p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="text-xs font-medium bg-main px-3 py-1.5 rounded-2xl text-gray-200 cursor-pointer hover:bg-main/90"
                    >
                        Thay đổi chỉ tiêu
                    </button>
                </div>

                <div className="flex gap-5 justify-between items-center">
                    <div className="p-5 w-full bg-bg-primary border border-bd-primary rounded-2xl">
                        <h3 className="text-desc text-sm">
                            Mục tiêu đặt ra hàng ngày
                        </h3>
                        <p className="mt-5 font-medium text-lg">
                            {formatCurrency(goal?.dailyGoal)}
                        </p>
                    </div>
                    <div className="p-5 w-full bg-bg-primary border border-bd-primary rounded-2xl">
                        <p className="text-desc text-sm">
                            Doanh thu thực tế hôm nay
                        </p>
                        <p className="mt-5 font-medium text-lg">
                            {formatCurrency(goal?.todayIncome)}
                        </p>
                    </div>
                </div>

                {/* progressPercentage */}
                <div className="p-5 w-full bg-bg-primary border border-bd-primary rounded-2xl">
                    <div className="flex justify-between mb-5">
                        <span className="text-sm font-medium text-desc">
                            Tiến độ hôm nay
                        </span>
                        <span className="text-sm font-medium text-main">
                            <span>
                                {progressPercentage < 100
                                    ? progressPercentage + "%"
                                    : "Hoàn thành"}
                            </span>
                        </span>
                    </div>

                    {/* container progress */}
                    <div className="w-full relative bg-bg-secondary h-3 rounded-full overflow-hidden">
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
        </>
    );
}

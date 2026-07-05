import {
    CATEGORY_CONFIG,
    PAYMENTMETHOD_CONFIG,
    STATUS_CONFIG,
} from "@/constants/transaction";
import { VARIANT_STYLES } from "@/constants/variants";
import { Transaction } from "@/types/transaction.type";
import { formatCurrency, formatTransactionDate } from "@/utils/format";

interface RecentTransactionItemProps {
    item: Transaction;
}

export default function RecentTransactionItem({
    item,
}: RecentTransactionItemProps) {
    const categoryConfig = CATEGORY_CONFIG[item.category];
    const statusConfig = STATUS_CONFIG[item.status];
    const paymentMethodConfig = PAYMENTMETHOD_CONFIG[item.paymentMethod];
    const IconCategory = categoryConfig.icon;
    const IconStatus = statusConfig.icon;
    const styles = VARIANT_STYLES[statusConfig.variant];
    const isIncome = item.type === "INCOME";

    return (
        <>
            <div className="flex gap-8 justify-between items-center">
                <div className="flex flex-1 gap-2 items-center">
                    <IconCategory
                        size={32}
                        className="p-2 rounded-sm bg-main/10 text-main"
                    />
                    <div>
                        <div className="text-sm font-medium">
                            {categoryConfig.label}
                        </div>
                        <div className="text-desc text-xs">
                            {formatTransactionDate(item.createdAt)} ·{" "}
                            {paymentMethodConfig.label}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:min-w-1/2 lg:min-w-2/5 md:flex-row md:justify-between md:items-center md:gap-4 items-center">
                    <div
                        className={`flex items-center gap-1 text-[10px] uppercase py-0.5 ${styles.container} ${styles.title} font-medium rounded-2xl px-2 border`}
                    >
                        <IconStatus size={12} />
                        {statusConfig.label}
                    </div>
                    <div
                        className={` ${isIncome ? "text-main" : "text-red-500"} md:text-lg font-bold`}
                    >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(item.amount)}
                    </div>
                </div>
            </div>
        </>
    );
}

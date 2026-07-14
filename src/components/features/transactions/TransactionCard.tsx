import {
    CATEGORY_CONFIG,
    PAYMENTMETHOD_CONFIG,
    STATUS_CONFIG,
} from "@/constants/transaction";
import { VARIANT_STYLES } from "@/constants/variants";
import { useModalStore } from "@/stores/modalStore";
import { Transaction } from "@/types/transaction.type";
import { formatCurrency, formatTransactionDate } from "@/utils/format";
import { Pencil, Trash2 } from "lucide-react";

interface TransactionCardProps {
    item: Transaction;
    openConfirmModal(id: string): void;
}

export default function TransactionCard({
    item,
    openConfirmModal,
}: TransactionCardProps) {
    const setOpenEditModal = useModalStore(
        (state) => state.setOpenEditTransactionModal,
    );
    const setSelectedTransaction = useModalStore(
        (state) => state.setSelectedTransaction,
    );

    // styles
    const categoryConfig = CATEGORY_CONFIG[item.category];
    const statusConfig = STATUS_CONFIG[item.status];
    const paymentMethodConfig = PAYMENTMETHOD_CONFIG[item.paymentMethod];
    const IconCategory = categoryConfig.icon;
    const IconStatus = statusConfig.icon;
    const styles = VARIANT_STYLES[statusConfig.variant];
    const isIncome = item.type === "INCOME";

    const handleClickEditModal = () => {
        setSelectedTransaction(item);
        setOpenEditModal(true);
    };

    return (
        <div className="w-full rounded-2xl p-5 pb-3 bg-bg-secondary border border-bd-primary">
            <div className="flex justify-between items-center pb-4">
                <div className="flex items-center gap-2 text-main">
                    <IconCategory
                        size={30}
                        className={`p-2 rounded-sm bg-main/10 ${isIncome ? "text-main" : "text-red-500 bg-red-500/10"}`}
                    />{" "}
                    <div className="flex flex-col gap-0">
                        <p className="text-sm font-medium">
                            {categoryConfig.label}{" "}
                        </p>
                        <span className="text-xs text-desc">
                            {formatTransactionDate(item.createdAt)}
                        </span>
                    </div>
                </div>
                <div
                    className={`xl:p-3 font-medium text-sm xl:text-[16px] ${isIncome ? "text-main" : "text-red-500"}`}
                >
                    {isIncome ? "+" : "-"} {formatCurrency(item.amount)}
                </div>
            </div>

            <div className="pt-2 border-t border-t-bd-primary flex justify-between">
                <div className="flex gap-2 items-center">
                    <div
                        className={`inline-flex items-center gap-1 text-[10px] font-medium uppercase ${styles.container} ${styles.title} font-medium rounded-2xl py-0.5 px-2 border`}
                    >
                        <IconStatus size={10} />
                        <span>{statusConfig.label}</span>
                    </div>
                    <span className="py-0.5 px-2 rounded text-desc bg-desc/10 text-sm">
                        {paymentMethodConfig.label}
                    </span>
                </div>
                <div>
                    <button
                        onClick={handleClickEditModal}
                        className="p-2 cursor-pointer hover:text-main"
                    >
                        <Pencil size={18} className="text-desc" />
                    </button>
                    <button
                        onClick={() => openConfirmModal(item.id)}
                        className="p-2 cursor-pointer hover:text-red-500"
                    >
                        <Trash2 size={18} className="text-desc" />
                    </button>
                </div>
            </div>
        </div>
    );
}

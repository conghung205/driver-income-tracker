import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    CATEGORY_CONFIG,
    PAYMENTMETHOD_CONFIG,
    STATUS_CONFIG,
} from "@/constants/transaction";
import { VARIANT_STYLES } from "@/constants/variants";
import { useModalStore } from "@/stores/modalStore";
import { Transaction } from "@/types/transaction.type";
import { formatCurrency, formatTransactionDate } from "@/utils/format";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

interface TransactionRowProps {
    item: Transaction;
    openConfirmModal(id: string): void;
}

export default function TransactionRow({
    item,
    openConfirmModal,
}: TransactionRowProps) {
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
        <>
            <TableRow className=" hover:bg-white/5 border-b-bd-primary">
                <TableCell className="xl:p-3 whitespace-pre md:whitespace-normal text-xs lg:text-sm text-desc">
                    {formatTransactionDate(item.createdAt)}
                </TableCell>
                <TableCell className="xl:p-3">
                    <div className="inline-flex text-xs lg:text-sm items-center gap-2">
                        <IconCategory
                            size={30}
                            className={`p-2 rounded-sm bg-main/10 ${isIncome ? "text-main" : "text-red-500 bg-red-500/10"}`}
                        />
                        <span>{categoryConfig.label}</span>
                    </div>
                </TableCell>
                <TableCell
                    className={`hidden lg:table-cell lg:p-3 font-medium text-xs ${isIncome ? "text-main" : "text-red-500"}`}
                >
                    {isIncome ? "Thu nhập" : "Chi phí"}
                </TableCell>
                <TableCell
                    className={`xl:p-3 font-medium text-sm xl:text-[16px] ${isIncome ? "text-main" : "text-red-500"}`}
                >
                    {formatCurrency(item.amount)}
                </TableCell>
                <TableCell
                    className={`hidden xl:p-3 xl:table-cell font-medium text-xs ${isIncome ? "text-main" : "text-red-500"}`}
                >
                    {paymentMethodConfig.label}
                </TableCell>
                <TableCell className="xl:p-3">
                    <div
                        className={`inline-flex items-center gap-1 text-[8px] xl:text-[10px] uppercase py-0.5 ${styles.container} ${styles.title} font-medium rounded-2xl px-1 xl:px-2 border`}
                    >
                        <IconStatus size={10} />
                        <span>{statusConfig.label}</span>
                    </div>
                </TableCell>
                <TableCell className="text-desc hidden lg:table-cell">
                    <button
                        onClick={handleClickEditModal}
                        className="p-2 cursor-pointer hover:text-main"
                    >
                        <Pencil size={20} />
                    </button>
                </TableCell>
                <TableCell className="text-desc hidden lg:table-cell">
                    <button
                        onClick={() => openConfirmModal(item.id)}
                        className="p-2 cursor-pointer hover:text-red-500"
                    >
                        <Trash2 size={20} />
                    </button>
                </TableCell>

                {/* options when tablet */}
                <TableCell className="text-desc text-center lg:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="cursor-pointer hover:text-main">
                                <Ellipsis size={20} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="bg-bg-secondary border border-bd-primary"
                            align="end"
                            onCloseAutoFocus={(e) => e.preventDefault()}
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={handleClickEditModal}
                                    className="justify-center font-medium text-desc focus:bg-main/10 focus:text-main"
                                >
                                    Sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => openConfirmModal(item.id)}
                                    className="justify-center font-medium text-desc focus:bg-red-500/10 focus:text-red-500"
                                >
                                    Xóa
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </>
    );
}

import { PaginationI, Transaction } from "@/types/transaction.type";
import TableTransactions from "./TableTransactions";
import TransactionCard from "./TransactionCard";
import { useTransactionDelete } from "@/hooks/useTransactionDelete";
import DialogConfirmDelete from "./DialogConfirmDelete";
import EditTransactionModal from "./EditTransactionModal";
import Pagination from "./Pagination";

interface TransactionListProps {
    transactions: Transaction[] | undefined;
    pagination: PaginationI | undefined;
}

export default function TransactionList({
    transactions,
    pagination,
}: TransactionListProps) {
    const {
        deleteId,
        isPending,
        openDeleteModal,
        confirmDelete,
        closeDeleteModal,
    } = useTransactionDelete();

    return (
        <>
            <div>
                {/* on desktop */}
                <div className="hidden md:block">
                    <TableTransactions
                        items={transactions}
                        openConfirmModal={openDeleteModal}
                    />
                </div>

                {/* on mobile */}
                <div className="flex flex-col gap-3 md:hidden ">
                    {transactions?.map((item) => (
                        <TransactionCard
                            key={item.id}
                            item={item}
                            openConfirmModal={openDeleteModal}
                        />
                    ))}
                </div>

                {/* pagination  */}
                <div className="mt-5 px-6">
                    {pagination && (
                        <Pagination
                            currentPage={pagination?.currentPage}
                            totalPages={pagination?.totalPages}
                            totalItems={pagination?.totalItems}
                            hasNextPage={pagination?.hasNextPage}
                        />
                    )}
                </div>
            </div>

            {/* DialogConfirmDelete */}
            <DialogConfirmDelete
                deleteId={deleteId}
                handleConfirmDelete={confirmDelete}
                isPending={isPending}
                closeDeleteModal={closeDeleteModal}
            />

            {/* modal edit */}
            <EditTransactionModal />
        </>
    );
}

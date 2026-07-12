"use client";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import TransactionRow from "./TransactionRow";
import { Transaction } from "@/types/transaction.type";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useDeleteTransactions } from "@/hooks/useTransaction";
import TableRowHeader from "./TableRowHeader";
import DialogConfirmDelete from "./DialogConfirmDelete";

interface TableTransactionsProps {
    items: Transaction[] | undefined;
}

export default function TableTransactions({ items }: TableTransactionsProps) {
    const { mutate: deleteTransaction, isPending } = useDeleteTransactions();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleOpenDeleteModal = (id: string) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = () => {
        if (!deleteId) return;
        deleteTransaction(deleteId, {
            onSuccess: () => setDeleteId(null),
        });
    };
    return (
        <>
            <div className="border border-bd-primary select-none rounded-2xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-header-table">
                        <TableRowHeader />
                    </TableHeader>

                    <TableBody className="bg-bg-secondary">
                        {items &&
                            items.map((item) => (
                                <TransactionRow
                                    openConfirmModal={handleOpenDeleteModal}
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>

            {/* DialogConfirmDelete */}
            <DialogConfirmDelete
                deleteId={deleteId}
                handleConfirmDelete={handleConfirmDelete}
                isPending={isPending}
                setDeleteId={setDeleteId}
            />
        </>
    );
}

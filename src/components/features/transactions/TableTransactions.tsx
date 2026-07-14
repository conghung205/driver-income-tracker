"use client";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import TransactionRow from "./TransactionRow";
import { Transaction } from "@/types/transaction.type";
import TableRowHeader from "./TableRowHeader";

interface TableTransactionsProps {
    items: Transaction[] | undefined;
    openConfirmModal(id: string): void;
}

export default function TableTransactions({
    items,
    openConfirmModal,
}: TableTransactionsProps) {
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
                                    openConfirmModal={openConfirmModal}
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

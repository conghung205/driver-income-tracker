"use client";
import EditTransactionModal from "@/components/features/transactions/EditTransactionModal";
import SearchTransactions from "@/components/features/transactions/SearchTransactions";
import TableTransactions from "@/components/features/transactions/TableTransactions";
import { useGetTransactions } from "@/hooks/useTransaction";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function TransactionPage() {
    const [isFilter, setIsFilter] = useState(false);
    const { data, isLoading } = useGetTransactions();
    const transactions = data?.data;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold">Sổ giao dịch</h2>
                    <span className="text-sm text-desc">
                        30 giao dịch tổng cộng
                    </span>
                </div>
                <div
                    onClick={() => setIsFilter(!isFilter)}
                    className={`flex items-center ${isFilter ? "bg-main/10 border border-main text-main" : "bg-bg-secondary border border-bd-primary text-desc"} cursor-pointer select-none gap-2 py-2 px-4 rounded-xl font-medium mb-6`}
                >
                    <SlidersHorizontal size={18} />
                    <span className="text-sm">Bộ lọc</span>
                </div>
            </div>

            {/* search */}
            <SearchTransactions isFilter={isFilter} />

            {/* table */}
            <div className="my-5 hidden md:block">
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <TableTransactions items={transactions} />
                )}
            </div>
            {/* modal edit */}
            <EditTransactionModal />
        </div>
    );
}

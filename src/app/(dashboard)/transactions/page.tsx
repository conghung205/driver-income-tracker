"use client";
import EditTransactionModal from "@/components/features/transactions/EditTransactionModal";
import Pagination from "@/components/features/transactions/Pagination";
import SearchTransactions from "@/components/features/transactions/SearchTransactions";
import TableTransactions from "@/components/features/transactions/TableTransactions";
import { useGetTransactions } from "@/hooks/useTransaction";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TransactionPage() {
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const searchParams = useSearchParams();

    const params = {
        type: searchParams.get("type") || undefined,
        paymentMethod: searchParams.get("paymentMethod") || undefined,
        status: searchParams.get("status") || undefined,
        range: searchParams.get("range") || undefined,
        page: Number(searchParams.get("page")) || 1,
        limit: 10,
    };

    const { data, isLoading } = useGetTransactions(params);
    const transactions = data?.data;

    const pagination = data?.pagination;

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
                    onClick={() => setIsOpenFilter(!isOpenFilter)}
                    className={`flex items-center ${isOpenFilter ? "bg-main/10 border border-main text-main" : "bg-bg-secondary border border-bd-primary text-desc"} cursor-pointer select-none gap-2 py-2 px-4 rounded-xl font-medium mb-6`}
                >
                    <SlidersHorizontal size={18} />
                    <span className="text-sm">Bộ lọc</span>
                </div>
            </div>

            {/* search */}
            <SearchTransactions isOpenFilter={isOpenFilter} />

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
    );
}

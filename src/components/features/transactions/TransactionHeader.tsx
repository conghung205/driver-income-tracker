"use client";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import SearchTransactions from "./SearchTransactions";
import { PaginationI } from "@/types/transaction.type";

interface TransactionHeaderProps {
    pagination: PaginationI | undefined;
}

export default function TransactionHeader({
    pagination,
}: TransactionHeaderProps) {
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold">Sổ giao dịch</h2>
                    <span className="text-sm text-desc">
                        {pagination?.totalItems || 0} giao dịch tổng cộng
                    </span>
                </div>
                <div
                    onClick={() => setIsOpenFilter(!isOpenFilter)}
                    className={`flex items-center ${isOpenFilter ? "bg-main/10 border border-main text-main" : "bg-bg-secondary border border-bd-primary text-desc"} cursor-pointer select-none gap-2 py-2 px-4 rounded-xl font-medium`}
                >
                    <SlidersHorizontal className="hidden md:block" size={18} />
                    <SlidersHorizontal className="block md:hidden " size={16} />
                    <span className="text-xs md:text-sm">Bộ lọc</span>
                </div>
            </div>

            {/* search */}
            <SearchTransactions isOpenFilter={isOpenFilter} />
        </div>
    );
}

"use client";
import TransactionHeader from "@/components/features/transactions/TransactionHeader";
import TransactionList from "@/components/features/transactions/TransactionList";
import { useGetTransactions } from "@/hooks/useTransaction";
import { useSearchParams } from "next/navigation";

export default function TransactionPage() {
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
            <TransactionHeader pagination={pagination} />

            {/* TransactionList */}
            <div className="my-3 md:my-5">
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <TransactionList
                        transactions={transactions}
                        pagination={pagination}
                    />
                )}
            </div>
        </div>
    );
}

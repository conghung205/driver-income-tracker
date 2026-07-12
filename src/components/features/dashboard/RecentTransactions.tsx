import { useGetTransactions } from "@/hooks/useTransaction";
import RecentTransactionItem from "./RecentTransactionItem";
import Link from "next/link";

export default function RecentTransactions() {
    const { data } = useGetTransactions({ limit: 8 });
    const transactions = data?.data;

    return (
        <div className="bg-bg-secondary rounded-2xl border border-bd-primary">
            <div className="flex justify-between p-5">
                <h2 className="font-semibold">Giao dịch gần đây</h2>
                <Link
                    href="/transactions"
                    className="text-main text-sm font-semibold hover:underline cursor-pointer"
                >
                    Xem tất cả
                </Link>
            </div>

            {/* item */}
            {transactions &&
                transactions?.map((item) => (
                    <div
                        key={item.id}
                        className="py-4 px-6 md:px-8 border-t border-bd-primary"
                    >
                        <RecentTransactionItem item={item} />
                    </div>
                ))}
        </div>
    );
}

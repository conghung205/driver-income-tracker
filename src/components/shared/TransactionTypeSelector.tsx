import { TrendingDown, TrendingUp } from "lucide-react";

interface TypeSelectorProps {
    value: "INCOME" | "EXPENSE";
    onChange: (type: "INCOME" | "EXPENSE") => void;
}

export function TransactionTypeSelector({
    value,
    onChange,
}: TypeSelectorProps) {
    return (
        <div className="bg-bg-primary flex p-2 rounded-2xl">
            <button
                onClick={() => onChange("INCOME")}
                type="button"
                className={`px-4 border font-medium ${value === "INCOME" ? "border-main bg-main/10 text-main" : "border-transparent"} rounded-2xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
            >
                <TrendingUp /> Thu nhập
            </button>
            <button
                onClick={() => onChange("EXPENSE")}
                type="button"
                className={`px-4 border font-medium ${value === "EXPENSE" ? "border-red-500 bg-red-500/10 text-red-500" : "border-transparent"} rounded-2xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
            >
                <TrendingDown /> Chi phí
            </button>
        </div>
    );
}

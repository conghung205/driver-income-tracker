import { CircleCheck, Clock } from "lucide-react";

interface TransactionStatusSelectorProps {
    value: "APPROVED" | "PENDING";
    onChange: (type: "APPROVED" | "PENDING") => void;
}

export default function TransactionStatusSelector({
    value,
    onChange,
}: TransactionStatusSelectorProps) {
    return (
        <div className="pt-4">
            <label className="text-desc font-medium">Trạng thái</label>
            <div className="flex gap-4 mt-1.5">
                <button
                    onClick={() => onChange("APPROVED")}
                    type="button"
                    className={`px-4 flex items-center gap-2 border font-medium ${value === "APPROVED" ? "bg-main/10 border-main text-main" : "bg-bg-primary"} border-bd-primary rounded-xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
                >
                    Đã xác nhận <CircleCheck size={14} />
                </button>
                <button
                    onClick={() => onChange("PENDING")}
                    type="button"
                    className={`px-4 flex items-center gap-2 border font-medium ${value === "PENDING" ? "bg-amber-500/10 border-amber-500 text-amber-500" : "bg-bg-primary border-bd-primary text-desc"}  rounded-xl flex-1 py-2 flex items-center gap-2 cursor-pointer`}
                >
                    Chờ đối soát <Clock size={14} />
                </button>
            </div>
        </div>
    );
}

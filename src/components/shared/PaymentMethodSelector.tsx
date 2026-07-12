interface PaymentMethodSelectorProps {
    value: "CASH" | "E_WALLET";
    onChange: (type: "CASH" | "E_WALLET") => void;
}

export default function PaymentMethodSelector({
    value,
    onChange,
}: PaymentMethodSelectorProps) {
    return (
        <div className="pt-4">
            <label className="text-desc font-medium">Hình thức</label>
            <div className="flex gap-4 mt-1.5">
                <button
                    onClick={() => onChange("CASH")}
                    type="button"
                    className={`px-4 border font-medium ${value === "CASH" ? "bg-main/10 border-main text-main" : "bg-bg-primary"} border-bd-primary rounded-xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
                >
                    Tiền mặt
                </button>
                <button
                    onClick={() => onChange("E_WALLET")}
                    type="button"
                    className={`px-4 border font-medium ${value === "E_WALLET" ? "bg-main/10 border-main text-main" : "bg-bg-primary"} border-bd-primary rounded-xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
                >
                    Ví điện tử
                </button>
            </div>
        </div>
    );
}

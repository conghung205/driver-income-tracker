import FilterCard from "@/components/shared/FilterCard";
import { Field } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    PAYMENT_METHOD_FILTERS,
    STATUS_FILTERS,
    TYPE_FILTERS,
} from "@/constants/transaction";
import { useFilter } from "@/hooks/useFilter";
import { SearchIcon } from "lucide-react";

interface SearchTransactionsProps {
    isFilter: boolean;
}

export default function SearchTransactions({
    isFilter,
}: SearchTransactionsProps) {
    const { setFilter, getFilter } = useFilter();

    const currentType = getFilter("type");
    const currentPaymentMethod = getFilter("paymentMethod");
    const currentStatus = getFilter("status");

    return (
        <>
            <div className="p-5 pb-7 bg-bg-secondary rounded-2xl border border-bd-primary">
                <Field className="w-full">
                    <InputGroup className="border bg-bg-primary border-bd-primary py-5">
                        <InputGroupInput
                            id="inline-start-input"
                            placeholder="Tìm kiếm theo danh mục..."
                        />
                        <InputGroupAddon align="inline-start">
                            <SearchIcon className="text-desc" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                {/* filter */}
                <div
                    className={`mt-4 gap-4 ${isFilter ? "flex" : "hidden"} flex-wrap`}
                >
                    <div className="flex items-center gap-2 md:pr-2 md:border-r md:border-r-desc">
                        <span className="text-desc text-sm">Loại:</span>
                        {TYPE_FILTERS.map((filter) => (
                            <FilterCard
                                key={filter.id}
                                title={filter.title}
                                isSmall
                                isActive={currentType === filter.id}
                                onClick={() => setFilter("type", filter.id)}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 md:pr-2 md:border-r md:border-r-desc">
                        <span className="text-desc text-sm">Hình thức:</span>
                        {PAYMENT_METHOD_FILTERS.map((filter) => (
                            <FilterCard
                                key={filter.id}
                                title={filter.title}
                                isSmall
                                isActive={currentPaymentMethod === filter.id}
                                onClick={() =>
                                    setFilter("paymentMethod", filter.id)
                                }
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-desc text-sm">Trạng thái:</span>
                        {STATUS_FILTERS.map((filter) => (
                            <FilterCard
                                key={filter.id}
                                title={filter.title}
                                isSmall
                                isActive={currentStatus === filter.id}
                                onClick={() => setFilter("status", filter.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

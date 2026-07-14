"use client";
import FilterCard from "@/components/shared/FilterCard";
import { Field } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    ALL_CATEGORIES,
    PAYMENT_METHOD_FILTERS,
    STATUS_FILTERS,
    TYPE_FILTERS,
} from "@/constants/transaction";
import { useFilter } from "@/hooks/useFilter";
import { SearchIcon } from "lucide-react";
import { useRef } from "react";

interface SearchTransactionsProps {
    isOpenFilter: boolean;
    setNoResult: (value: boolean) => void;
}

export default function SearchTransactions({
    isOpenFilter,
    setNoResult,
}: SearchTransactionsProps) {
    const { setFilter, getFilter } = useFilter();

    const currentType = getFilter("type");
    const currentPaymentMethod = getFilter("paymentMethod");
    const currentStatus = getFilter("status");

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleChangeInput = (keyword: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (!keyword.trim()) {
                setFilter("category", "all");
                setNoResult(false);
                return;
            }

            const matches = ALL_CATEGORIES.filter((c) =>
                c.label.toLowerCase().includes(keyword.toLowerCase()),
            ).map((c) => c.value);

            if (matches.length > 0) {
                setFilter("category", matches.join(","));
                setNoResult(false);
            } else {
                setNoResult(true);
                setFilter("category", "all");
            }
        }, 500);
    };

    return (
        <>
            <div className="p-3 pb-5 md:p-5 md:pb-7 bg-bg-secondary rounded-2xl border border-bd-primary">
                <Field className="w-full">
                    <InputGroup className="border bg-bg-primary border-bd-primary md:py-5">
                        <InputGroupInput
                            onChange={(e) => handleChangeInput(e.target.value)}
                            placeholder="Tìm kiếm theo danh mục..."
                        />
                        <InputGroupAddon align="inline-start">
                            <SearchIcon className="text-desc" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                {/* filter */}
                <div
                    className={`mt-4 gap-4 ${isOpenFilter ? "flex" : "hidden"} flex-wrap`}
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

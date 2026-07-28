import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FILTER_ITEMS } from "@/constants/statistics";

interface StatisticsHeaderProps {
    currentFilter: string;
    onFilterChange: (value: string) => void;
}

export default function StatisticsHeader({
    currentFilter,
    onFilterChange,
}: StatisticsHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="mb-6 w-2/3 md:w-auto">
                <h2 className="text-2xl font-semibold">Thống kê</h2>
                <p className="text-sm  text-desc">
                    Theo dõi tình hình thu nhập và chi phí của bạn
                </p>
            </div>
            <div>
                <Select value={currentFilter} onValueChange={onFilterChange}>
                    <SelectTrigger className="max-w-48 border border-bd-primary text-desc">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-primary border border-bd-primary text-desc">
                        <SelectGroup>
                            {FILTER_ITEMS.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.title}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

interface CategoriesChartDataProps {
    category: string | undefined;
    amount: number | undefined;
    percent: number | undefined;
    label: string | undefined;
    fill: string | undefined;
}

interface CategoriesLegendProps {
    formattedData: CategoriesChartDataProps[] | undefined;
}

export default function CategoriesLegend({
    formattedData = [],
}: CategoriesLegendProps) {
    return (
        <div className="space-y-2 md:space-y-5 mb-8 mt-3">
            {formattedData.map((item) => (
                <div
                    key={item.category}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-3.5 h-3.5 rounded"
                            style={{
                                background: item.fill,
                            }}
                        />

                        <span className="text-sm md:text-[16px]">
                            {item.label}
                        </span>
                    </div>

                    <span className="text-desc text-sm md:text-[16px]">
                        {item.percent}%
                    </span>
                </div>
            ))}
        </div>
    );
}

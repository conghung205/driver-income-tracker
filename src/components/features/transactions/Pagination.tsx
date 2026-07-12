import { useFilter } from "@/hooks/useFilter";
import { getPageNumbers } from "@/utils/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    hasNextPage,
}: PaginationProps) {
    const { setFilter } = useFilter();
    const pages = getPageNumbers(currentPage, totalPages);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setFilter("page", String(currentPage - 1), false);
        }
    };
    const handleNextPage = () => {
        if (hasNextPage) {
            setFilter("page", String(currentPage + 1), false);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-desc text-sm">
                    Trang {currentPage} / {totalPages} - {totalItems} giao dịch
                </div>

                <div className="flex items-center gap-2">
                    {/* Prev */}
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="p-1.5 disabled:opacity-50 disabled:cursor-not-allowed rounded text-desc border border-bd-primary bg-bg-secondary"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Page numbers */}
                    {pages.map((page, index) =>
                        page === "..." ? (
                            <span
                                key={`dots-${index}`}
                                className="text-desc px-3 py-1 "
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={`page-${page}`}
                                onClick={() =>
                                    setFilter("page", String(page), false)
                                }
                                className={`py-1 px-3 rounded border ${
                                    currentPage === page
                                        ? "bg-main/10 text-main border-main"
                                        : "text-desc border-bd-primary bg-bg-secondary"
                                }`}
                            >
                                {page}
                            </button>
                        ),
                    )}

                    {/* Next */}
                    <button
                        onClick={handleNextPage}
                        disabled={!hasNextPage}
                        className="p-1.5 disabled:opacity-50 disabled:cursor-not-allowed rounded text-desc border border-bd-primary bg-bg-secondary"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </>
    );
}

export const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pages: (number | "...")[] = [];

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
            pages.push(i);
        }
    }

    if (currentPage < totalPages - 2) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
};

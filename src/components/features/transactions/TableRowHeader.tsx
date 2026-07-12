import { TableHead, TableRow } from "@/components/ui/table";

export default function TableRowHeader() {
    return (
        <TableRow className="border-b border-b-bd-primary">
            <TableHead className="px-3 text-desc">Thời gian</TableHead>
            <TableHead className="px-3 text-desc">Danh mục</TableHead>
            <TableHead className="hidden px-3 text-desc lg:table-cell">
                Loại
            </TableHead>
            <TableHead className="px-3 text-desc">Số tiền</TableHead>
            <TableHead className="hidden px-3 text-desc xl:table-cell">
                Hình thức
            </TableHead>
            <TableHead className="px-3 text-desc">Trạng thái</TableHead>
            <TableHead colSpan={2} className="px-3 text-desc">
                Thao tác
            </TableHead>
        </TableRow>
    );
}

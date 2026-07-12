import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DialogConfirmDeleteProps {
    deleteId: string | null;
    setDeleteId(id: string | null): void;
    isPending: boolean;
    handleConfirmDelete(): void;
}

export default function DialogConfirmDelete({
    deleteId,
    setDeleteId,
    isPending,
    handleConfirmDelete,
}: DialogConfirmDeleteProps) {
    return (
        <AlertDialog
            open={!!deleteId}
            onOpenChange={(open) => !open && setDeleteId(null)}
        >
            <AlertDialogContent
                className="bg-bg-secondary border border-bd-primary"
                size="sm"
            >
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white/80">
                        Bạn có chắc chắn muốn xóa không?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-desc">
                        Hành động này không thể hoàn tác. Giao dịch này sẽ bị
                        xóa vĩnh viễn khỏi hệ thống.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="bg-bg-secondary border-t border-bd-primary">
                    <AlertDialogCancel
                        className="bg-red-600 cursor-pointer text-white/80 border-0 hover:bg-red-500 hover:text-white"
                        disabled={isPending}
                        onClick={() => setDeleteId(null)}
                    >
                        Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-main! hover:bg-main/85! cursor-pointer text-white"
                        disabled={isPending}
                        onClick={handleConfirmDelete}
                    >
                        {isPending ? "Đang xóa..." : "Xác nhận"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

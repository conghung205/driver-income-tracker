import { transactionServices } from "@/services/transaction.service";
import { ApiError } from "@/types/auth.type";
import {
    CreateTransactionPayload,
    TransactionParams,
    UpdateTransactionPayload,
} from "@/types/transaction.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTransactionPayload) =>
            transactionServices.create(data),
        onMutate: () => {
            toast.loading("Đang thêm...", { id: "create-transaction" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
            queryClient.invalidateQueries({ queryKey: ["goal"] });
            toast.success("Thêm giao dịch thành công", {
                id: "create-transaction",
            });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            toast.error("Thêm giao dịch thất bại", {
                id: "create-transaction",
                description: errorMessage,
            });
        },
    });
};

export const useUpdateTransactions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateTransactionPayload;
        }) => transactionServices.update(id, data),
        onMutate: () => {
            toast.loading("Đang cập nhật...", { id: "update-transaction" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
            toast.success("Cập nhật giao dịch thành công", {
                id: "update-transaction",
            });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            toast.error("Sửa giao dịch thất bại", {
                id: "update-transaction",
                description: errorMessage,
            });
        },
    });
};

export const useGetTransactions = (params?: TransactionParams) => {
    return useQuery({
        queryKey: ["transactions", params],
        queryFn: async () => transactionServices.getAll(params),
    });
};

export const useDeleteTransactions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => transactionServices.delete(id),
        onMutate: () => {
            toast.loading("Đang xóa...", { id: "delete-transaction" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
            toast.success("Xóa giao dịch thành công", {
                id: "delete-transaction",
            });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            toast.error("Xóa giao dịch thất bại", {
                id: "delete-transaction",
                description: errorMessage,
            });
        },
    });
};

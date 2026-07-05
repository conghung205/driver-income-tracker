import { transactionServices } from "@/services/transaction.service";
import { ApiError } from "@/types/auth.type";
import {
    CreateTransactionPayload,
    TransactionParams,
} from "@/types/transaction.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTransactionPayload) =>
            transactionServices.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            console.error(errorMessage);
        },
    });
};

export const useGetTransactions = (params?: TransactionParams) => {
    return useQuery({
        queryKey: ["transactions", params],
        queryFn: async () => {
            const res = await transactionServices.getAll(params);
            return res;
        },
    });
};

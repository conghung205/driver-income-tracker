import axiosClient from "@/lib/axios";
import {
    CreateTransactionPayload,
    TransactionParams,
    TransactionResponse,
    UpdateTransactionPayload,
} from "@/types/transaction.type";

export const transactionServices = {
    create: (data: CreateTransactionPayload) =>
        axiosClient.post("/transactions", data),

    update: (id: string, data: UpdateTransactionPayload) =>
        axiosClient.patch(`/transactions/${id}`, data),

    getAll: (params?: TransactionParams): Promise<TransactionResponse> =>
        axiosClient.get("/transactions", { params }),

    delete: (id: string) => axiosClient.delete(`/transactions/${id}`),
};

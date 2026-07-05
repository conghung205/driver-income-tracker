import axiosClient from "@/lib/axios";
import {
    CreateTransactionPayload,
    TransactionParams,
    TransactionResponse,
} from "@/types/transaction.type";

export const transactionServices = {
    create: (data: CreateTransactionPayload) =>
        axiosClient.post("/transactions", data),

    getAll: (params?: TransactionParams): Promise<TransactionResponse> =>
        axiosClient.get("/transactions", { params }),
};

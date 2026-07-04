import axiosClient from "@/lib/axios";
import {
    CreateTransactionPayload,
    TransactionParams,
} from "@/types/transaction.type";

export const transactionService = {
    create: (data: CreateTransactionPayload) =>
        axiosClient.post("/transactions", data),

    getAll: (params?: TransactionParams) =>
        axiosClient.get("/transactions", { params }),
};

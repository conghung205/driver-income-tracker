export type TransactionType = "INCOME" | "EXPENSE";
export type PaymentMethod = "CASH" | "E_WALLET";
export type Category =
    | "GRAB_BIKE"
    | "GRAB_EXPRESS"
    | "GRAB_CAR"
    | "BE_BIKE"
    | "BE_CAR"
    | "XANH_SM"
    | "OTHER_INCOME"
    | "FUEL"
    | "MAINTENANCE"
    | "INSURANCE"
    | "FOOD"
    | "OTHER_EXPENSE";

export interface BaseTransactionPayload {
    amount: number | null;
    type: TransactionType;
    category: Category | null;
    paymentMethod: PaymentMethod;
    description?: string;
}
export type CreateTransactionPayload = BaseTransactionPayload;

export interface UpdateTransactionPayload extends BaseTransactionPayload {
    status: "PENDING" | "APPROVED";
}

export interface TransactionParams {
    range?: string;
    type?: string;
    paymentMethod?: string;
    status?: string;
    page?: number;
    limit?: number;
    category?: string;
}

export interface TransactionResponse {
    data: Transaction[];
    pagination: {
        currentPage: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
    };
}

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    category: Category;
    paymentMethod: PaymentMethod;
    status: "PENDING" | "APPROVED";
    description?: string;
    createdAt: string;
    userId: string;
}

export interface PaginationI {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
}

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

export interface CreateTransactionPayload {
    amount: number | null;
    type: TransactionType;
    category: Category | null;
    paymentMethod: PaymentMethod;
    description?: string;
}
export interface TransactionParams {
    range?: string;
    type?: TransactionType;
    paymentMethod?: PaymentMethod;
}

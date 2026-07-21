import { TransactionType } from "@/generated/prisma/enums";

export interface RevenueChartTransaction {
    type: TransactionType;
    amount: number;
    createdAt: Date;
}

export interface CaculateBestDayTransaction {
    amount: number;
    createdAt: Date;
}

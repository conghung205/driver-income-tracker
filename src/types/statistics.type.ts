import { Category } from "./transaction.type";

export interface SummaryStatisticsData {
    totalIncome: number;
    totalExpense: number;
    netIncome: number;
    incomeCount: number;
    expenseCount: number;
    totalCount: number;
    topCategory: {
        category: Category;
        amount: number;
    } | null;
    avgDailyIncome: number;
    bestDay: {
        date: string;
        amount: number;
    } | null;
    worstDay: {
        date: string;
        amount: number;
    } | null;
    expenseRatio: number;
    range: string;
}
export interface SummaryStatisticsRes {
    message: string;
    data: SummaryStatisticsData;
}

export interface RevenueChartI {
    label: string;
    income: number;
    expense: number;
}

export interface StatisticsRevenueChartRes {
    message: string;
    data: {
        totalIncome: number;
        totalExpense: number;
        chart: RevenueChartI[];
    };
}

export interface StatisticsCategoriesItem {
    category: Category;
    amount: number;
    percent: number;
}
export interface StatisticsCategoriesRes {
    message: string;
    data: {
        totalAmount: number;
        categories: StatisticsCategoriesItem[];
    };
}

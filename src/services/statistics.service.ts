import axiosClient from "@/lib/axios";
import { ParamsI } from "@/types/params.type";
import {
    StatisticsCategoriesRes,
    StatisticsRevenueChartRes,
    SummaryStatisticsRes,
} from "@/types/statistics.type";

export const statisticsServices = {
    getSumary(params?: ParamsI): Promise<SummaryStatisticsRes> {
        return axiosClient.get("/reports/summary", { params });
    },
    getRevenueChart(params?: ParamsI): Promise<StatisticsRevenueChartRes> {
        return axiosClient.get("/reports/revenue-chart", { params });
    },
    getCategories(params?: ParamsI): Promise<StatisticsCategoriesRes> {
        return axiosClient.get("/reports/categories", { params });
    },
};

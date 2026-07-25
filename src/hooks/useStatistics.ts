import { statisticsServices } from "@/services/statistics.service";
import { ParamsI } from "@/types/params.type";
import { useQuery } from "@tanstack/react-query";

export const useStatisticsSummary = (params?: ParamsI) => {
    return useQuery({
        queryKey: ["statistics-summary", params],
        queryFn: async () => {
            const res = await statisticsServices.getSumary(params);
            return res.data;
        },
    });
};

export const useStatisticsRevenueChart = (params?: ParamsI) => {
    return useQuery({
        queryKey: ["statistics-revenue-chart", params],
        queryFn: async () => {
            const res = await statisticsServices.getRevenueChart(params);
            return res.data;
        },
    });
};

export const useStatisticsCategories = (params?: ParamsI) => {
    return useQuery({
        queryKey: ["statistics-categories-chart", params],
        queryFn: async () => {
            const res = await statisticsServices.getCategories(params);
            return res.data;
        },
    });
};

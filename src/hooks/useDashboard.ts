import { dashboardServices } from "@/services/dashboard.service";
import { ParamsI } from "@/types/params.type";
import { useQuery } from "@tanstack/react-query";

export const useDashboardSummary = (params?: ParamsI) => {
    return useQuery({
        queryKey: ["dashboard-summary", params],
        queryFn: async () => {
            const res = await dashboardServices.getSumary(params);
            return res.data;
        },
    });
};

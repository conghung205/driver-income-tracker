import { dashboardServices } from "@/services/dashboard.service";
import { DashboardParams } from "@/types/dashboard.type";
import { useQuery } from "@tanstack/react-query";

export const useDashboardSummary = (params?: DashboardParams) => {
    return useQuery({
        queryKey: ["dashboard-summary", params],
        queryFn: async () => {
            const res = await dashboardServices.getSumary(params);
            return res.data;
        },
    });
};

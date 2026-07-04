import { dashboardServices } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useDashboardSummary = (range: string) => {
    return useQuery({
        queryKey: ["dashboard-summary", range],
        queryFn: async () => {
            const res = await dashboardServices.getSumary(range);
            return res.data;
        },
    });
};

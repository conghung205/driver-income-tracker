import axiosClient from "@/lib/axios";
import { DashboardParams } from "@/types/dashboard.type";

export const dashboardServices = {
    getSumary(params?: DashboardParams) {
        return axiosClient.get("/dashboard/summary", { params });
    },
};

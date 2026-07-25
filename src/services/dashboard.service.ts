import axiosClient from "@/lib/axios";
import { ParamsI } from "@/types/params.type";

export const dashboardServices = {
    getSumary(params?: ParamsI) {
        return axiosClient.get("/dashboard/summary", { params });
    },
};

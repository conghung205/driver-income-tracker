import axiosClient from "@/lib/axios";

export const dashboardServices = {
    getSumary(range?: string) {
        return axiosClient.get("/dashboard/summary", {
            params: { range },
        });
    },
};

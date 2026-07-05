import axiosClient from "@/lib/axios";
import { UserMeResponse } from "@/types/user.type";

export const userServices = {
    getUser: (): Promise<UserMeResponse> => axiosClient.get("/user/me"),
};

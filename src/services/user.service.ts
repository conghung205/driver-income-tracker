import axiosClient from "@/lib/axios";
import {
    GoalResponse,
    UpdateGoal,
    UpdatePassword,
    UpdateUser,
    UserMeResponse,
} from "@/types/user.type";

export const userServices = {
    getUser: (): Promise<UserMeResponse> => axiosClient.get("/user/me"),
    getGoal: (): Promise<GoalResponse> => axiosClient.get("/user/goal"),
    update: (data: UpdateUser) => axiosClient.patch("/user/me", data),
    password: (data: UpdatePassword) =>
        axiosClient.patch("/user/password", data),
    updateGoal: (data: UpdateGoal) => axiosClient.patch("user/goal", data),
};

import axiosClient from "@/lib/axios";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.type";

export const authServices = {
    login: (data: LoginPayload): Promise<AuthResponse> =>
        axiosClient.post("/auth/login", data),
    register: (data: RegisterPayload): Promise<AuthResponse> =>
        axiosClient.post("/auth/register", data),
    logout: (): Promise<{ message: string }> =>
        axiosClient.post("/auth/logout"),
};

"use client";
import { authServices } from "@/services/auth.service";
import { ApiError, LoginPayload, RegisterPayload } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (data: LoginPayload) => authServices.login(data),
        onSuccess: () => {
            router.push("/");
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            console.error(errorMessage);
        },
    });
};

export const useRegister = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: RegisterPayload) => authServices.register(data),
        onSuccess: () => {
            router.push("/");
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            console.error(errorMessage);
        },
    });
};

export const useLogout = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: () => authServices.logout(),
        onSuccess: () => {
            router.push("/login");
        },
        onError: () => {
            console.error("Đăng xuất thất bại!");
        },
    });
};

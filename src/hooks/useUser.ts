import { userServices } from "@/services/user.service";
import { ApiError } from "@/types/auth.type";
import { UpdateGoal, UpdatePassword, UpdateUser } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await userServices.getUser();
            return res?.data;
        },
    });
};
export const useGetGoal = () => {
    return useQuery({
        queryKey: ["goal"],
        queryFn: async () => {
            const res = await userServices.getGoal();
            return res.data;
        },
    });
};
export const useUpdateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateGoal) => userServices.updateGoal(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goal"] });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            console.error(errorMessage);
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUser) => userServices.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            console.error(errorMessage);
        },
    });
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: (data: UpdatePassword) => userServices.password(data),
        onSuccess: () => {
            console.log("Thay đổi mật khẩu thành công!");
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            console.error(errorMessage);
        },
    });
};

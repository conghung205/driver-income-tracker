import { userServices } from "@/services/user.service";
import { ApiError } from "@/types/auth.type";
import { UpdateGoal, UpdatePassword, UpdateUser } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
        onMutate: () => {
            toast.loading("Đang cập nhật...", { id: "update-goal" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goal"] });
            toast.success("Cập nhật thành công", { id: "update-goal" });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            toast.error("Cập nhật giao dịch thất bại", {
                id: "update-goal",
                description: errorMessage,
            });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUser) => userServices.update(data),
        onMutate: () => {
            toast.loading("Đang cập nhật...", { id: "update-user" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Cập nhật thành công", { id: "update-user" });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            toast.error("Cập nhật thông tin thất bại", {
                id: "update-user",
                description: errorMessage,
            });
        },
    });
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: (data: UpdatePassword) => userServices.password(data),
        onMutate: () => {
            toast.loading("Đang cập nhật...", { id: "update-password" });
        },
        onSuccess: () => {
            console.log("Thay đổi mật khẩu thành công!");
            toast.success("Thay đổi mật khẩu thành công", {
                id: "update-password",
            });
        },
        onError: (error: ApiError) => {
            const errorMessage = error.response?.data?.message;
            toast.error("Thay đổi mật khẩu thất bại", {
                id: "update-password",
                description: errorMessage,
            });
        },
    });
};

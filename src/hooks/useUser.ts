import { userServices } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await userServices.getUser();
            return res?.data;
        },
    });
};

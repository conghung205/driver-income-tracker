import { useRouter, useSearchParams } from "next/navigation";

export const useFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setFilter = (key: string, value: string, resetPage = true) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        if (resetPage) {
            params.set("page", "1");
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const getFilter = (key: string, defaultValue = "all") => {
        return searchParams.get(key) || defaultValue;
    };

    return { setFilter, getFilter };
};

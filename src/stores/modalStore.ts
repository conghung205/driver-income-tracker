import { create } from "zustand";
interface ModalStore {
    isOpenAddTransactionModal: boolean;
    setOpenAddTransactionModal: (open: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpenAddTransactionModal: false,
    setOpenAddTransactionModal: (open) =>
        set({ isOpenAddTransactionModal: open }),
}));

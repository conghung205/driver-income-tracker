import { Transaction } from "@/types/transaction.type";
import { create } from "zustand";

interface ModalStore {
    isOpenAddTransactionModal: boolean;
    setOpenAddTransactionModal: (open: boolean) => void;

    // edit transactions
    isOpenEditTransactionModal: boolean;
    selectedTransaction: Transaction | null;
    setOpenEditTransactionModal: (open: boolean) => void;
    setSelectedTransaction: (transaction: Transaction | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpenAddTransactionModal: false,
    setOpenAddTransactionModal: (open) =>
        set({ isOpenAddTransactionModal: open }),

    // edit transactions
    isOpenEditTransactionModal: false,
    selectedTransaction: null,
    setOpenEditTransactionModal: (open) =>
        set({ isOpenEditTransactionModal: open }),
    setSelectedTransaction: (transaction) =>
        set({ selectedTransaction: transaction }),
}));

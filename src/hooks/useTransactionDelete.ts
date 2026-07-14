"use client";
import { useState } from "react";
import { useDeleteTransactions } from "./useTransaction";

export function useTransactionDelete() {
    const { mutate, isPending } = useDeleteTransactions();

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const openDeleteModal = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (!deleteId) return;

        mutate(deleteId, {
            onSuccess: () => setDeleteId(null),
        });
    };

    return {
        deleteId,
        isPending,
        openDeleteModal,
        confirmDelete,
        closeDeleteModal: () => setDeleteId(null),
    };
}

"use client";
import PaymentMethodSelector from "@/components/shared/PaymentMethodSelector";
import { TransactionTypeSelector } from "@/components/shared/TransactionTypeSelector";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/constants/transaction";
import { useUpdateTransactions } from "@/hooks/useTransaction";
import { useModalStore } from "@/stores/modalStore";
import { UpdateTransactionPayload } from "@/types/transaction.type";
import { updateTransactionSchema } from "@/validations/transaction.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import TransactionStatusSelector from "./TransactionStatusSelector";

export default function EditTransactionModal() {
    const isOpenModal = useModalStore(
        (state) => state.isOpenEditTransactionModal,
    );
    const setIsOpenModal = useModalStore(
        (state) => state.setOpenEditTransactionModal,
    );
    const selectedTransaction = useModalStore(
        (state) => state.selectedTransaction,
    );

    const { mutate, isPending } = useUpdateTransactions();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<UpdateTransactionPayload>({
        resolver: zodResolver(updateTransactionSchema),
        defaultValues: {
            amount: selectedTransaction?.amount ?? null,
            type: selectedTransaction?.type ?? "INCOME",
            status: selectedTransaction?.status ?? "PENDING",
            category: selectedTransaction?.category ?? null,
            paymentMethod: selectedTransaction?.paymentMethod ?? "CASH",
            description: selectedTransaction?.description ?? "",
        },
    });

    // Whenever `selectedTransaction` changes, the entire form value is updated.
    useEffect(() => {
        if (isOpenModal && selectedTransaction) {
            reset({
                amount: selectedTransaction.amount,
                type: selectedTransaction.type,
                status: selectedTransaction.status,
                category: selectedTransaction.category,
                paymentMethod: selectedTransaction.paymentMethod,
                description: selectedTransaction.description ?? "",
            });
        }
    }, [selectedTransaction, isOpenModal, reset]);

    // useWatch: displays these three properties in the "control";
    // when the values ​​of these three properties change, it will re-render.
    const typeCategory = useWatch({ control, name: "type" });
    const paymentMethod = useWatch({ control, name: "paymentMethod" });
    const status = useWatch({ control, name: "status" });

    const categories =
        typeCategory === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const handleChangeTypeCategory = (type: "INCOME" | "EXPENSE") => {
        setValue("type", type, { shouldValidate: true, shouldDirty: true });
        setValue("category", null, { shouldValidate: true, shouldDirty: true });
    };
    const handleChangePaymentMethod = (type: "CASH" | "E_WALLET") => {
        setValue("paymentMethod", type, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };
    const handleChangeStatus = (type: "APPROVED" | "PENDING") => {
        setValue("status", type, { shouldValidate: true, shouldDirty: true });
    };

    const onSubmit = (data: UpdateTransactionPayload) => {
        const id = selectedTransaction?.id;
        if (!id) return;

        mutate(
            { id, data },
            {
                onSuccess: () => {
                    setIsOpenModal(false);
                },
            },
        );
    };
    return (
        <>
            <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                <DialogContent
                    onInteractOutside={(e) => e.preventDefault()}
                    className="sm:max-w-sm p-5 bg-bg-secondary"
                >
                    <DialogHeader className="mb-5">
                        <DialogTitle className="text-xl text-white text-center">
                            Chỉnh sửa giao dịch
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* category type */}
                        <TransactionTypeSelector
                            value={typeCategory}
                            onChange={handleChangeTypeCategory}
                        />

                        {/* amount of money */}
                        <div className="pt-4">
                            <Controller
                                control={control}
                                name="amount"
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <Field className="max-w-sm">
                                        <FieldLabel
                                            htmlFor="money"
                                            className="text-desc text-sm"
                                        >
                                            Số tiền
                                        </FieldLabel>
                                        <InputGroup className="border bg-bg-primary border-bd-primary py-5">
                                            <NumericFormat
                                                onBlur={onBlur}
                                                value={
                                                    value === null ||
                                                    value === undefined
                                                        ? ""
                                                        : value
                                                }
                                                onValueChange={(values) => {
                                                    onChange(
                                                        values.floatValue !==
                                                            undefined
                                                            ? values.floatValue
                                                            : null,
                                                    );
                                                }}
                                                getInputRef={ref}
                                                customInput={InputGroupInput}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                allowNegative={false}
                                                placeholder="0"
                                                inputMode="numeric"
                                                className="placeholder:text-desc text-white text-lg! placeholder:text-lg"
                                                id="money"
                                            />
                                            <InputGroupAddon
                                                className="text-desc text-lg"
                                                align="inline-end"
                                            >
                                                đ
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {errors.amount && (
                                            <p className="text-red-500 text-sm">
                                                {errors.amount.message}
                                            </p>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* categories */}
                        <div className="pt-4">
                            <label className="text-desc block mb-1.5 font-medium">
                                Chọn danh mục
                            </label>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        value={value ?? ""}
                                        onValueChange={(val) => {
                                            onChange(val);
                                        }}
                                    >
                                        <SelectTrigger className="w-full border text-white! bg-bg-primary py-5 focus:border-main border-bd-primary">
                                            <SelectValue placeholder="Chọn danh mục..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Chọn danh mục
                                                </SelectLabel>
                                                {categories.map((item) => (
                                                    <SelectItem
                                                        key={item.value}
                                                        value={item.value}
                                                    >
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                        {errors.category && (
                                            <p className="text-red-500 text-sm">
                                                {errors.category.message}
                                            </p>
                                        )}
                                    </Select>
                                )}
                            />
                        </div>

                        {/* cash, e-wallet */}
                        <PaymentMethodSelector
                            value={paymentMethod}
                            onChange={handleChangePaymentMethod}
                        />

                        {/* status */}
                        <TransactionStatusSelector
                            value={status}
                            onChange={handleChangeStatus}
                        />

                        {/* description */}
                        <div className="py-4">
                            <Field>
                                <FieldLabel
                                    className="text-desc"
                                    htmlFor="description"
                                >
                                    Ghi chú{" "}
                                    <span className="text-desc/50 font-normal">
                                        (tùy chọn)
                                    </span>
                                </FieldLabel>
                                <Input
                                    {...register("description")}
                                    className="border border-bd-primary py-5 text-white bg-bg-primary placeholder:text-desc"
                                    id="description"
                                    placeholder="Ghi chú thêm..."
                                />
                            </Field>
                        </div>

                        <DialogFooter className="bg-bg-secondary border-bd-primary">
                            <DialogClose asChild>
                                <Button
                                    disabled={isPending}
                                    variant="default"
                                    className="text-white py-5 cursor-pointer hidden md:flex px-6 bg-red-500 hover:text-white hover:bg-red-600"
                                >
                                    Hủy
                                </Button>
                            </DialogClose>
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="cursor-pointer py-5 px-6 flex bg-main hover:bg-main/85 font-semibold"
                            >
                                {isPending ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

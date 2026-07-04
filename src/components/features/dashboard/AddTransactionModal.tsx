"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useCreateTransaction } from "@/hooks/useTransaction";
import { CreateTransactionPayload } from "@/types/transaction.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema } from "@/validations/transaction.schema";

export default function AddTransactionModal() {
    const [typeCategory, setTypeCategory] = useState<"INCOME" | "EXPENSE">(
        "INCOME",
    );
    const [paymentMethod, setPaymentMethod] = useState<"CASH" | "E_WALLET">(
        "CASH",
    );
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { mutate, isPending } = useCreateTransaction();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<CreateTransactionPayload>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            amount: null,
            type: "INCOME",
            category: null,
            paymentMethod: "CASH",
            description: "",
        },
    });

    const categories =
        typeCategory === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const handleChangeTypeCategory = (type: "INCOME" | "EXPENSE") => {
        setTypeCategory(type);
        setValue("type", type);
        setValue("category", null);
    };
    const handleChangePaymentMethod = (type: "CASH" | "E_WALLET") => {
        setPaymentMethod(type);
        setValue("paymentMethod", type);
    };

    const onSubmit = (data: CreateTransactionPayload) => {
        mutate(data);
        reset();
        setIsOpenModal(false);
    };

    return (
        <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer text-xs flex uppercase bg-main hover:bg-main/85 font-semibold">
                    <Plus size={22} />
                    Thêm giao dịch
                </Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="sm:max-w-sm p-5 bg-bg-secondary"
            >
                <DialogHeader className="mb-5">
                    <DialogTitle className="text-xl text-white text-center">
                        Thêm giao dịch mới
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* category type */}
                    <div className="bg-bg-primary flex p-2 rounded-2xl">
                        <button
                            onClick={() => handleChangeTypeCategory("INCOME")}
                            type="button"
                            className={`px-4 border font-medium ${typeCategory === "INCOME" ? "border-main bg-main/10 text-main" : "border-transparent"} rounded-2xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
                        >
                            <TrendingUp />
                            Thu nhập
                        </button>
                        <button
                            onClick={() => handleChangeTypeCategory("EXPENSE")}
                            type="button"
                            className={`px-4 border font-medium ${typeCategory === "EXPENSE" ? "border-red-500 bg-red-500/10 text-red-500" : "border-transparent"} rounded-2xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
                        >
                            <TrendingDown /> Chi phí
                        </button>
                    </div>

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
                                            value={value ?? ""}
                                            onValueChange={(values) => {
                                                onChange(values.floatValue);
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
                    <div className="pt-4">
                        <label className="text-desc font-medium">
                            Hình thức
                        </label>
                        <div className="flex gap-4 mt-1.5">
                            <button
                                onClick={() =>
                                    handleChangePaymentMethod("CASH")
                                }
                                type="button"
                                className={`px-4 border font-medium ${paymentMethod === "CASH" ? "bg-main/10 border-main text-main" : "bg-bg-primary"} border-bd-primary rounded-xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
                            >
                                Tiền mặt
                            </button>
                            <button
                                onClick={() =>
                                    handleChangePaymentMethod("E_WALLET")
                                }
                                type="button"
                                className={`px-4 border font-medium ${paymentMethod === "E_WALLET" ? "bg-main/10 border-main text-main" : "bg-bg-primary"} border-bd-primary rounded-xl flex-1 py-2 flex items-center gap-2 text-desc cursor-pointer`}
                            >
                                Ví điện tử
                            </button>
                        </div>
                    </div>

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
                                variant="default"
                                className="text-white py-5 cursor-pointer hidden md:flex px-6 bg-red-500 hover:text-white hover:bg-red-600"
                            >
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="cursor-pointer py-5 px-6 flex bg-main hover:bg-main/85 font-semibold"
                        >
                            {isPending ? "Đang thêm..." : "Thêm nhanh"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

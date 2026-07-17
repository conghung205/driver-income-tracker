"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useUpdateGoal } from "@/hooks/useUser";
import { UpdateGoal } from "@/types/user.type";
import { updateGoalSchema } from "@/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface UpdateGoalFormProps {
    onsuccess(): void;
    defaultValue: number | undefined;
}

export default function UpdateGoalForm({
    onsuccess,
    defaultValue,
}: UpdateGoalFormProps) {
    const { mutate } = useUpdateGoal();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateGoal>({
        resolver: zodResolver(updateGoalSchema),
    });

    useEffect(() => {
        if (defaultValue) {
            reset({
                dailyGoal: defaultValue,
            });
        }
    }, [defaultValue, reset]);

    const onSubmit = (data: UpdateGoal) => {
        mutate(data, {
            onSuccess: () => onsuccess(),
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    control={control}
                    name="dailyGoal"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
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
                            {errors.dailyGoal && (
                                <p className="text-red-500 text-sm">
                                    {errors.dailyGoal.message}
                                </p>
                            )}
                        </Field>
                    )}
                />
            </div>

            <DialogFooter className="bg-bg-secondary mt-5 border-bd-primary">
                <Button
                    type="submit"
                    className="w-full cursor-pointer py-5 px-6 flex bg-main hover:bg-main/85 font-semibold"
                >
                    Lưu ngay
                </Button>
            </DialogFooter>
        </form>
    );
}

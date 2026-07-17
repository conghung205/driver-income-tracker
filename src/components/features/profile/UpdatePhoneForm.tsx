"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/hooks/useUser";
import { UpdateUser } from "@/types/user.type";
import { updateUserSchema } from "@/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdatePhoneFormProps {
    defaultValue: string | undefined;
    onsuccess(): void;
}

export default function UpdatePhoneForm({
    defaultValue,
    onsuccess,
}: UpdatePhoneFormProps) {
    const { mutate } = useUpdateUser();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateUser>({
        resolver: zodResolver(updateUserSchema),
    });

    useEffect(() => {
        if (defaultValue) {
            reset({
                phoneNumber: defaultValue,
            });
        }
    }, [defaultValue, reset]);

    const onSubmit = (data: UpdateUser) => {
        mutate(data, {
            onSuccess: () => onsuccess(),
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <FieldLabel className="text-desc" htmlFor="phoneNumber">
                    Số điện thoại
                </FieldLabel>
                <Input
                    {...register("phoneNumber")}
                    className="border border-bd-primary py-5 text-white bg-bg-primary placeholder:text-desc"
                    id="phoneNumber"
                    placeholder="Nhập số điện thoại..."
                />
            </Field>
            {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                </p>
            )}

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

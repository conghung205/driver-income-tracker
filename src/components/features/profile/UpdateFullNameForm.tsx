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

interface UpdateFullNameFormProps {
    defaultValue: string | undefined;
    onsuccess(): void;
}

export default function UpdateFullNameForm({
    defaultValue,
    onsuccess,
}: UpdateFullNameFormProps) {
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
                fullName: defaultValue,
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
                <FieldLabel className="text-desc" htmlFor="fullName">
                    Tên đầy đủ
                </FieldLabel>
                <Input
                    {...register("fullName")}
                    className="border border-bd-primary py-5 text-white bg-bg-primary placeholder:text-desc"
                    id="fullName"
                    placeholder="Nhập tên đầy đủ..."
                />
            </Field>
            {errors.fullName && (
                <p className="text-red-500 text-sm">
                    {errors.fullName.message}
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

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/useUser";
import { UpdatePasswordFormInput } from "@/types/user.type";
import { changePasswordFormSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UpdatePasswordFormProps {
    onsuccess(): void;
}

export default function UpdatePasswordForm({
    onsuccess,
}: UpdatePasswordFormProps) {
    const { mutate } = useUpdatePassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdatePasswordFormInput>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: UpdatePasswordFormInput) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...apiData } = data;
        mutate(apiData, {
            onSuccess: () => onsuccess(),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel className="text-desc" htmlFor="currentPassword">
                        Mật khẩu hiện tại
                    </FieldLabel>
                    <Input
                        type="password"
                        {...register("currentPassword")}
                        className="border border-bd-primary py-5 text-white bg-bg-primary placeholder:text-desc"
                        id="currentPassword"
                        placeholder="Nhập mật khẩu hiện tại..."
                    />
                </Field>
                {errors.currentPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.currentPassword.message}
                    </p>
                )}

                <Field>
                    <FieldLabel className="text-desc" htmlFor="newPassword">
                        Mật khẩu mới
                    </FieldLabel>
                    <Input
                        type="password"
                        {...register("newPassword")}
                        className="border border-bd-primary py-5 text-white bg-bg-primary placeholder:text-desc"
                        id="newPassword"
                        placeholder="Nhập mật khẩu mới..."
                    />
                </Field>
                {errors.newPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.newPassword.message}
                    </p>
                )}
                <Field>
                    <FieldLabel className="text-desc" htmlFor="confirmPassword">
                        Nhập lại mật khẩu
                    </FieldLabel>
                    <Input
                        type="password"
                        {...register("confirmPassword")}
                        className="border border-bd-primary py-5 text-white bg-bg-primary placeholder:text-desc"
                        id="confirmPassword"
                        placeholder="Nhập lại mật khẩu mới..."
                    />
                </Field>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </FieldGroup>

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

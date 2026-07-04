"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useRegister } from "@/hooks/useAuth";
import { RegisterFormInput } from "@/types/auth.type";
import { registerFormSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Phone,
    UserRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInput>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = (data: RegisterFormInput) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...backendData } = data;

        mutate(backendData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* full Name */}
            <Field>
                <FieldLabel className="text-desc">Tên hiển thị:</FieldLabel>
                <InputGroup className="md:py-4  bg-bg-primary border-bd-primary ">
                    <InputGroupInput
                        className="md:text-[16px] text-white "
                        placeholder="Nhập họ & tên của bạn..."
                        type="text"
                        {...register("fullName")}
                    />
                    <InputGroupAddon>
                        <UserRound className="text-desc" size={18} />
                    </InputGroupAddon>
                </InputGroup>
                {errors.fullName && (
                    <p className="text-red-500 text-sm">
                        {errors.fullName.message}
                    </p>
                )}
            </Field>
            {/* Phone Number */}
            <Field>
                <FieldLabel className="text-desc">Số điện thoại:</FieldLabel>
                <InputGroup className="md:py-4 bg-bg-primary border-bd-primary">
                    <InputGroupInput
                        className="md:text-[16px] text-white"
                        placeholder="Nhập số điện thoại của bạn..."
                        type="tel"
                        {...register("phoneNumber")}
                    />
                    <InputGroupAddon>
                        <Phone className="text-desc" size={18} />
                    </InputGroupAddon>
                </InputGroup>
                {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                        {errors.phoneNumber.message}
                    </p>
                )}
            </Field>

            {/* Password */}
            <Field>
                <FieldLabel className="text-desc">Mật khẩu:</FieldLabel>
                <InputGroup className="md:py-4 bg-bg-primary border-bd-primary">
                    <InputGroupInput
                        className="md:text-[16px] text-white"
                        placeholder="Nhập mật khẩu của bạn..."
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                    />
                    <InputGroupAddon>
                        <LockKeyhole className="text-desc" size={18} />
                    </InputGroupAddon>
                    {/* ẩn/hiện */}
                    <InputGroupAddon
                        align="inline-end"
                        className="cursor-pointer transition-colors"
                        onClick={handleTogglePassword}
                    >
                        {showPassword ? (
                            <EyeOff
                                className="text-desc hover:text-main"
                                size={18}
                            />
                        ) : (
                            <Eye
                                className="text-desc hover:text-main"
                                size={18}
                            />
                        )}
                    </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message}
                    </p>
                )}
            </Field>
            {/* confirm Password */}
            <Field>
                <FieldLabel className="text-desc">
                    Xác nhận mật khẩu:
                </FieldLabel>
                <InputGroup className="md:py-4 bg-bg-primary border-bd-primary">
                    <InputGroupInput
                        className="md:text-[16px] text-white"
                        placeholder="Nhập lại mật khẩu..."
                        type="password"
                        {...register("confirmPassword")}
                    />
                    <InputGroupAddon>
                        <LockKeyhole className="text-desc" size={18} />
                    </InputGroupAddon>
                </InputGroup>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </Field>

            {/* Submit */}
            <Button
                size="lg"
                type="submit"
                className="bg-main hover:bg-main/80 w-full text-lg py-5 cursor-pointer mt-2"
            >
                {isPending ? "Đang đăng ký..." : "Đăng ký"}
                <ArrowRight />
            </Button>
        </form>
    );
}

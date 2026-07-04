"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Phone } from "lucide-react";
import { LoginPayload } from "@/types/auth.type";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth.schema";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phoneNumber: "",
            password: "",
        },
    });

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = (data: LoginPayload) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Phone Number */}
            <Field>
                <FieldLabel className="text-desc">Số điện thoại:</FieldLabel>
                <InputGroup className="md:py-4 bg-bg-primary border-bd-primary ">
                    <InputGroupInput
                        {...register("phoneNumber")}
                        className="md:text-[16px] text-white"
                        placeholder="Nhập số điện thoại của bạn..."
                        type="tel"
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
                        {...register("password")}
                        className="md:text-[16px] text-white"
                        placeholder="Nhập mật khẩu của bạn..."
                        type={showPassword ? "text" : "password"}
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
                <FieldDescription className="text-right cursor-pointer text-main hover:underline">
                    Quên mật khẩu?
                </FieldDescription>
            </Field>

            {/* Submit */}
            <Button
                size="lg"
                type="submit"
                className="bg-main hover:bg-main/80 w-full text-lg py-5 cursor-pointer mt-2"
            >
                {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                <ArrowRight />
            </Button>
        </form>
    );
}

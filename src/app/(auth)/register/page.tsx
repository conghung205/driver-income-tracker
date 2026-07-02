import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng ký | Tài xế",
    description:
        "Đăng ký ngay để bắt đầu tối ưu hóa và quản lý thu nhập cuốc xe của bạn.",
};

export default function RegisterPage() {
    return (
        <div>
            <div className="mb-12 md:mb-6 text-center">
                <h2 className="text-2xl text-main font-semibold">
                    Tạo tài khoản
                </h2>
                <p className="text-gray-600">
                    Bắt đầu quản lý tài chính thông minh
                </p>
            </div>
            <RegisterForm />
            <p className="text-center md:text-[16px] mt-6">
                Đã có tài khoản?{" "}
                <Link
                    href="/login"
                    className="text-main hover:underline cursor-pointer"
                >
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}

import { Metadata } from "next";
import LoginForm from "./LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Đăng nhập | Tài xế",
    description: "Hệ thống quản lý thu nhập tối ưu dành cho tài xế công nghệ.",
};

export default function LoginPage() {
    return (
        <div>
            <div className="mb-12 md:mb-6 text-center">
                <h2 className="text-2xl text-main font-semibold">Đăng nhập</h2>
                <p className="text-gray-600">
                    Quản lý thu nhập tối ưu cho tài xế
                </p>
            </div>
            <LoginForm />
            <p className="text-center md:text-[16px] mt-6">
                Chưa có tài khoản?{" "}
                <Link
                    href="/register"
                    className="text-main hover:underline cursor-pointer"
                >
                    Đăng ký ngay
                </Link>
            </p>
        </div>
    );
}

import AppLogo from "@/components/shared/AppLogo";
import React from "react";

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex flex-col bg-bg-primary gap-8 items-center justify-center p-6">
            <AppLogo description="Hệ thống quản lý thu nhập tối ưu dành cho tài xế công nghệ." />
            <div className="w-full max-w-md bg-bg-secondary rounded-2xl md:shadow-md border-bd-primary border p-6 md:p-8">
                {children}
            </div>
        </div>
    );
}

import React from "react";

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
            {/* Giao diện Mobile-First: Form sẽ chiếm full màn hình trên mobile, và thu gọn lại trên desktop */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 md:p-8">
                {children}
            </div>
        </div>
    );
}

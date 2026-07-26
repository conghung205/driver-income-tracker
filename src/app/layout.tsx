import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: {
        template: "%s | Quản thu nhập của tài xế",
        default: "Quản thu nhập của tài xế",
    },
    description:
        "Ứng dụng theo dõi dòng tiền, thống kê thu chi và quản thu nhập trực quan cho tài xế công nghệ.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <QueryProvider>{children}</QueryProvider>
                <Toaster position="top-right" richColors closeButton />
            </body>
        </html>
    );
}

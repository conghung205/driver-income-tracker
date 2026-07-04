import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
    title: "Driver Income Tracker",
    description: "Quản lý tài chính cho tài xế công nghệ",
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
            </body>
        </html>
    );
}

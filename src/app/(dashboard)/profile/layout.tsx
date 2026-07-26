import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hồ Sơ Cá Nhân",
    description:
        "Quản lý thông tin cá nhân, cài đặt bảo mật, tùy chỉnh cấu hình tài khoản và các tùy chọn ứng dụng của bạn.",
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

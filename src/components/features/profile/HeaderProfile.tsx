import { UserMe } from "@/types/user.type";
import { formatDate } from "@/utils/format";
import Image from "next/image";

interface HeaderProfileProps {
    user: UserMe | undefined;
}

export default function HeaderProfile({ user }: HeaderProfileProps) {
    return (
        <div className="p-6 bg-bg-secondary border border-bd-primary rounded-2xl">
            <div className="flex justify-between items-center">
                <div className="flex flex-col md:flex-row justify-center md:justify-start w-full md:w-auto items-center gap-4">
                    <Image
                        className="rounded-full"
                        alt="avatar-user"
                        src={`/images/avatar-not-found.avif`}
                        width={80}
                        height={80}
                        loading="eager"
                    />
                    <div className="text-center md:text-start">
                        <h2 className=" text-lg md:text-2xl text-gray-200 font-bold">
                            {user?.fullName}
                        </h2>
                        <p className="text-desc text-xs md:text-sm mt-2">
                            Tài xế công nghệ • Gia nhập:{" "}
                            {user?.createdAt && formatDate(user?.createdAt)}
                        </p>
                    </div>
                </div>

                <span className="hidden lg:block text-xs text-main font-medium px-3 py-1.5 bg-main/10 border border-bd-primary rounded-2xl">
                    Đang trực tuyến
                </span>
            </div>
        </div>
    );
}

import { UserMe } from "@/types/user.type";
import { ChevronRight } from "lucide-react";

interface InformationProps {
    user: UserMe | undefined;
    setModal(value: "name" | "phone"): void;
}

export default function Information({ user, setModal }: InformationProps) {
    return (
        <div>
            {/* heading */}
            <div className="mb-5">
                <h2 className="font-medium text-gray-200 text-[16px] md:text-lg">
                    Thông tin cá nhân
                </h2>
                <p className="text-desc text-sm">
                    Quản lý thông tin cá nhân của bạn
                </p>
            </div>
            {/* infomation */}
            <div className="p-5 bg-bg-secondary border border-bd-primary flex flex-col gap-4 rounded-2xl">
                <div className="mb-3">
                    <h2 className="font-medium text-gray-200 text-[16px] md:text-lg">
                        Thông tin tài khoản
                    </h2>
                    <p className="text-desc text-sm">
                        Quản lý tên hiển thị, số điện thoại và ảnh đại diện của
                        bạn
                    </p>
                </div>

                <div
                    onClick={() => setModal("name")}
                    className="p-2.5 px-5 flex border border-bd-primary justify-between bg-bg-primary hover:bg-bg-primary/50 rounded-2xl"
                >
                    <div>
                        <div className="text-sm text-desc mb-2">Tên đầy đủ</div>
                        <div className="font-medium text-gray-200">
                            {user?.fullName}
                        </div>
                    </div>
                    <button>
                        <ChevronRight size={24} />
                    </button>
                </div>
                <div
                    onClick={() => setModal("phone")}
                    className="p-2.5 px-5 flex border border-bd-primary justify-between bg-bg-primary hover:bg-bg-primary/50 rounded-2xl"
                >
                    <div>
                        <div className="text-sm text-desc mb-2">
                            Số điện thoại
                        </div>
                        <div className="font-medium text-gray-200">
                            {user?.phoneNumber}
                        </div>
                    </div>
                    <button>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

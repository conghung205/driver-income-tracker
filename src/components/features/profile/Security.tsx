import { ChevronRight } from "lucide-react";

interface SecurityProps {
    openModal(): void;
}

export default function Security({ openModal }: SecurityProps) {
    return (
        <div className="pt-3 mt-5">
            <div className="mb-5">
                <h2 className="font-medium text-gray-200 text-[16px] md:text-lg">
                    Mật khẩu và bảo mật
                </h2>
                <p className="text-desc text-sm">
                    Quản lý mật khẩu và cài đặt bảo mật
                </p>
            </div>

            <div
                onClick={() => openModal()}
                className="p-5 bg-bg-secondary border border-bd-primary flex flex-col gap-4 rounded-2xl"
            >
                <div className="mb-3">
                    <h2 className="font-medium text-gray-200 text-[16px] md:text-lg">
                        Thông tin mật khẩu
                    </h2>
                    <p className="text-desc text-sm">
                        Quản lý mật khẩu của bạn
                    </p>
                </div>
                <div className="p-2.5 px-5 flex border border-bd-primary justify-between items-center bg-bg-primary hover:bg-bg-primary/50 rounded-2xl">
                    <div>
                        <div className="font-medium text-gray-200">
                            Đổi mật khẩu
                        </div>
                        <div className="text-sm text-desc mb-2">
                            Đổi mật khẩu của bạn
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

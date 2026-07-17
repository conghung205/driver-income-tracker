"use client";
import HeaderProfile from "@/components/features/profile/HeaderProfile";
import TabItem from "@/components/features/profile/TabItem";
import { TABS_PROFILE } from "@/constants/navigation";
import { useGetGoal, useGetUser } from "@/hooks/useUser";
import { useState } from "react";
import Goal from "@/components/features/profile/Goal";
import Information from "@/components/features/profile/Information";
import Security from "@/components/features/profile/Security";
import FormFieldModal from "@/components/features/profile/FormFieldModal";
import UpdateFullNameForm from "@/components/features/profile/UpdateFullNameForm";
import UpdatePhoneForm from "@/components/features/profile/UpdatePhoneForm";
import UpdatePasswordForm from "@/components/features/profile/UpdatePasswordForm";
import UpdateGoalForm from "@/components/features/profile/UpdateGoalForm";

export default function ProfilePage() {
    const { data: user } = useGetUser();
    const { data: goal } = useGetGoal();
    const [activeTab, setActiveTab] = useState("goal");
    const [modal, setModal] = useState<
        "name" | "phone" | "goal" | "password" | null
    >(null);
    return (
        <>
            <div className="w-full px-5 md:w-[80%] md:px-0 mx-auto py-5">
                <HeaderProfile user={user} />

                {/* tabs */}
                <nav className="flex pt-6 border-b border-bd-primary ">
                    {TABS_PROFILE.map((tab) => (
                        <TabItem
                            key={tab.id}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            tab={tab}
                        />
                    ))}
                </nav>

                {/* contents */}
                <div className="mt-6">
                    {activeTab === "goal" && (
                        <Goal openModal={() => setModal("goal")} goal={goal} />
                    )}{" "}
                    {activeTab === "personal" && (
                        <Information setModal={setModal} user={user} />
                    )}
                    {activeTab === "security" && (
                        <Security openModal={() => setModal("password")} />
                    )}
                </div>
            </div>

            {/* =========== modals update ================ */}

            {/* update name */}
            <FormFieldModal
                title="Chỉnh sửa tên"
                open={modal === "name"}
                onOpenChange={() => setModal(null)}
            >
                <UpdateFullNameForm
                    onsuccess={() => setModal(null)}
                    defaultValue={user?.fullName}
                />
            </FormFieldModal>

            {/* update phone */}
            <FormFieldModal
                title="Chỉnh sửa số điện thoại"
                open={modal === "phone"}
                onOpenChange={() => setModal(null)}
            >
                <UpdatePhoneForm
                    onsuccess={() => setModal(null)}
                    defaultValue={user?.phoneNumber}
                />
            </FormFieldModal>

            {/* update password */}
            <FormFieldModal
                title="Thay đổi mật khẩu"
                open={modal === "password"}
                onOpenChange={() => setModal(null)}
            >
                <UpdatePasswordForm onsuccess={() => setModal(null)} />
            </FormFieldModal>

            {/* update goal form */}
            <FormFieldModal
                title="Cập nhật mục tiêu thu nhập"
                description="Cập nhật mục tiêu cho ngày hôm nay thôi nào"
                open={modal === "goal"}
                onOpenChange={() => setModal(null)}
            >
                <UpdateGoalForm
                    onsuccess={() => setModal(null)}
                    defaultValue={goal?.dailyGoal}
                />
            </FormFieldModal>
        </>
    );
}

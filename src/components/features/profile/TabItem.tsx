import { TabItemProfile } from "@/types/profile.type";

interface TabItemProps {
    tab: TabItemProfile;
    activeTab: string;
    setActiveTab(id: string): void;
}

export default function TabItem({
    tab,
    activeTab,
    setActiveTab,
}: TabItemProps) {
    const isActive = activeTab === tab.id;
    return (
        <button
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 cursor-pointer px-4 lg:px-8 text-xs md:text-sm font-semibold border-b  md:border-b-2 transition-all duration-200 relative ${
                isActive
                    ? "border-main text-main"
                    : "border-transparent text-desc hover:text-gray-200"
            }`}
        >
            {tab.label}

            {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-px md:h-0.5 bg-main rounded-full" />
            )}
        </button>
    );
}

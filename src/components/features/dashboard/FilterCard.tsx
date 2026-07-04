interface FillterCardProps {
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}
export default function FilterCard({
    title,
    isActive,
    onClick,
}: FillterCardProps) {
    return (
        <div
            onClick={onClick}
            className={`py-1.5 cursor-pointer hover:bg-main/10 hover:text-main px-4 ${isActive ? "bg-main/10 text-main" : ""} rounded-2xl border inline-block border-bd-primary`}
        >
            {title}
        </div>
    );
}

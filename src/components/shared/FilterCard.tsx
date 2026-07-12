interface FillterCardProps {
    title: string;
    isSmall?: boolean;
    isActive?: boolean;
    onClick?: () => void;
}
export default function FilterCard({
    title,
    isSmall = false,
    isActive,
    onClick,
}: FillterCardProps) {
    return (
        <div
            onClick={onClick}
            className={`py-1.5 ${isSmall ? "text-xs py-1" : ""} cursor-pointer hover:bg-main/10 hover:text-main px-4 ${isActive ? "bg-main/10 text-main" : ""} rounded-2xl border inline-block border-bd-primary`}
        >
            {title}
        </div>
    );
}

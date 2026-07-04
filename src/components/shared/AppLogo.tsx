import Link from "next/link";
import { Car } from "lucide-react";

interface AppLogoProps {
    description?: string;
    className?: string;
    isMain?: boolean;
}

export default function AppLogo({
    description,
    className = "",
    isMain = false,
}: AppLogoProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center text-center ${className}`}
        >
            <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-main rounded-xl text-white group-hover:scale-105 transition-transform">
                    <Car size={isMain ? 18 : 24} />
                </div>
                <span
                    className={`font-bold text-2xl ${isMain ? "text-[16px] text-start" : ""}  tracking-wider bg-linear-to-r from-emerald-800 to-emerald-300 bg-clip-text text-transparent`}
                >
                    Driver Income Tracker
                </span>
            </Link>

            {description && (
                <p className="text-sm text-desc mt-3 max-w-75">{description}</p>
            )}
        </div>
    );
}

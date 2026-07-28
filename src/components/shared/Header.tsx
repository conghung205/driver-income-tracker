import AppLogo from "./AppLogo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="bg-header z-50 flex md:hidden justify-between border-b shadow-md border-b-bd-primary items-center px-5 py-3 w-full fixed top-0 ring-0">
            <AppLogo isMain className="w-1/2" />
            <div className="flex items-center gap-2 ">
                <ThemeToggle />
            </div>
        </header>
    );
}

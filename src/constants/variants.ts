export const VARIANT_STYLES = {
    primary: {
        container: "bg-main/10 border-main",
        title: "text-main",
        icon: "text-main bg-main/10",
    },
    success: {
        container: "bg-bg-secondary border-bd-primary",
        title: "text-main",
        icon: "text-main bg-main/10",
    },
    danger: {
        container: "bg-bg-secondary border-bd-primary",
        title: "text-red-500",
        icon: "bg-red-500/10 text-red-500",
    },
    warning: {
        container: "bg-amber-400/10 border-amber-400",
        title: "text-amber-400",
        icon: "bg-amber-400/10 text-amber-400",
    },
} as const;

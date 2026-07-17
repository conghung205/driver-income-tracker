import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { ReactNode } from "react";

interface FormFieldModalProps {
    title: string;
    description?: string;
    open: boolean;
    onOpenChange(open: boolean): void;
    children: ReactNode;
}

export default function FormFieldModal({
    title,
    description,
    open,
    onOpenChange,
    children,
}: FormFieldModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="sm:max-w-sm bg-bg-secondary border border-bd-primary"
            >
                <DialogHeader className="pb-3">
                    <DialogTitle className="text-gray-200 text-center text-xl">
                        {title}
                    </DialogTitle>

                    {description && (
                        <DialogDescription className="text-desc text-center text-sm">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useUpdateUser } from "@/hooks/useUser";
import { uploadAvartar } from "@/lib/cloudinary";
import { UserMe } from "@/types/user.type";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UpdateAvatarProps {
    user: UserMe;
    onsuccess(): void;
}
export default function UpdateAvatar({ user, onsuccess }: UpdateAvatarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutate } = useUpdateUser();

    const handleOpenChooseFile = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;

        try {
            const url = await uploadAvartar(selectedFile);

            mutate(
                { avatarUrl: url },
                {
                    onSuccess: onsuccess,
                },
            );
        } catch {
            toast.error("Upload ảnh thất bại");
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    console.log(user.avatarUrl);

    return (
        <div className="flex flex-col items-center gap-5">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="cursor-pointer relative group">
                <Image
                    alt="avatar"
                    src={
                        previewUrl ||
                        user?.avatarUrl ||
                        "/images/avatar-not-found.avif"
                    }
                    width={200}
                    height={200}
                    className="rounded-full h-50 object-cover"
                />

                <div
                    onClick={handleOpenChooseFile}
                    className="absolute hidden inset-0 group-hover:flex items-center justify-center text-desc bg-black/20 rounded-full cursor-pointer"
                >
                    <Pencil className="text-gray-300" size={48} />
                </div>
            </div>

            <Button
                onClick={handleOpenChooseFile}
                className="w-full py-5 bg-main text-white hover:bg-main/85 cursor-pointer"
            >
                <Plus /> Tải ảnh lên
            </Button>

            <DialogFooter className="bg-bg-secondary w-full mt-5 border-bd-primary">
                <DialogClose asChild>
                    <Button
                        onClick={() => onsuccess()}
                        variant="default"
                        className="text-white py-5 cursor-pointer hidden md:flex px-6 bg-red-500 hover:text-white hover:bg-red-600"
                    >
                        Hủy
                    </Button>
                </DialogClose>
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="text-white cursor-pointer py-5 px-6 flex bg-main hover:bg-main/85 font-semibold"
                >
                    Lưu ngay
                </Button>
            </DialogFooter>
        </div>
    );
}

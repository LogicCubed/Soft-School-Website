"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { useCreateCourseModal } from "@/store/admin-modals/use-create-course-modal";
import { createCourse } from "@/actions/course";
import { useRouter } from "next/navigation";

export const CreateCourseModal = () => {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const { isOpen, closeCreateCourseModal } = useCreateCourseModal();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | null>(null);

    // Handles the Creation of a new Course

    const handleCreate = async () => {
        if (!title || !image) return;

        const imageUrl = "/softy-assets/softyhappy.svg";

        await createCourse({ title, imageSrc: imageUrl });
        closeCreateCourseModal();
        router.refresh();
    };

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeCreateCourseModal}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center">
                        <Image
                            src="/softy-assets/softyhappy.svg"
                            alt="Logo"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Create a Course!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Input the Required Information below to create a Course!
                    </DialogDescription>
                </DialogHeader>
                <input
                    id="course-title"
                    type="text"
                    placeholder="Enter Course Title"
                    className="w-full border rounded p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setImage(e.target.files[0]);
                        }
                    }}
                />
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="secondary"
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={handleCreate}
                        >
                            Create
                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={closeCreateCourseModal}
                        >
                            Nevermind
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};
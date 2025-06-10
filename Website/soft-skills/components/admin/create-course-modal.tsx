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
import { useCreateCourseModal } from "@/store/use-create-course-modal";

export const CreateCourseModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, closeCreateCourseModal } = useCreateCourseModal();

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
                />
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg"
                />
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="secondary"
                            className="w-full cursor-pointer"
                            size="lg"
                            /*onClick={}*/
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
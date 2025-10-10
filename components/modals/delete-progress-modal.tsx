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
import { useDeleteProgressModal } from "@/store/use-delete-progress-modal";

export const DeleteProgressModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, closeDeleteProgressModal } = useDeleteProgressModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeDeleteProgressModal}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center">
                        <Image
                            src="/softy-assets/softyscared.svg"
                            alt="Logo"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl text-sky-500">
                        Wait!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Are you sure you want to delete your progress?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={closeDeleteProgressModal}
                        >
                            Nevermind
                        </Button>
                        <Button
                            variant="danger"
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={async () => {
                                await fetch("/api/reset-progress", { method: "POST" });
                            }}
                        >
                            Reset Progress
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useDeleteModal } from "@/store/use-delete-modal";

export const DeleteModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useDeleteModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
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
                    <DialogTitle className="text-center font-bold text-2xl">
                        Wait!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Are you sure you want to delete your account?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={close}
                        >
                            Nevermind
                        </Button>
                        <Button
                            variant="dangerOutline"
                            className="w-full cursor-pointer"
                            size="lg"
                            onClick={async () => {
                                try {
                                  const res = await fetch("/api/delete-user", {
                                    method: "DELETE",
                                  });
                            
                                  if (!res.ok) throw new Error("Failed to delete account");
                            
                                  close();
                                  router.push("/");
                                } catch (err) {
                                  console.error("Account deletion failed", err);
                                }
                            }}
                        >
                            Delete Account
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};
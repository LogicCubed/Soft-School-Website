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
import { useRouter } from "next/navigation";
import { useCreateUnitModal } from "@/store/use-create-unit-modal";
import { createUnit } from "@/actions/unit";

type CreateUnitModalProps = {
  courseId: number;
};

export const CreateUnitModal = ({ courseId }: CreateUnitModalProps) => {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const { isOpen, closeCreateUnitModal } = useCreateUnitModal();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Handles the Creation of a new Unit

    const handleCreate = async () => {
        await createUnit({
            title,
            description,
            courseId,
        });

        closeCreateUnitModal();
        router.refresh();
    };

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeCreateUnitModal}>
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
                        Create a Unit!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Input the Required Information below to create a Unit!
                    </DialogDescription>
                </DialogHeader>
                {/* CODE HERE TO INPUT REQUIRED INFO*/}
                <input
                    id="unit-title"
                    type="text"
                    placeholder="Enter Unit Title"
                    className="w-full border rounded p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    id="unit-description"
                    type="text"
                    placeholder="Enter Unit Description"
                    className="w-full border rounded p-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                            onClick={closeCreateUnitModal}
                        >
                            Nevermind
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};
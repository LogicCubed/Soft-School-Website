"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { deleteAnswer } from "@/actions/answer";
import { useRouter } from "next/navigation";

interface DeleteAnswerButtonProps {
  answerId: number;
}

export function DeleteAnswerButton({ answerId }: DeleteAnswerButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
              await deleteAnswer(answerId);
              router.refresh();
            });
    };

    return (
        <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={handleDelete}
        >
            <X/>
        </Button>
    );
}
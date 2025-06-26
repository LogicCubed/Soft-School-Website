"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteQuestion } from "@/actions/question";
import { Trash2 } from "lucide-react";

export const DeleteQuestionButton = ({ questionId }: { questionId: number }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteQuestion(questionId);
      router.refresh();
    });
  };

  return (
    <Button
      variant="danger"
      className="cursor-pointer"
      onClick={handleDelete}
    >
      <Trash2/>
    </Button>
  );
};
"use client";

import { createQuestion } from "@/actions/question";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface CreateQuestionButtonProps {
  lessonId: number;
}

export const CreateQuestionButton = ({ lessonId }: CreateQuestionButtonProps) => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await createQuestion(lessonId);
      router.refresh();
    });
  };

  return (
    <Button
      variant="primary"
      className="cursor-pointer"
      onClick={handleClick}
    >
      + Question
    </Button>
  );
};
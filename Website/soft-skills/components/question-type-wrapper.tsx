"use client";

import { updateQuestionType } from "@/actions/question";
import { QuestionType } from "./question-type";
import { useRouter } from "next/navigation";

interface QuestionTypeWrapperProps {
  initialType: string;
  questionId: number;
}

export function QuestionTypeWrapper({ initialType, questionId }: QuestionTypeWrapperProps) {
  const router = useRouter();

  const handleValueChange = async (newType: string) => {
    await updateQuestionType(questionId, newType as "SELECT" | "ASSIST" | "VIDEO" | "AUDIO");
    router.refresh();
  };

  return (
    <QuestionType defaultValue={initialType} onValueChange={handleValueChange} />
  );
}
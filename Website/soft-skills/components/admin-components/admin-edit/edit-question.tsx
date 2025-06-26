"use client";

import { useState, useTransition } from "react";
import { updateQuestionText } from "@/actions/question";
import { useRouter } from "next/navigation";

interface QuestionTextInputProps {
  initialText: string;
  questionId: number;
}

export function QuestionTextInput({
  initialText,
  questionId,
}: QuestionTextInputProps) {
  const [text, setText] = useState(initialText);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    startTransition(async () => {
      await updateQuestionText(questionId, text);
      router.refresh(); // Refresh UI after update
    });
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isPending}
      className="w-full border hover:underline hover:decoration-gray-300 p-6 hover:bg-gray-100 rounded mt-2"
    />
  );
}
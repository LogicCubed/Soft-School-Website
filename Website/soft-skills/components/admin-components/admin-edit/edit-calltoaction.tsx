"use client";

import { useState, useEffect, useTransition } from "react";
import { updateCallToAction } from "@/actions/calltoaction"; // adjust path if needed

interface CallToActionTextInputProps {
  initialText: string;
  questionId: number;
}

export function CallToActionTextInput({
  initialText,
  questionId,
}: CallToActionTextInputProps) {
  const [text, setText] = useState(initialText);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    startTransition(() => {
      updateCallToAction(questionId, text);
    });
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isPending}
      className="w-full border hover:underline hover:decoration-gray-300 p-2 hover:bg-gray-100 rounded mt-2"
    />
  );
}
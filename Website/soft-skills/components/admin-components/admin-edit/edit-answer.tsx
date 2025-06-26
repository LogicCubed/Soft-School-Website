"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { updateOptionText } from "@/actions/question";
import { useRouter } from "next/navigation";

interface OptionTextInputProps {
  initialText: string;
  optionId: number;
  autoFocus?: boolean;
}

export function OptionTextInput({ initialText, optionId, autoFocus }: OptionTextInputProps) {
  const [text, setText] = useState(initialText);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    startTransition(async () => {
      await updateOptionText(optionId, text);
      router.refresh();
    });
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [autoFocus]);

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isPending}
      className="w-full border hover:underline hover:decoration-gray-300 p-1 hover:bg-gray-100 rounded"
    />
  );
}
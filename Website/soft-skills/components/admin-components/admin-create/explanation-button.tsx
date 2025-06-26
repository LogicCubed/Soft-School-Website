"use client";

import { useState, useRef, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import { updateOptionExplanation } from "@/actions/answer";
import { useRouter } from "next/navigation";

interface ExplanationTextInputProps {
  initialExplanation: string;
  answerId: number;
}

export function ExplanationTextInput({ initialExplanation, answerId }: ExplanationTextInputProps) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState(initialExplanation);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea when it becomes visible
  useEffect(() => {
    if (showInput) {
      textareaRef.current?.focus();
    }
  }, [showInput]);

  const handleSave = () => {
    startTransition(async () => {
      await updateOptionExplanation(answerId, text);
      router.refresh();
    });
  };

  const maxChars = 100;

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => setShowInput((prev) => !prev)}
      >
        <NotebookPen />
      </Button>

      {showInput && (
        <div className="absolute top-8 left-0 z-10 bg-white shadow-md rounded p-2 w-72">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            disabled={isPending}
            placeholder="Enter explanation"
            rows={4}
            maxLength={maxChars}
            className="w-full text-sm border rounded px-2 py-1 outline-none resize-none"
          />
          <p className="text-gray-500">{text.length}/{maxChars}</p>
        </div>
      )}
    </div>
  );
}